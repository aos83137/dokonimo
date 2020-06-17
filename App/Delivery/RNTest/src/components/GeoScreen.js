import React from 'react'
import {
    Text,
    View,
    Button,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native'
import MapView ,{PROVIDER_GOOGLE,Marker}from 'react-native-maps';
import { IconButton } from 'react-native-paper';
import {Overlay } from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';
import firebase from 'firebase'
import CustomButton from './CustomButton'

const LATITUDE_DELTA = 0.159;
let id;
let name;


const url = 'https://sylvan-presence-280012.an.r.appspot.com';
export default class GeoScreen extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            keeper:[],
            dstate : false,
            mstate : false,
            visible:false,
            
        }
    }

    toggleOverlay = () => {
        this.setState({visible:true})
    };

    toggleOverlay2 = () => {
        this.setState({visible:false})
    };

    useLayoutEffect(){
        this.props.navigation.setOptions({
        headerRight: () => (
            <IconButton
                icon="image"
                color="#BBD4D8"
                size={28}
                onPress={()=>{this.toggleOverlay()}}
                />
        ),
        });
    };

    images=[
        require('../img/bag1.jpeg'),
        require('../img/bag2.jpeg'),
        require('../img/bag3.jpeg'),
        require('../img/bag4.jpeg')
    ]
    
    componentDidMount(){
        Geolocation.getCurrentPosition((position)=>{
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)
            var initialRegion ={
              latitude:lat,
              longitude:long,
              latitudeDelta:LATITUDE_DELTA,
              longitudeDelta:0.005,
            }
            this.setState({initialPosition:initialRegion})
        },(error)=>alert(JSON.stringify(error)),
        {enableHighAccuracy:true, timeout:15000,maximumAge:1000})


        const ref = firebase.database().ref();
        ref.on("value", snapshot=>{
            this.setState({data:snapshot.val()});
        });

        fetch(url + '/rktshow/' + id)
        .then((response)=>response.json())
        .then((responseJson)=>{
            this.setState({
                keeper:responseJson[0]
                
            });
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    


    take = () => {
        firebase.database().ref('/users/'+name).update({state:'take_luggage'});
        
        fetch(url+'/reservations/'+id,{
            method:'PATCH',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                reservation_status:'in_delivery',
            })
        }).then((res)=>res.json())
        .then((resJson)=>{
            console.log(resJson);
            
        }).catch(e=>{console.error(e);}
        )
        alert('수령 완료');
        
        this.setState({
            dstate:true,
            mstate:true
        })
      

    }


    render(){
    
        const {reservation_id , user_name, user_latitude,user_longitude} = this.props.route.params
        console.log(reservation_id);
        id = reservation_id;
        name = user_name;
        const {dstate} = this.state;
        const {mstate} = this.state;
        

        return (
            <React.Fragment>
                {this.useLayoutEffect()}

                <Overlay isVisible={this.state.visible} onBackdropPress={this.toggleOverlay2}>
                    <Text style={{fontSize:20,marginTop:150,}}>가방 사진</Text>
                    <ScrollView horizontal style={{width:250,height:250}}>
                        {
                            this.images.map((image,index)=>(
                                <Image
                                key={index}
                                style={{height:300,width:300 }}
                                source={image}></Image>
                               
                            ))
                            
                        }
                    </ScrollView>
                </Overlay>

                {dstate ? (<View style={styles.CButton}><CustomButton buttonColor={'#BBD4D8'}
                            titleColor={'#1C1C1C'} title="짐 배달 완료" onPress={()=>this.props.navigation.navigate('Com',{reservation_id:reservation_id,user_name:user_name})}/></View>): (<View style={styles.CButton}><CustomButton buttonColor={'#BBD4D8'}
                            titleColor={'#1C1C1C'} title="짐 수령" onPress={this.take}/></View>)}
        
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={this.state.initialPosition}
                    showsUserLocation
                    onUserLocationChange={
                        coordinate=>{
                            const {latitude,longitude} = coordinate.nativeEvent.coordinate;
                            firebase.database().ref('/users/'+name).update({delivery_latitude:latitude,delivery_longitude:longitude});
                        }
                    }
                >
                     {this.state.keeper.keeper_store_latitude?
                    
                        <Marker
                        image={require('../img/tool.png')}
                        coordinate={{latitude:this.state.keeper.keeper_store_latitude,longitude:this.state.keeper.keeper_store_longtitude}} />
                        :null
                        
                    }
                    {mstate ? null : <Marker image={require('../img/signs.png')}
                    coordinate={{latitude:user_latitude,longitude:user_longitude}} />}
             

                </MapView>

            </React.Fragment>
            
          );

    }
   
  }
const styles = StyleSheet.create({
    map:{
        flex:1,
    },
    CButton:{
        backgroundColor:'white',
        width: '100%',
        height:'8%',
    }

})
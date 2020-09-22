import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,


} from 'react-native'
import MapView ,{PROVIDER_GOOGLE, Marker}from 'react-native-maps';
import { IconButton } from 'react-native-paper';
import {Overlay } from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';
import firebase from 'firebase';
import CustomButton from './CustomButton';


const LATITUDE_DELTA = 0.192;
const url =  'https://sylvan-presence-280012.an.r.appspot.com';
let id;
let name;
let latitude;
let longitude;



export default class MapScreen extends React.Component {
    constructor(props){
        super(props)
    
        this.state = {
            keeper:[],
            visible:false,
            photos:[],
            
        }
        this._carousel = {};
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


    componentDidMount(){
  
        Geolocation.getCurrentPosition((position)=>{
            console.log('position',position);
            
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)
            var initialRegion ={
              latitude:lat,
              longitude:long,
              latitudeDelta:0.14,
              longitudeDelta:0.14
            }
            this.setState({initialPosition:initialRegion})
        },(error)=>alert(JSON.stringify(error)))

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

        fetch(url + '/rphotos/' + id)
        .then((response)=>response.json())
        .then((responseJson)=>{
            this.setState({
                photos:responseJson
                
            });
        })
        .catch((error)=>{
            console.log(error);
        })


    }
    ok=()=>{

        firebase.database().ref('/users/'+name).update({state:'ok'});
        firebase.database().ref('/users/'+name).update({delivery_id:'1'});
        this.props.navigation.navigate('Geo',{reservation_id:id,user_name:name,user_latitude:latitude,user_longitude:longitude})

        
    }

    

    render(){
        console.log('keeper info',this.state.keeper);
        const {reservation_id , user_name, user_latitude,user_longitude} = this.props.route.params
        id = reservation_id;
        name = user_name;
        latitude = user_latitude;
        longitude = user_longitude;


        console.log(this.state.photos);






        return (
            <View style={styles.container}>
                {this.useLayoutEffect()}

                <Overlay isVisible={this.state.visible} onBackdropPress={this.toggleOverlay2}>
                    <Text style={{fontSize:20,marginTop:100}}>バッグ写真</Text>

                    <ScrollView horizontal style={{width:250,height:250}}>
                        {
                            this.state.photos.map((image,index)=>(
                                <Image 
                                key={index}
                                style={{height:300,width:300,marginTop:20 }}
                                source={{uri:image.rphoto_url}}></Image>
                               
                            ))
                            
                        }
                    </ScrollView>
                    <Text style={{fontSize:20,marginTop:20}}>
                        45cm以下 : {this.state.keeper.bag_cnt} 個
                    </Text>
                    <Text style={{fontSize:20,marginTop:20}}>
                        45cm以上 : {this.state.keeper.car_cnt} 個
                    </Text>
                    <Text style={{fontSize:20,marginTop:20}}>
                    住所 : {this.state.keeper.keeper_store_address}
                    </Text>
                    <Text style={{fontSize:20,marginTop:20,marginBottom:50}}>
                    店名 : {this.state.keeper.keeper_store_name}
                    </Text>
          
                </Overlay>
                
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={this.state.initialPosition}
                    showsUserLocation
                 
                >
                    {this.state.keeper.keeper_store_latitude?
                        
                        <Marker
                        image={require('../img/tool.png')}
                        coordinate={{latitude:this.state.keeper.keeper_store_latitude,longitude:this.state.keeper.keeper_store_longtitude}} />
                      
                        :null
                        
                    }
                    
            
                    <Marker
                    image={require('../img/signs.png')}
                    coordinate={{latitude:user_latitude,longitude:user_longitude}} />
                
               
                </MapView>
                <View style={styles.CButton}>
                    <CustomButton buttonColor={'#BBD4D8'}
                            titleColor={'#1C1C1C'} title="承知" onPress={this.ok} />
                    <CustomButton buttonColor={'#BBD4D8'}
                            titleColor={'#1C1C1C'} title="断り" onPress={()=>this.props.navigation.goBack()} />
                </View>
              
            </View>
            
          );

    }
   
  }
const styles = StyleSheet.create({
    container:{
        flex:1
    },  
    map:{
        ...StyleSheet.absoluteFillObject,
    },
    CButton:{
      backgroundColor:'white',
      width: '100%',
      height:'12%',
    }

})
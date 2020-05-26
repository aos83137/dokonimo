import React from 'react'
import {
    View,
    Button,
    StyleSheet
} from 'react-native'
import MapView ,{PROVIDER_GOOGLE,Marker}from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import firebase from 'firebase'


const LATITUDE_DELTA = 0.159;
let id;
let name;

const url = 'https://my-project-9710670624.df.r.appspot.com';
export default class GeoScreen extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            keeper:[],
            initialPosition:{
              latitude:0,
              longitude:0,
              latitudeDelta:0,
              
            }
        }
    }
    componentDidMount(){
        Geolocation.getCurrentPosition((position)=>{
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)
            var initialRegion ={
              latitude:lat,
              longitude:long,
              latitudeDelta:LATITUDE_DELTA,
      
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
    


    take(){
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
    }


    render(){
    
        const {reservation_id , user_name, user_latitude,user_longitude} = this.props.route.params
        console.log(reservation_id);
        id = reservation_id;
        name = user_name;

        

        return (
            <React.Fragment>
                
                <View>
                    <Button title="짐 수령" onPress={this.take}/>
                    <Button title="짐 배달 완료"
                    onPress={()=>this.props.navigation.navigate('Com',{reservation_id:reservation_id,user_name:user_name})} />
                </View>
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
                     {this.state.keeper?
                    
                        <Marker
                        pinColor={'green'}
                        coordinate={{latitude:this.state.keeper.keeper_store_latitude,longitude:this.state.keeper.keeper_store_longtitude}} />
                        :null
                        
                    }
                    <Marker
                    pinColor={'blue'}
                    coordinate={{latitude:user_latitude,longitude:user_longitude}} />

                </MapView>

            </React.Fragment>
            
          );

    }
   
  }
const styles = StyleSheet.create({
    map:{
        flex:1,
    },

})
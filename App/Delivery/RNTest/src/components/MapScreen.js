import React from 'react'
import {
    View,
    Button,
    Text,
    StyleSheet
} from 'react-native'
import MapView ,{PROVIDER_GOOGLE, Marker}from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import firebase from 'firebase';


const LATITUDE_DELTA = 0.192;
const url =  'https://my-project-9710670624.df.r.appspot.com';
let id;
let name;
let latitude;
let longitude;


export default class MapScreen extends React.Component {
    constructor(props){
        super(props)
    
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
    }
    ok=()=>{

        firebase.database().ref('/users/'+name).update({state:'ok'});
        firebase.database().ref('/users/'+name).update({delivery_id:'1'});
        this.props.navigation.navigate('Geo',{reservation_id:id,user_name:name,user_latitude:latitude,user_longitude:longitude})

        
    }

    render(){
        console.log(this.state.keeper);
        const {reservation_id , user_name, user_latitude,user_longitude} = this.props.route.params
        id = reservation_id;
        name = user_name;
        latitude = user_latitude;
        longitude = user_longitude;


        return (
            <React.Fragment>
                <View>
                    <Button title="수락" 
                    onPress={this.ok}/>
                    <Button title="거절" 
                    onPress={()=>this.props.navigation.goBack()}/>
                    
                    
                </View>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={this.state.initialPosition}
                    showsUserLocation
                 
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
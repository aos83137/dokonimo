import React from 'react'
import {
    View,
    Button,
    StyleSheet
} from 'react-native'
import MapView ,{PROVIDER_GOOGLE}from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import firebase from 'firebase'


const LATITUDE_DELTA = 0.005


export default class GeoScreen extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            data:[],
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

        if(!firebase.apps.length){
            firebase.initializeApp({
                apiKey: "AIzaSyDaeJwtorHi3g-ytqU9bn5cjFhKO-2kbIE",
                authDomain: "maptest3-b3603.firebaseapp.com",
                databaseURL: "https://maptest3-b3603.firebaseio.com",
                projectId: "maptest3-b3603",
                storageBucket: "maptest3-b3603.appspot.com",
                messagingSenderId: "676243801867",
                appId: "1:676243801867:web:9a0db9a23c16846b04c40e",
                measurementId: "G-Y8XG5Y6V1D"
            });
        }
        
    
        const ref = firebase.database().ref();
        ref.on("value", snapshot=>{
            this.setState({data:snapshot.val()});
        });
    }

    render(){
        return (
            <React.Fragment>
                <View>
                    <Button title="완료"
                    onPress={()=>this.props.navigation.navigate('Com')} />
                </View>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={this.state.initialPosition}
                    showsUserLocation
                    onUserLocationChange={
                        coordinate=>{
                            const {latitude,longitude} = coordinate.nativeEvent.coordinate;
                            firebase.database().ref('/delivery').set({lat:latitude,lon:longitude});
                        }
                    }
                >

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
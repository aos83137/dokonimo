import React from 'react'
import {
    View,
    StyleSheet
} from 'react-native'
import MapView ,{PROVIDER_GOOGLE, Marker}from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import firebase from 'firebase';
import CustomButton from './CustomButton'

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
            
        }
    }



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


        return (
            <View style={styles.container}>

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
                            titleColor={'#1C1C1C'} title="수락" onPress={this.ok} />
                    <CustomButton buttonColor={'#BBD4D8'}
                            titleColor={'#1C1C1C'} title="거절" onPress={()=>this.props.navigation.goBack()} />
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
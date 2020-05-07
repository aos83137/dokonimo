import React from 'react'
import {

    View,
    Button,

    StyleSheet
} from 'react-native'
import MapView ,{PROVIDER_GOOGLE}from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';


const LATITUDE_DELTA = 0.005


export default class MapScreen extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            initialPosition:{
              latitude:0,
              longitude:0,
              latitudeDelta:0,
              
            }
        }
    }
    watchID = null
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
    }

    render(){
        return (
            <React.Fragment>
                <View>
                    <Button title="수락" 
                    onPress={()=>this.props.navigation.navigate('Geo')}/>
                    <Button title="거절" 
                    onPress={()=>this.props.navigation.goBack()}/>
                </View>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={this.state.initialPosition}
                    showsUserLocation
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
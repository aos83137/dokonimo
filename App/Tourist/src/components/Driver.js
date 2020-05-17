import React,{Component} from 'react';
import {
    Image,
    View,

} from 'react-native';
import MapView, {Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

export default class Driver extends Component{
    constructor(props){
        super(props);

        const driver = this.props.driver?
            this.props.driver:
            {
                uid : "noDriversPassed",
                location:{ latitude: 0,longitude:0}
            }

        const coordinate = new MapView.AnimatedRegion({
            latitude: driver.location.latitude,
            longitude:driver.location.longitude,
        })
        this.state = {
            driver: driver,
            coordinate:coordinate,
        }
    }

    render(){
        return(

            <MapView.Animated
            ></MapView>
        )
    }
}
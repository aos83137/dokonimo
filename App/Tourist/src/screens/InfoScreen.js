import React , {useState, useEffect } from 'react';
import {Text ,View,StyleSheet, Image, ScrollView, Alert, Dimensions, TouchableHighlight} from 'react-native';

let {width, height} = Dimensions.get('window')

//props 안에 navigation, route가  들어가있음 {navigation, route} 이렇게 써도 되고 props.navigatio으로 써도됨
const InfoScreen = (props)=>{   
        return(
            <View style={{ flex:1 }}> 
                <Text>this is InfoScreen</Text>
            </View>
        );
    }

export default InfoScreen;
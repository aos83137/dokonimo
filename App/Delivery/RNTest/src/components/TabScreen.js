import React from 'react';
import {PermissionsAndroid,Button} from 'react-native'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen'
import MScreen from './MScreen' 
const Tab = createMaterialBottomTabNavigator();
export default class TabScreen extends React.Component{
    render(){
        return(
            <Tab.Navigator
            initialRouteName="Home" >
                <Tab.Screen name="Home" component={HomeScreen} 
                options={{ tabBarLabel: 'Home', tabBarColor: '#009387',
                tabBarIcon:({color})=>(
                    <Icon name="ios-home" color={color} size={26} />
                ),
                }}></Tab.Screen>
                <Tab.Screen name="Info" component={MScreen} 
                options={{ tabBarLabel: 'Info', tabBarColor: '#FA8258',
                tabBarIcon:({color})=>(
                    <Icon name="ios-aperture" color={color} size={26} />
                ),
                }} ></Tab.Screen>
            </Tab.Navigator>
        );
    }
}
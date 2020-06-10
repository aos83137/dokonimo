import React from 'react';
import {PermissionsAndroid,Button} from 'react-native'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './HomeScreen'
import MScreen from './MScreen' 
import SScreen from './SScreen'
const Tab = createMaterialBottomTabNavigator();
export default class TabScreen extends React.Component{
    render(){
        return(
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} 
                
                options={{ tabBarLabel: 'Home',
                tabBarIcon:({color})=>(
                    <Icon name="home" color={color} size={26}/>
                ),
                }}></Tab.Screen>
                <Tab.Screen name="Info" component={MScreen} 
                options={{ tabBarLabel: 'Info', 
                tabBarIcon:({color})=>(
                    <Icon name="info" color={color} size={26} />
                ),
                }} ></Tab.Screen>
                <Tab.Screen name="Settings" component={SScreen}
                options={{ tabBarLabel: 'Settings', 
                tabBarIcon:({color})=>(
                    <Icon name="settings" color={color} size={26} />
                ),
                }}
                >

                </Tab.Screen>
            </Tab.Navigator>
        );
    }
}
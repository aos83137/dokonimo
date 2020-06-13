import React from 'react';
import {PermissionsAndroid,Button} from 'react-native'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';


import HomeScreen from './HomeScreen'
import MScreen from './MScreen' 
import SScreen from './SScreen'

const Tab = createBottomTabNavigator();
export default class TabScreen extends React.Component{

    render(){
        return(
            <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Home') {
                    iconName = focused
                      ? 'home'
                      : 'home';
                  } else if (route.name === 'Settings') {
                    iconName = focused ? 'settings' : 'settings';
                  } else if (route.name === 'Info'){
                      iconName = focused ? 'info' : 'info';
                  }
      
                  // You can return any component that you like here!
                  return <Icon name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: '#008388',
                inactiveTintColor: 'gray',
              }}>
                <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>
                <Tab.Screen name="Info" component={MScreen} ></Tab.Screen>
                <Tab.Screen name="Settings" component={SScreen}></Tab.Screen>
            </Tab.Navigator>
        );
    }
}
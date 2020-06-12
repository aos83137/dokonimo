import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'

import LoginScreen from './LoginScreen'
import SignupScreen from './SignupScreen'

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) =>(
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name = "Login" component={LoginScreen} />
        <RootStack.Screen name = "Signup" component={SignupScreen} />

    </RootStack.Navigator>
);

export default RootStackScreen;
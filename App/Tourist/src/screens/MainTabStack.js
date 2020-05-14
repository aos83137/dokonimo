import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { Button, View, Text,TextInput, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SettingsScreen from './SettingsScreen';
import InfoScreen from './InfoScreen';
import HomeScreen from './HomeScreen';

import HomeIconWithBadge from '../components/HomeIconWithBadge';

export default class MainTabStack extends Component{
    render(){
        const MainTabStack = createBottomTabNavigator();
        
        function IconWithBadge({ name, badgeCount, color, size }) {
            return (
                <View style={{ width: 24, height: 24, margin: 5 }}>
                    <Icon name={name} size={size} color={color} />
                    {badgeCount > 0 && (
                        <View
                        style={{
                            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
                            position: 'absolute',
                            right: -6,
                            top: -3,
                            backgroundColor: 'red',
                            borderRadius: 6,
                            width: 12,
                            height: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        >
                        <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                            {badgeCount}
                        </Text>
                        </View>
                    )}
                </View>
            );
        }
          
          function HomeIconWithBadge(props) {
            // React Context API, Redux, MobX 또는 이벤트 이미 터와 같은 다른 방법으로 badgeCount를 전달해야합니다.
            // console.log('여기는 props'+JSON.stringify(props));
            return <IconWithBadge {...props} badgeCount={0} />;
          }


        return(            
            <MainTabStack.Navigator
                initialRouteName="Home"
                screenOptions={({route}) => ({
                tabBarIcon : ({ focused, color , size}) => {
                    if (route.name === 'Home'){
                    return(
                        <Icon name = {focused ? 'home' : 'home'}  size={size} color={color}/>
                    );
                    } else if (route.name==='Info'){
                    return(
                        <HomeIconWithBadge name = {focused ? 'info' : 'info-outline'}  size={size} color={color}/>
                    );
                    } else if(route.name==='Setting'){
                    return(
                        <Icon name ={focused ? 'settings-applications' : 'settings'}  size={size} color={color}/>
                    );
                    }
                },
                })}
                tabBarOptions={{ 
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                }}
            >
                <MainTabStack.Screen name="Home" component={HomeScreen}/>
                <MainTabStack.Screen name="Info" component={InfoScreen}/>
                <MainTabStack.Screen name="Setting" component={SettingsScreen}/>
          </MainTabStack.Navigator>
        );
    }
}
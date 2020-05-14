import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { PermissionsAndroid, Button, View, Text,TextInput, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { Ionicons } from '@expo/vector-icons';

import MainTabStack from './src/screens/MainTabStack';
import MyDrawerTap from './src/screens/MyDrawerTap';
import PlacesAutoComplete from './src/screens/PlacesAutoComplete';
import DateSetting from './src/screens/DateSetting';
import KeeperInfo from './src/screens/KeeperInfo';

export async function request_location_runtime_permission() {

  try {
    const granted = await PermissionsAndroid.request(
      //이게 위치권한 부여하는 거임
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'ReactNativeCode Location Permission',
        'message': 'ReactNativeCode App needs access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

      // Alert.alert("위치 권한 부여됨");
    }
    else {

      // Alert.alert("Location Permission Not Granted");

    }
  } catch (err) {
    console.warn(err)
  }
}




const RootStack = createStackNavigator();

export default class App extends Component{

  async componentDidMount() {
    await request_location_runtime_permission()
  }

  render() {
    return (
      <NavigationContainer
        onStateChange={state => console.log('New state is', state)}
      >
        <RootStack.Navigator 
          headerMode ="none"
          //Main의 header을 숨김
        > 
          <RootStack.Screen name="Main" 
            component={MainTabStack} 
            component={MyDrawerTap}
          />
          <RootStack.Screen name="PlacesAutoComplete" component={PlacesAutoComplete} />
          <RootStack.Screen name="DateSetting" component={DateSetting}/>
          <RootStack.Screen name="KeeperInfo" component={KeeperInfo}/>
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}


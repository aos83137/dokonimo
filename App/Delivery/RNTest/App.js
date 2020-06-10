import React from 'react';
import {PermissionsAndroid,Button} from 'react-native'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from './src/components/HomeScreen'
import MapScreen from './src/components/MapScreen'
import GeoScreen from './src/components/GeoScreen'
import ComScreen from './src/components/ComScreen'
import TabScreen from './src/components/TabScreen'
import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';

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
const Stack = createStackNavigator();
console.disableYellowBox = true;
export default class App extends React.Component{
async componentDidMount(){
  this._checkPermission();
  this._listenForNotifications();
  console.log('test didmount');
  await request_location_runtime_permission();
  
}

  //permission이 있는지 체크
  async _checkPermission(){
    const enabled = await messaging().hasPermission();
    if (enabled) {
        // user has permissions
        console.log(enabled);
        this._updateTokenToServer();
    } else {
        // user doesn't have permission
        this._requestPermission();
    }
  }

  //permission이 없다면 permission을 요청
  async _requestPermission(){
    try {
      // User has authorised
      await messaging().requestPermission();
      await this._updateTokenToServer();
    } catch (error) {
        // User has rejected permissions
        alert("you can't handle push notification");
    }
  }

  //permission이 있다면 서버에 token 정보를 저장
  async _updateTokenToServer(){
    const fcmToken = await messaging().getToken();
    console.log(fcmToken);

    const header = {
      method: "POST",
      headers: {
        'Accept':  'application/json',
         'Content-Type': 'application/json',
         'Cache': 'no-cache'
      },
      body: JSON.stringify({
        user_id: "CURRENT_USER_ID",
        firebase_token: fcmToken
      }),
      credentials: 'include',
    };
    const url = "http://YOUR_SERVER_URL";

    // if you want to notification using server,
    // do registry current user token

    // await fetch(url, header);
  }

  async _listenForNotifications(){
    // onNotificationDisplayed - ios only

    // this.notificationListener = messaging().onNotification((notification) => {
    //   console.log('onNotification', notification);
    // });
    this.setTopic = messaging().subscribeToTopic('tourist');
    this.unsubscribe  = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  }


  render(){


    return(
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="딜리버리" component={HomeScreen} 
            options={{
              title:'딜리버리', 
              headerStyle:{backgroundColor:'#FA8258'},
              headerTintColor:'#fff',
              headerTitleStyle:{fontWeight:'bold'},
           
            }}/> */}
            <Stack.Screen name="딜리버리" component={TabScreen} 
            options={{
              title:'딜리버리', 
              headerStyle:{backgroundColor:'#FA8258'},
              headerTintColor:'#fff',
              headerTitleStyle:{fontWeight:'bold'},
            }}/>
            <Stack.Screen name="Map" component={MapScreen} 
            options={{
              title:'Map', 
              headerStyle:{backgroundColor:'#FA8258'},
              headerTintColor:'#fff',
              headerTitleStyle:{fontWeight:'bold'},
            }}/>
            <Stack.Screen name="Geo" component={GeoScreen}
            options={{
              title:'위치추적', 
              headerStyle:{backgroundColor:'#FA8258'},
              headerTintColor:'#fff',
              headerTitleStyle:{fontWeight:'bold'},
            }}/>
            <Stack.Screen name="Com" component={ComScreen}
            options={{
              title:'완료', 
              headerStyle:{backgroundColor:'#FA8258'},
              headerTintColor:'#fff',
              headerTitleStyle:{fontWeight:'bold'},
            }}/>


        </Stack.Navigator>
     
      </NavigationContainer>
    );
  }
}



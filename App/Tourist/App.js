import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { PermissionsAndroid, Button, View, Text,TextInput, Alert,ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { Ionicons } from '@expo/vector-icons';
import firebase from '@react-native-firebase/app';
import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';

import MainTabStack from './src/screens/MainTabStack';
import MyDrawerTap from './src/screens/MyDrawerTap';
import PlacesAutoComplete from './src/screens/PlacesAutoComplete';
import DateSetting from './src/screens/DateSetting';
import KeeperInfo from './src/screens/KeeperInfo';
import PushNotification from 'react-native-push-notification';
import Reservation from './src/screens/Reservation';
import DeliveryInfo from './src/screens/delivery/DeliveryInfo';
import DeliveryFindScreen from './src/screens/delivery/DeliveryFindScreen';
import LogIn  from './src/screens/LogIn';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import DeliveryRealtime from './src/screens/delivery/DeliveryRealtime';
import SignUp from './src/screens/SignUp.js';
import Credit from './src/screens/Credit.js';

export async function request_location_runtime_permission() {
  // 옐로우 박스 지울때 밑에꺼 주석풀기
  console.disableYellowBox = true;
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
let init = "Main";

export default class App extends Component{
  constructor(props){
    super(props);
    this.state={
      isLoading:true,
    };
    this.status=null;
  }

  async componentDidMount() {
    this._checkPermission();
    this._listenForNotifications();

    await request_location_runtime_permission();
    PushNotification.configure({
      onNotification: function(notification) {
        console.log("NOTIFICATION:", notification);
    
        // process the notification
    
        // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
        //밑에 이건 아이폰전용임
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      }
    });
    let status =await AsyncStorage.getItem('status');
    console.log('this.status 확인 : ');
    console.log(status);
    if(status=='endKeeper'){
      init = "DeliveryInfo"
    }
    this.setState({
      isLoading:false
    })
    SplashScreen.hide();
  }

  componentWillUnmount(){
    this.notificationListener();
    this.notificationOpenedListener();
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
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{ flex:1, paddingTop:20}}>
            <ActivityIndicator/>
        </View>
      )
    }    
    else{
      return (
        <NavigationContainer>
          <RootStack.Navigator 
            headerMode ="none"
          > 
  
            <RootStack.Screen name="Main" 
              component={MainTabStack} 
              component={MyDrawerTap}
            />
            <RootStack.Screen name="PlacesAutoComplete" component={PlacesAutoComplete} />
            <RootStack.Screen name="DateSetting" component={DateSetting}/>
            <RootStack.Screen name="KeeperInfo" component={KeeperInfo}/>
            <RootStack.Screen name="Reservation" component={Reservation}/>
            <RootStack.Screen name="DeliveryInfo" component={DeliveryInfo}/>
            <RootStack.Screen name="DeliveryFindScreen" component={DeliveryFindScreen}/>
            <RootStack.Screen name="LogIn" component={LogIn}/>
            <RootStack.Screen name="SignUp" component={SignUp}/>
            <RootStack.Screen name="DeliveryRealtime" component={DeliveryRealtime}/>
            <RootStack.Screen name="Credit" component={Credit}/>
          </RootStack.Navigator>
        </NavigationContainer>
      );
    }
  }
}

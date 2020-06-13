import React, { useEffect, useState } from 'react';
import {PermissionsAndroid,ActivityIndicator,View} from 'react-native'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from './src/components/HomeScreen'
import MapScreen from './src/components/MapScreen'
import GeoScreen from './src/components/GeoScreen'
import ComScreen from './src/components/ComScreen'
import TabScreen from './src/components/TabScreen'
import LoginScreen from './src/components/LoginScreen'
import RootStackScreen from './src/components/RootStackScreen'
import {AuthContext} from './src/cons/Context'
import AsyncStorage from '@react-native-community/async-storage';


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

const App =()=>{

    // const [isLoading, setIsLoading] = React.useState(true);
    // const [userToken, setUserToken] = React.useState(null);

    const initialLoginState = {
      isLoading: true,
      userName: null,
      userToken: null,
    };

    const loginReducer = (prevState, action) => {
      switch( action.type ) {
        case 'RETRIEVE_TOKEN': 
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'LOGIN': 
          return {
            ...prevState,
            userName: action.id,
            userToken: action.token,
            isLoading: false,
          };
        case 'LOGOUT': 
          return {
            ...prevState,
            userName: null,
            userToken: null,
            isLoading: false,
          };
        case 'REGISTER': 
          return {
            ...prevState,
            userName: action.id,
            userToken: action.token,
            isLoading: false,
          };
      }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
    
    const authContext = React.useMemo(() => ({
      signIn: async(userName,password) => {

        userToken = password;
        
       

        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch(e) {
          console.log(e);
        }
        console.log(userToken);
        
        dispatch({ type: 'LOGIN', id: userName, token: userToken });
      },
      signOut: async() => {

        try {
          await AsyncStorage.removeItem('userToken');
        } catch(e) {
          console.log(e);
        }
        dispatch({ type: 'LOGOUT' });
      },
      signUp:()=>{

      }
    }), []);

    useEffect(() => {
      setTimeout(async() => {
        let userToken;
        userToken = null;
        try {
          userToken = await AsyncStorage.getItem('userToken');
        } catch(e) {
          console.log(e);
        }
        console.log(userToken);

        dispatch({ type: 'REGISTER', token: userToken });
      }, 1000);
    }, []);
  
    if( loginState.isLoading ) {
      return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }

    return(
      
      
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {loginState.userToken !== null ? (
            <Stack.Navigator>
              <Stack.Screen name="딜리버리" component={TabScreen} 
              options={{
                title:'딜리버리', 
                headerStyle:{backgroundColor:'#008388'},
                headerTintColor:'#fff',
                headerTitleStyle:{fontWeight:'bold'},
              }}/>
              <Stack.Screen name="Map" component={MapScreen} 
              options={{
                title:'Map', 
                headerStyle:{backgroundColor:'#008388'},
                headerTintColor:'#fff',
                headerTitleStyle:{fontWeight:'bold'},
              }}/>
              <Stack.Screen name="Geo" component={GeoScreen}
              options={{
                title:'위치추적', 
                headerStyle:{backgroundColor:'#008388'},
                headerTintColor:'#fff',
                headerTitleStyle:{fontWeight:'bold'},
              }}/>
              <Stack.Screen name="Com" component={ComScreen}
              options={{
                title:'완료', 
                headerStyle:{backgroundColor:'#008388'},
                headerTintColor:'#fff',
                headerTitleStyle:{fontWeight:'bold'},
              }}/>
              <Stack.Screen name="Login" component={LoginScreen}
              options={{
                title:'로그인', 
                headerStyle:{backgroundColor:'#008388'},
                headerTintColor:'#fff',
                headerTitleStyle:{fontWeight:'bold'},
              }} />

          </Stack.Navigator> 
          ) :  <RootStackScreen /> }
 
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }


export default App;

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
  console.log('test didmount');
  await request_location_runtime_permission();
  
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


        </Stack.Navigator>
     
      </NavigationContainer>
    );
  }
}



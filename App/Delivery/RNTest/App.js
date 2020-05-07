import React from 'react';
import {Button} from 'react-native'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from './src/components/HomeScreen'
import MapScreen from './src/components/MapScreen'
import GeoScreen from './src/components/GeoScreen'
import ComScreen from './src/components/ComScreen'

const Stack = createStackNavigator();

export default class App extends React.Component{


  render(){


    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="딜리버리" component={HomeScreen} 
            options={{
              title:'딜리버리', 
              headerStyle:{backgroundColor:'#f4511e'},
              headerTintColor:'#fff',
              headerTitleStyle:{fontWeight:'bold'},
              headerRight:()=>(
                <Button 
                  onPress={()=>alert('This is a button!')}
                  title="Info"
                  color="#fff"
                />
              ),
            }}/>
            <Stack.Screen name="Map" component={MapScreen} 
            options={{
              title:'Map', 
              headerStyle:{backgroundColor:'#f4511e'},
              headerTintColor:'#fff',
              headerTitleStyle:{fontWeight:'bold'},
            }}/>
            <Stack.Screen name="Geo" component={GeoScreen}
            options={{
              title:'위치추적', 
              headerStyle:{backgroundColor:'#f4511e'},
              headerTintColor:'#fff',
              headerTitleStyle:{fontWeight:'bold'},
            }}/>
            <Stack.Screen name="Com" component={ComScreen}
            options={{
              title:'완료', 
              headerStyle:{backgroundColor:'#f4511e'},
              headerTintColor:'#fff',
              headerTitleStyle:{fontWeight:'bold'},
            }}/>


        </Stack.Navigator>
     
      </NavigationContainer>
    );
  }
}



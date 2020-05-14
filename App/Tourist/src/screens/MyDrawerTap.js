import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabStack from './MainTabStack';
import KeeperInfo from './KeeperInfo';
import LinkDBTest from './LinkDBTest';
import PlacesAutoComplete from './PlacesAutoComplete';

  const Drawer = createDrawerNavigator();

  
  export default class MyDrawerTap extends Component {
      render(){
          return(
            <Drawer.Navigator initialRouteName="Feed">
              <Drawer.Screen
                name="Feed"
                component={MainTabStack}
                options={{ drawerLabel: 'Home' }}
              />
              <Drawer.Screen
                name="Notifications"
                component={LinkDBTest}
                options={{ drawerLabel: 'Updates' }}
              />
              <Drawer.Screen
                name="Profile"
                component={KeeperInfo}
                options={{ drawerLabel: 'Profile' }}
              />
            </Drawer.Navigator>
          );
      }
  }
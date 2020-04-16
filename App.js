//This is an example to hide Navigation Bar from a particular screen
import React, {Component} from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import AddUserScreen from './screens/AddUserScreen';
import UserScreen from './screens/UserScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import Notificationsscreen from './screens/Notificationsscreen';
import PaymentScreen from './screens/PaymentScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import SettingsScreen from './screens/SettingsScreen';
import HelpScreen from './screens/HelpScreen';

import UserDetailScreen from './screens/UserDetailScreen';
import {colors} from './screens/shared/constant';
const App = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      //You can hide the header from here as well just uncomment below lines
      navigationOptions: {
        header: null,
      },
    },
    Profile: {
      // eslint-disable-next-line no-undef
      screen: ProfileScreen,
      //You can hide the header from here as well just uncomment below lines
      navigationOptions: {
        headerTransparent: true,
        title: '',
      },
    },
    Notifications: {
      // eslint-disable-next-line no-undef
      screen: Notificationsscreen,
      //You can hide the header from here as well just uncomment below lines
      navigationOptions: {
        headerTransparent: true,
        title: '',
      },
    },
    Payment: {
      screen: PaymentScreen,
      //You can hide the header from here as well just uncomment below lines
      navigationOptions: {
        headerTransparent: true,
        title: '',
      },
    },
    Appointment: {
      screen: AppointmentScreen,
      //You can hide the header from here as well just uncomment below lines
      navigationOptions: {
        headerTransparent: true,
        title: '',
      },
    },
    Settings: {
      screen: SettingsScreen,
      //You can hide the header from here as well just uncomment below lines
      navigationOptions: {
        headerTransparent: true,
        title: '',
      },
    },
    Help: {
      screen: HelpScreen,
      //You can hide the header from here as well just uncomment below lines
      navigationOptions: {
        headerTransparent: true,
        title: '',
      },
    },
  },
  //You can hide the header from all the screens in once using defaultNavigationOptions
  /*,{
    defaultNavigationOptions: {
      header: null
    },
  }*/
);
export default createAppContainer(App);
console.disableYellowBox = true;

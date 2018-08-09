import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import { InitScreenContainer } from '../screens/InitScreen';

export default createSwitchNavigator(
  {
    Main: MainTabNavigator,
    Login: LoginScreen,
    Init: InitScreenContainer
  },
  {
    initialRouteName: 'Init'
  }
);

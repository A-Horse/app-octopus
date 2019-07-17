import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import { InitScreenContainer } from '../screens/InitScreen';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

export default createAppContainer(createSwitchNavigator(
  {
    Main: MainTabNavigator,
    Login: LoginScreen,
    Init: InitScreenContainer
  },
  {
    initialRouteName: 'Init'
  }
));

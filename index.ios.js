import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Navigator
} from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { addNavigationHelpers } from 'react-navigation';
import { connect, Provider } from 'react-redux';
import appReducer from './reducer';

import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
registerScreens();


// TODO 不应该全部引入
import 'rxjs'; // https://redux-observable.js.org/docs/Troubleshooting.html RxJS operators are missing!

import { AppDrawerNavigator } from './navigator';

import {combineEpics, createEpicMiddleware} from 'redux-observable';

import { checkLogin } from './service/auth';

import LoginScreen from './screen/Login';

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'One',
      screen: 'example.FirstTabScreen', // this is a registered name for a screen
      icon: require('../img/one.png'),
      selectedIcon: require('../img/one_selected.png'), // iOS only
      title: 'Screen One'
    },
    {
      label: 'Two',
      screen: 'example.SecondTabScreen',
      icon: require('../img/two.png'),
      selectedIcon: require('../img/two_selected.png'), // iOS only
      title: 'Screen Two'
    }
  ]
});


// @connect(state => ({
//   nav: state.nav
// }))
// class AppWithNavigationState extends React.Component {
//   render() {
//     return (
//       <AppDrawerNavigator navigation={addNavigationHelpers({
//           dispatch: this.props.dispatch,
//           state: this.props.nav})} />
//     );
//   }
// }

import rootEpic from './epic';

const epicMiddleware = createEpicMiddleware(rootEpic);
import thunkMiddleware from 'redux-thunk';

import MainSence from './Scence/Main';

const store = createStore(
  appReducer,
  applyMiddleware(
    thunkMiddleware,
    epicMiddleware
  )
);

// import TodoScreen from './screen/Todo';

// class App extends Component {

//   render() {
//     return (
//       <Provider store={store}>
//         <AppWithNavigationState/>
//       </Provider>
//     );
//   }
// }

// AppRegistry.registerComponent('OctopusApp', () => App);

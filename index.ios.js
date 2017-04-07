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

import { connect, Provider } from 'react-redux';
import appReducer from './reducer';

import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';




// TODO 不应该全部引入
import 'rxjs'; // https://redux-observable.js.org/docs/Troubleshooting.html RxJS operators are missing!


import {combineEpics, createEpicMiddleware} from 'redux-observable';

import { checkLogin } from './service/auth';

import LoginScreen from './screen/Login';

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

registerScreens(store, Provider);

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Task',
      screen: 'octopus.TaskBoardsScreen', // this is a registered name for a screen
      icon: require('./ic_assignment.png'),
      selectedIcon: require('./ic_assignment.png') // iOS only
    },
    {
      label: 'Todo',
      screen: 'octopus.TodoBoxsScreen',
      icon: require('./ic_assignment.png'),
      selectedIcon: require('./ic_assignment.png') // iOS only
    }
  ]
});

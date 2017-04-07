import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import AuthService from './service/auth';

import { connect, Provider } from 'react-redux';


import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';


// TODO 不应该全部引入
import 'rxjs'; // https://redux-observable.js.org/docs/Troubleshooting.html RxJS operators are missing!


import { combineEpics, createEpicMiddleware } from 'redux-observable';

import appReducer from './reducer';
import rootEpic from './epic';

const epicMiddleware = createEpicMiddleware(rootEpic);
import thunkMiddleware from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist'

const store = createStore(
  appReducer,
  compose(
    applyMiddleware(
      thunkMiddleware,
      epicMiddleware
    ),
    autoRehydrate()
  )
);

persistStore(store);

registerScreens(store, Provider);

(async () => {
  await AuthService.startupFlow();
  console.log(AuthService.isAuth);
  if (!AuthService.isAuth) {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'octopus.LoginScreen', // unique ID registered with Navigation.registerScreen
        title: 'Welcome', // title of the screen as appears in the nav bar (optional)
        navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
      }
    });
  } else {
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
  }
})();

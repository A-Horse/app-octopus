import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { addNavigationHelpers } from 'react-navigation';
import { connect, Provider } from 'react-redux';
import appReducer from './reducer';


// TODO 不应该全部引入
import 'rxjs'; // https://redux-observable.js.org/docs/Troubleshooting.html RxJS operators are missing!

import AppNavigator from './navigator';

import {combineEpics, createEpicMiddleware} from 'redux-observable';



import LoginScreen from './screen/Login';


@connect(state => ({
  nav: state.nav
}))
class AppWithNavigationState extends React.Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav})} />
    );
  }
}

import rootEpic from './epic';

const epicMiddleware = createEpicMiddleware(rootEpic);
import thunkMiddleware from 'redux-thunk';

const store = createStore(
  appReducer,
  applyMiddleware(
    thunkMiddleware,
    epicMiddleware
  )
);

import App from './App.ios';

AppRegistry.registerComponent('OctopusApp', () => App);

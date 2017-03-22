/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { TabNavigator } from 'react-navigation';

import TodoScreen from './screen/Todo.js';
import TaskScreen from './screen/Task.js';

const MyApp = TabNavigator({
  Home: {
    screen: TaskScreen,
  },
  Notifications: {
    screen: TodoScreen,
  },
}, {
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});

AppRegistry.registerComponent('OctopusApp', () => MyApp);

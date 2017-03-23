import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {createStore, combineReducers} from 'redux';
import { addNavigationHelpers } from 'react-navigation';
import {connect, Provider} from 'react-redux';

import { TabNavigator } from 'react-navigation';

import TodoScreen from './screen/Todo.js';
import TaskScreen from './screen/Task.js';

const AppNavigator = TabNavigator({
  Home: {
    screen: TaskScreen,
  },
  Notifications: {
    screen: TodoScreen,
  }
}, {
  tabBarOptions: {
    activeTintColor: '#e91e63',
  }
});

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

const appReducer = combineReducers({
  nav: navReducer,
});

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

const store = createStore(appReducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('OctopusApp', () => App);

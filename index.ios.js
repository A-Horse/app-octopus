import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStore, combineReducers } from 'redux';
import { addNavigationHelpers } from 'react-navigation';
import { connect, Provider } from 'react-redux';
import appReducer from './reducer';
import AppNavigator from './navigator';

import { checkLogin } from './service/auth';

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

const store = createStore(appReducer);

class App extends Component {
  constructor() {
    super();
    this.state = {waitting: true, isLogin: false};
  }

  async componentWillMount() {
    const isLogin = await checkLogin();
    this.setState({isLogin, waitting: false});
  }

  renderMain() {
    if (this.state.waitting) {
      return this.renderLoading();
    }
    if (!this.state.isLogin) {
      return <LoginScreen />
    }
    return <AppWithNavigationState />;
  }

  renderLoading() {
    return <View><Text>Loading</Text></View>;
  }

  render() {
    return (
      <Provider store={store}>
        {this.renderMain()}
      </Provider>
    );
  }
}

AppRegistry.registerComponent('OctopusApp', () => App);

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


// TODO 不应该全部引入
import 'rxjs'; // https://redux-observable.js.org/docs/Troubleshooting.html RxJS operators are missing!

import AppNavigator from './navigator';

import {combineEpics, createEpicMiddleware} from 'redux-observable';

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

import TodoScreen from './screen/Todo';

class App extends Component {
  constructor() {
    super();
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
    return <MainSence />;
  }

  renderLoading() {
    return <View><Text>Loading</Text></View>;
  }

  renderScene(route, navigator) {
    switch (route.name) {
      case 'login':
        return <LoginScreen/>
      case 'main':
        return <AppNavigator/>
      default:
        return <LoginScreen/>
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{name: 'main'}}
          renderScene={this.renderScene}
        />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('OctopusApp', () => App);

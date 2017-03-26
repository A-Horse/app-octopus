import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import AuthService from '../service/auth';

class Index extends Component {
  async componentWillMount() {
    await AuthService.startupFlow();
    if (!AuthService.isAuth) {
      this.props.navigation.navigate('Login');
    } else {
      this.props.navigation.navigate('Main');
    }

  }

  render() {
    return (
        <View>
        </View>
    );
  }
}

export default Index;

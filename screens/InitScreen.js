// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';
import { makeActionRequestCollection } from '../src/action/actions';
import { bindActionCreators } from 'redux';
import { Asset, AppLoading } from 'expo';

class InitScreen extends Component<{
  token: string
}> {
  constructor(props) {
    super(props);
    this.bootstrap();
  }

  componentDidMount() {}

  bootstrap = () => {
    this.props.navigation.navigate(this.props.token ? 'Main' : 'Login');
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
      </View>
    );
  }
}

export const InitScreenContainer = connect(state => {
  return { token: state.auth.token };
})(InitScreen);

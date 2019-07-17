import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';

class InitScreen extends Component {
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

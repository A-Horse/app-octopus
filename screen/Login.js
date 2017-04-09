import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { authRequest } from '../action/auth';
import Style from '../style';

@connect()
class LoginScreen extends Component {
  state = {};

  @autobind
  login() {
    const {dispatch} = this.props;
    const authData = {email: this.state.email, password: this.state.password};
    dispatch(authRequest(authData));
  }

  render() {
    return (
      <View style={styles.container}>

        <TextInput
          style={Style.input}
          placeholder="Email"
          ref="email"
          keyboardType="email-address"
          onChangeText={(email) => this.setState({email})}
        />

        <TextInput
          style={Style.input}
          ref="password"
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
        />

        <Button onPress={this.login.bind(this)} title="Login">Login</Button>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default LoginScreen;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { NavBarBgColor, NavBarColor } from '../constant';
import { authRequest } from '../action/auth';
import Button from '../component/Button';
import { setupMainApp } from '../navigation-setup';

const mapStateToProps = (state, props) => {
  return {
    isLogin: state.auth.isLogin
  };
};

@connect(mapStateToProps)
class LoginScreen extends Component {
  static navigatorStyle = {
    navBarNoBorder: true,
    navBarBackgroundColor: NavBarBgColor,
    navBarButtonColor: '#fff',
    navBarTextColor: NavBarColor
  };

  state = {};

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLogin) {
      setupMainApp();
      this.props.navigator.resetTo({
        screen: 'octopus.TodoBoxsScreen'
      });
    }
  }

  @autobind
  login() {
    const { dispatch } = this.props;
    const authData = { email: this.state.email, password: this.state.password };
    dispatch(authRequest(authData));
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../image/OCTOPUS.png')} style={styles.logo} />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            ref="email"
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            multiline={false}
            onChangeText={password => this.setState({ password })}
            placeholder="Password"
            ref="password"
            secureTextEntry={true}
            style={styles.input}
          />
        </View>

        <Button onPress={this.login.bind(this)} color="green">
          Login
        </Button>
        <TouchableOpacity
          onPress={() =>
            this.props.navigator.push({ screen: 'octopus.SignUpScreen' })}
        >
          <Text>Sign up account</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 0,
    paddingLeft: 20,
    paddingRight: 20
  },
  inputContainer: {
    width: '100%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    marginBottom: 10
  },
  input: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    padding: 10,
    textAlign: 'center'
  },
  logo: {
    width: 170.756,
    height: 27,
    marginBottom: 10
  }
});

export default LoginScreen;

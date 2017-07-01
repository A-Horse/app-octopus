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
import { NavBarBgColor, NavBarColor, ColorBlue } from '../constant';
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

  openErrorToast() {}

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../image/OCTOPUS.png')} style={styles.logo} />

        <View style={styles.toastContainer}>
          <Image
            source={require('../image/icons/remove-red.png')}
            style={styles.toastErrIcon}
          />
          <Text style={styles.toastText}>hi</Text>
        </View>

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
            onChangeText={password => this.setState({ password })}
            placeholder="Password"
            ref="password"
            secureTextEntry={true}
            style={styles.input}
          />
        </View>

        <Button
          style={styles.loginButon}
          onPress={this.login.bind(this)}
          color="green"
        >
          Login
        </Button>

        <TouchableOpacity
          style={styles.signInLinkContainer}
          onPress={() =>
            this.props.navigator.push({ screen: 'octopus.SignUpScreen' })}
        >
          <Text style={styles.signInLink}>sign up account</Text>
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
    width: '80%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    marginBottom: 15
  },
  input: {
    overflow: 'hidden',
    height: 25,
    textAlign: 'center',
    color: '#000',
    fontSize: 14
  },
  logo: {
    width: 170.756,
    height: 27,
    marginBottom: 15
  },
  loginButon: {
    marginTop: 10
  },
  signInLinkContainer: {
    marginTop: 10
  },
  signInLink: {
    color: ColorBlue,
    fontSize: 16
  },
  toastContainer: {
    width: '80%',
    height: 35,
    position: 'absolute',
    backgroundColor: '#333',
    zIndex: 99,
    opacity: 0.95,
    borderRadius: 6,
    overflow: 'hidden',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  toastText: {
    borderRadius: 5,
    color: '#fff'
  },
  toastErrIcon: {
    width: 18,
    height: 18,
    marginLeft: 20
  }
});

export default LoginScreen;

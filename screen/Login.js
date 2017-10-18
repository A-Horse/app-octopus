import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { NavBarBgColor, NavBarColor, ColorBlue } from '../constant';
import Button from '../component/Button';
import { setupMainApp } from '../navigation-setup';
import Toast from '../component/Toast';
import { bindActionCreators } from 'redux';
import { makeActionRequestCollection } from '../action/actioner';

const mapStateToProps = (state, props) => {
  return {
    loginFetching: state.auth.loginFetching,
    isLogin: state.auth.isLogin,
    isAuthError: state.auth.isAuthError,
    authErrorStatus: state.auth.authErrorStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class LoginScreen extends Component {
  static navigatorStyle = {
    navBarNoBorder: true,
    navBarBackgroundColor: NavBarBgColor,
    navBarButtonColor: '#fff',
    navBarTextColor: NavBarColor,
    topBarElevationShadowEnabled: false
  };

  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  state = { authErrMsg: '' };

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginFetching) {
      return;
    } else if (nextProps.isLogin) {
      // TODO extract to service
      setupMainApp();
      this.props.navigator.resetTo({
        screen: 'octopus.TodoBoxsScreen'
      });
    } else if (nextProps.isAuthError) {
      switch (nextProps.authErrorStatus) {
        case 401:
          this.setState({ authErrMsg: 'Email or password not match.' });
          this.refs.authToast.toggle();
          break;
        case 500:
        case 502:
        case 503:
        case 504:
        case 505:
          this.setState({
            authErrMsg: 'The server seems to have encountered a problem'
          });
          this.refs.authToast.toggle();
          break;
        default:
          break;
      }
    }
  }

  @autobind
  login() {
    const authData = { email: this.state.email, password: this.state.password };
    this.props.actions.SIGN_IN_REQUEST(authData);
  }

  render() {
    return (
      <View style={styles.container}>
        <Toast ref="authToast" message={this.state.authErrMsg} />

        <Image source={require('../image/OCTOPUS.png')} style={styles.logo} />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            ref="email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
            underlineColorAndroid="transparent"
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={password => this.setState({ password })}
            placeholder="Password"
            ref="password"
            secureTextEntry={true}
            returnKeyType="done"
            underlineColorAndroid="transparent"
          />
        </View>

        <Button style={styles.loginButon} onPress={this.login.bind(this)} color="green">
          Login
        </Button>

        <TouchableOpacity
          style={styles.signInLinkContainer}
          onPress={() => this.props.navigator.push({ screen: 'octopus.SignUpScreen' })}
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
    marginBottom: 15,
    padding: 5
  },
  input: {
    overflow: 'hidden',
    textAlign: 'center',
    color: '#000',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    padding: 5
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
  }
});

export default LoginScreen;

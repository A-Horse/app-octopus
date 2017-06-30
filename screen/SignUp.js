import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, View, Text, Image, TextInput } from 'react-native';
import { NavBarBgColor, NavBarColor } from '../constant';
import { authRequest, signupRequest } from '../action/auth';
import Button from '../component/Button';
import Style from '../style';
import { setupMainApp } from '../navigation-setup';
import R from 'ramda';

const mapStateToProps = (state, props) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: function(data) {
      return dispatch(signupRequest(data));
    }
  };
};

@connect(mapStateToProps)
class SignUpScreen extends Component {
  static navigatorStyle = {
    navBarNoBorder: true,
    navBarBackgroundColor: NavBarBgColor,
    navBarButtonColor: '#fff',
    navBarTextColor: NavBarColor
  }

  state = {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLogin) {
      setupMainApp();
      this.props.navigator.resetTo({
        screen: 'octopus.TodoBoxsScreen',
      });
    }
  }

  signin() {
    this.props.signup(R.pick(['email', 'username', 'password'], this.state))
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../image/logo.png')} style={styles.logo}/>

        <TextInput
          style={styles.input}
          placeholder="Email"
          ref="email"
          keyboardType="email-address"
          onChangeText={(email) => this.setState({email})}
        />

        <TextInput
          style={styles.input}
          placeholder="username"
          ref="username"
          onChangeText={(username) => this.setState({username})}
        />

        <TextInput
          style={styles.input}
          ref="password"
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
        />

        <TextInput
          style={styles.input}
          ref="repeat"
          secureTextEntry={true}
          placeholder="Repeat Password"
          onChangeText={(repeat) => this.setState({repeat})}
        />
        <Button onPress={this.onSignUpPress} color="green">Sign Up</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: 'transparent',
    borderRadius: 4,
    height: 40,
    marginBottom: 10,
    overflow: 'hidden',
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center'
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginBottom: 10
  }
});

export default SignUpScreen;

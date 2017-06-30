import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { NavBarBgColor, NavBarColor } from '../constant';
import { authRequest } from '../action/auth';
import Button from '../component/Button';
import Style from '../style';
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
  }

  state = {};

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLogin) {
      setupMainApp();
      this.props.navigator.resetTo({
        screen: 'octopus.TodoBoxsScreen',
      });
    }
  }

  @autobind
  login() {
    const {dispatch} = this.props;
    const authData = {email: this.state.email, password: this.state.password};
    dispatch(authRequest(authData));
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
          ref="password"
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
        />

        <Button onPress={this.login.bind(this)} color="green">Login</Button>
        <TouchableOpacity onPress={() => this.props.navigator.push({screen: 'octopus.SignUpScreen'})}>
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
    padding: 20
  },
  input: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#bbb',
    backgroundColor: 'transparent',
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

export default LoginScreen;

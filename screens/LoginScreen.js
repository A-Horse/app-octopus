// @flow
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeActionRequestCollection } from '../src/action/actions';
import { Button } from '../src/component/Button';
import { Input } from '../src/component/Input';

export class LoginScreen extends React.Component<
  {
    actions: any
  },
  {
    email: string,
    password: string
  }
> {
  static navigationOptions = {};

  state = {
    email: '',
    password: ''
  };

  componentWillMount() {}

  onLogin = () => {
    this.props.actions.SIGNIN_REQUEST({
      email: this.state.email,
      password: this.state.password
    });
  };

  isValid(): boolean {
    return this.state.email && this.state.password;
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={{ height: 30, width: 10, backgroundColor: '#ee3f30' }} />
          <Text style={{ color: '#ee3f30', fontWeight: '900' }}>Login</Text>
          <Image style={{ width: 100, height: 100 }} source={require('../assets/images/icon-small.png')} />
        </View>

        <View style={{ width: '100%' }}>
          <Input
            icon="envelope-o"
            iconColor="#868989"
            style={{ marginBottom: 18 }}
            placeholder="Email"
            onChange={value => {
              this.setState({ email: value });
            }}
          />

          <Input
            icon="key"
            iconColor="#868989"
            style={{ marginBottom: 18 }}
            placeholder="Password"
            textContentType="password"
            onChange={value => {
              this.setState({ password: value });
            }}
          />
        </View>

        <Button icon="sign-in" style={{}} title="Login" onPress={this.onLogin} />
      </View>
    );
  }
}

export default connect(
  () => {
    return {};
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 100
  }
});

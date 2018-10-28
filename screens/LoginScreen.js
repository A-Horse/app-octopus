// @flow
import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeActionRequestCollection } from '../src/action/actions';
import { Button } from 'react-native-elements';
import { Input } from '../src/component/Input';

export class LoginScreen extends React.Component<{
  actions: any
}> {
  static navigationOptions = {};

  state = {
    email: null,
    password: null
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
        <Image style={{ width: 100, height: 100 }} source={require('../assets/images/icon-small.png')} />
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

        <Button
          icon={{ name: 'login', type: 'material-community' }}
          style={styles.submitButton}
          title="Login"
          backgroundColor={this.isValid() ? '#44a2df' : '#e8e8e8'}
          borderRadius={3}
          onPress={this.onLogin}
        />
      </View>
    );
  }
}

export default connect(
  state => {
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
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 5
  }
});

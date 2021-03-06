import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeActionRequestCollection } from '../action/actions';
import { Button } from '../component/Button';
import { Input } from '../component/Input';

export class LoginScreen extends React.Component {
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
    return !!this.state.email && !!this.state.password;
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={{ width: 70, height: 70, marginLeft: -8 }} source={require('../assets/images/icon-small.png')} />
        <Text style={{ color: '#f36954', fontWeight: '900', fontSize: 30, marginBottom: 30 }}>Login</Text>

        <View style={{ width: '100%' }}>
          <Input
            icon="envelope-o"
            iconColor="#868989"
            style={{ marginBottom: 18 }}
            placeholder="Email"
            textContentType="emailAddress"
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

        <Button round={true} icon="sign-in" style={{ alignSelf: 'flex-end' }} title="Login" onPress={this.onLogin} />
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

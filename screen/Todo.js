import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestUserTodoList } from '../action/todo';
import Memory from '../service/memory';
import { AUTH_DATA } from '../constant';
import autobind from 'autobind-decorator';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';

@connect()
class TodoScreen extends Component {
  componentDidMount() {
    // this.getTodoList();
  }

  @autobind
  getTodoList() {
    const { dispatch } = this.props;
    console.log(
      dispatch
    );
    const userId = Memory.get(AUTH_DATA).user.id;
    dispatch(requestUserTodoList(userId));
  }

  render() {
    // const { todos } = this.props;
    return (
      <View style={styles.container}>
        <Button title="hi" onPress={this.getTodoList}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

export default TodoScreen;

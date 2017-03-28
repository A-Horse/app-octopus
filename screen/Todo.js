import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestUserTodoList } from '../action/todo';
import Memory from '../service/memory';
import { AUTH_DATA } from '../constant';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

@connect()
class TodoScreen extends Component {
  componentDidMount() {
    this.getTodoList();
  }

  getTodoList() {
    const { dispatch } = this.props;
    const userId = Memory.get(AUTH_DATA).user.id;
    dispatch(requestUserTodoList(userId));
  }

  render() {
    // const { todos } = this.props;
    return (
      <View style={styles.container}>

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

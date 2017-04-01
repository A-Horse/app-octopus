import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestUserTodoList } from '../action/todo';
import Memory from '../service/memory';
import { AUTH_DATA } from '../constant';
import autobind from 'autobind-decorator';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import R from 'ramda';

import TodoLists from './todo/TodoLists';


@connect()
class TodoScreen extends Component {
  componentDidMount() {
    this.getTodoList();
  }

  @autobind
  getTodoList() {
    const { dispatch } = this.props;
    const userId = Memory.get(AUTH_DATA).user.id;
    return dispatch(requestUserTodoList(userId));
  }

  render() {
    // const { todos } = this.props;
    return (
      <View style={styles.container}>
        <TodoLists />
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

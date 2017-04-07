import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestUserTodoList } from '../action/todo';
import Memory from '../service/memory';
import { AUTH_DATA } from '../constant';
import autobind from 'autobind-decorator';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import R from 'ramda';

import TodoBoxs from './todo/TodoBoxs';


@connect()
class TodoScreen extends Component {
  componentDidMount() {

  }

  render() {
    // const { todos } = this.props;
    return (
      <View style={styles.container}>
        <TodoBoxs navigator={this.props.navigator}/>
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

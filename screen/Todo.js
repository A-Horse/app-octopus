import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestUserTodoList } from '../action/todo';
import Memory from '../service/memory';
import { AUTH_DATA } from '../constant';
import autobind from 'autobind-decorator';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import R from 'ramda';
import { addNavigationHelpers } from 'react-navigation';

import TodoBoxs from './todo/TodoBoxs';


@connect(state => ({
  nav: state.nav,
}))
class TodoScreen extends Component {
  componentDidMount() {
    console.log(this.props.navigation.state.params);
  }

  render() {
    // const { todos } = this.props;
    return (
      <View style={styles.container}>
        <TodoBoxs navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav,
          })}
        dispatch={this.props.dispatch}/>
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

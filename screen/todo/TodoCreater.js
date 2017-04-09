import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, Text, View, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import Todo from './Todo';
import R from 'ramda';

export default class TodoCreater extends Component {

  @autobind
  getTodos() {
    const userId = this.props.userId;
    this.props.actions.getTodos(this.props.meta.id, {userId});
  }

  renderTodos() {
    const { todos } = this.props;
    return todos.map(todo => <Todo key={todo.id} todo={todo} />);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../image/ios/ic_add/ic_add.png')} />
        <Text style={styles.text}>Add Todo...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderStyle: 'solid',
    borderRadius: 3,
    borderColor: '#000',
    marginTop: 10,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    maxHeight: 46,
    alignItems: 'center'
  },
  text: {
    fontSize: 18
  }
});

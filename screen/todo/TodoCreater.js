import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import Todo from './Todo';
import R from 'ramda';

export default class TodoCreater extends Component {
  state = {}

  @autobind
  getTodos() {
    const userId = this.props.userId;
    this.props.actions.getTodos(this.props.meta.id, {userId});
  }

  renderTodos() {
    const { todos } = this.props;
    return todos.map(todo => <Todo key={todo.id} todo={todo} />);
  }

  @autobind
  onAddPress() {
    this.refs.content.focus();
    this.props.createTodo({content: this.state.content});
    this.refs.content.clear();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onAddPress}>
          <Image source={require('../../image/ios/ic_add/ic_add.png')} />
        </TouchableOpacity>

        <TextInput
          style={styles.content}
          placeholderTextColor="#000"
          placeholder="Add Todo..."
          ref="content"
          onBlur={this.props.clearNavButton}
          onFocus={this.props.addCreateTodoButton}
          onChangeText={(content) => this.setState({content})}
        />
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
  content: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginTop: 3
  }
});

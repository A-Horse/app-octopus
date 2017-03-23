import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

export default class TodoList extends Component {
  constructor() {

  }

  @autobind
  renderTodo(todo) {
    return <Todo todo={todo}/>
  }

  renderTodos() {
    return this.props.todos.map(this.renderTodo);
  }

  render() {

  }
}

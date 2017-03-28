import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';


export default class TodoList extends Component {
  static propTypes = {
    todos: React.PropTypes.array.isRequired
  };

  @autobind
  renderTodo(todo) {
    return <Todo todo={todo}/>
  }

  renderTodos() {
    return this.props.todos.map(this.renderTodo);
  }

  render() {
    return (
      <View>
        {this.renderTodos()}
      </View>
    );
  }
}

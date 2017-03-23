import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

export default class Todo extends Component {
  constructor() {

  }

  render() {
    const {todo} = this.props;

    return (
      <div>
        {todo.content}
      </div>
    );
  }
}

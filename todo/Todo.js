import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class Todo extends Component {
  static propTypes = {
    todo: React.PropTypes.object.isRequired
  };

  render() {
    const {todo} = this.props;

    return (
      <View>
        {todo.content}
      </View>
    );
  }
}

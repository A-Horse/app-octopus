import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import autobind from 'autobind-decorator';
import CheckBox from '../../component/CheckBox';
import StarCheckBox from '../../component/StarCheckBox';

export default class Todo extends Component {
  static propTypes = {
    todo: React.PropTypes.object.isRequired
  };

  @autobind
  goTodoDetail() {
    this.props.navigator.push({
      screen: 'octopus.TodoDetailScreen',
      passProps: {todo: this.props.todo},
      backButtonTitle: ''
    });
  }

  render() {
    const {todo} = this.props;
    return (
      <TouchableOpacity onPress={this.goTodoDetail}>
        <View style={styles.container}>
          <CheckBox defaultChecked={todo.isDone} style={styles.checkbox}
            onClick={(checked) => {this.props.updateTodo({isDone: checked})}} />
          <Text numberOfLines={1} style={styles.content}>
            {todo.content}
          </Text>
          <StarCheckBox onClick={() => {}} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 3,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#fff',
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    marginTop: 2,
    marginRight: 6
  },
  borderStar: {
    flex: 1
  },
  content: {
    flex: 1,
    textAlign: 'left',
    fontSize: 18
  }
});

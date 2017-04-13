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
          <CheckBox style={styles.checkbox} onClick={() => {}} />
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

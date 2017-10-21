import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import autobind from 'autobind-decorator';
import CheckBox from '../../component/CheckBox';
import StarCheckBox from '../../component/StarCheckBox';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { navigatorStyle } from '../../navigation-setup';

export default class Todo extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.goTodoDetail = this.goTodoDetail.bind(this);
  }

  goTodoDetail = _.throttle(
    function() {
      this.props.navigator.push({
        screen: 'octopus.TodoDetailScreen',
        passProps: {
          todoId: this.props.todo.id,
          meta: this.props.meta,
          updateTodo: this.props.updateTodo
        },
        backButtonTitle: '',
        navigatorStyle
      });
    },
    1000,
    { trailing: false }
  );

  render() {
    const { todo } = this.props;
    return (
      <TouchableOpacity onPress={this.goTodoDetail}>
        <View style={[styles.container, { opacity: todo.isDone ? 0.8 : 1 }]}>
          <CheckBox
            defaultChecked={todo.isDone}
            style={styles.checkbox}
            onClick={checked => {
              this.props.updateTodo({ isDone: checked });
            }}
          />
          <Text
            numberOfLines={1}
            style={[
              styles.content,
              { textDecorationLine: todo.isDone ? 'line-through' : 'none' },
              { color: todo.isDone ? '#aaa' : '#333' }
            ]}
          >
            {todo.content}
          </Text>
          <StarCheckBox
            style={styles.starCheckBox}
            defaultChecked={todo.isStar}
            onClick={checked => {
              this.props.updateTodo({ isStar: checked });
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1'
  },
  checkbox: {
    marginRight: 6,
    paddingLeft: 10,
    paddingTop: 17,
    paddingBottom: 5
  },
  borderStar: {
    flex: 1
  },
  content: {
    flex: 1,
    textAlign: 'left',
    fontSize: 18,
    paddingTop: 15,
    paddingBottom: 5
  },
  starCheckBox: {
    paddingRight: 10
  }
});

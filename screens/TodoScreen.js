// @flow
import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../src/action/actions';
import { bindActionCreators } from 'redux';
import { CheckBox } from '../components/CheckBox';

class TodoItem extends React.Component<{ todo: any }> {
  onChange = (isDone: boolean) => {
    this.props.onTodoDoneChange({
      id: this.props.todo.id,
      isDone
    });
  };

  render() {
    return (
      <TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <View style={{ flexShrink: 0 }}>
            <CheckBox isChecked={Boolean(this.props.todo.isDone)} onChange={this.onChange} />
          </View>
          <Text numberOfLines={1} style={{ textAlign: 'left', flexShrink: 10 }}>
            {this.props.todo.content}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export class TodoScreen extends React.Component<{ todoBoxId: string, unDoneTodos: Todo[], doneTodos: Todo[] }, {}> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('todoBox').name
    };
  };

  componentWillMount() {
    this.props.actions.GET_TODOBOX_REQUEST({ todoBoxId: this.props.todoBoxId });
  }

  onTodoDoneChange = (todoItem: any) => {
    this.props.actions.UPDATE_TODO_REQUEST(
      {
        ...todoItem
      },
      { todoBoxId: this.props.todoBoxId }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => String(item.id)}
          data={this.props.unDoneTodos}
          renderItem={({ item }) => <TodoItem onTodoDoneChange={this.onTodoDoneChange} todo={item} />}
        />
      </View>
    );
  }
}

export const TodoScreenContainer = connect(
  (state, props) => {
    const todoBoxId = props.navigation.getParam('todoBox').id;
    const todos = state.todo[todoBoxId] || [];

    const doneTodos = todos.filter(todo => todo.isDone);
    const unDoneTodos = todos.filter(todo => !todo.isDone);

    return {
      todoBoxId,
      todos,
      doneTodos,
      unDoneTodos
    };
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(TodoScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8'
  }
});

import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import {
  StyleSheet,
  Button,
  Text,
  View,
  ScrollView,
  ListView,
  SwipeableListView
} from 'react-native';
import SwipeableListViewDataSource from 'react-native/Libraries/Experimental/SwipeableRow/SwipeableListViewDataSource';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import R from 'ramda';
import Todo from './Todo';
import TodoCreater from './TodoCreater';
import { ScreenBgColor } from '../../constant';
import { makeActionRequestCollection } from '../../action/actioner';

import * as todosActions from './Todos.action';

const getAllTodos = (state, props) => {
  const { meta } = props;
  const { entities, results } = state.todo;
  const todoResults = results[meta.id] || [];
  return todoResults.map(id => entities[id]);
};

const getTodos = createSelector([getAllTodos], R.sort(R.prop('isDone')));

const mapStateToProps = (state, props) => {
  return {
    user: state.auth.user,
    userId: state.auth.user.id,
    todos: getTodos(state, props)
  };
};

const mapDispatchToProps = dispatch => {
  // TODO you know
  return {
    actions: bindActionCreators(todosActions, dispatch),
    actions2: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Todos extends Component {
  static navigatorStyle = {
    navBarNoBorder: true,
    navBarButtonColor: '#fff',
    navBarTextColor: '#fff'
  };

  todoInstances = [];

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    // TODO: maybe better way
    if (event.type === 'ScreenChangedEvent' && event.id === 'willAppear') {
      this.clearNavButton();
    }
    if (event.type === 'NavBarButtonPress') {
      event.id === 'add' && this.createTodo();
    }
  }

  @autobind
  createTodo() {
    const userId = this.props.user.id;
    this.props.actions.createTodo(
      { boxId: this.props.meta.id, userId },
      { content: this.refs.creater.state.content }
    );
    this.refs.creater.clear();
    // this.clearNavButton();
  }

  componentDidMount() {
    const userId = this.props.user.id;
    const boxId = this.props.meta.id; // TODO rename meta.id => boxId
    this.props.actions2.GET_TODOLIST_REQUEST({ boxId }, { userId });

    /* setTimeout(() => {
     *   this.todoInstances[0].goTodoDetail();
     * }, 500);*/
  }

  @autobind
  addCreateTodoButton() {
    this.props.navigator.setButtons({
      rightButtons: [{ title: 'Add', id: 'add' }]
    });
  }

  @autobind
  clearNavButton() {
    this.props.navigator.setButtons({
      rightButtons: []
    });
  }

  /* @autobind
   * getTodos() {}
   */
  @autobind
  renderTodo(todo) {
    const userId = this.props.user.id;
    return (
      <Todo
        boxId={this.props.meta.id}
        user={this.props.user}
        meta={this.props.meta}
        ref={todoInstance => this.todoInstances.push(todoInstance)}
        key={todo.id}
        todo={todo}
        navigator={this.props.navigator}
        updateTodo={data =>
          this.props.actions.updateTodo(this.props.meta.id, { userId, id: todo.id }, data)}
      />
    );
  }

  @autobind
  renderActions(todo) {
    return (
      <View>
        <Button title="1" />
        <Button title="2" />
      </View>
    );
  }

  renderTodos() {
    const { todos } = this.props;
    const todoDataSource = new SwipeableListViewDataSource({
      getRowData: (data, sectionID, rowID) => data[sectionID][rowID],
      getSectionHeaderData: (data, sectionID) => data[sectionID],
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    }).cloneWithRowsAndSections([todos]);
    return (
      <View>
        <SwipeableListView
          maxSwipeDistance={90}
          dataSource={todoDataSource}
          renderRow={this.renderTodo}
          enableEmptySections={true}
        />
      </View>
    );
    // renderQuickActions={this.renderActions}
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <TodoCreater
            ref="creater"
            addCreateTodoButton={this.addCreateTodoButton}
            clearNavButton={this.clearNavButton}
            createTodo={this.createTodo}
          />
          {this.renderTodos()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: ScreenBgColor,
    overflow: 'scroll'
  },
  scrollView: {
    flex: 1
  }
});

export default Todos;

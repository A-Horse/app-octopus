import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, Text, View, ScrollView, ListView } from 'react-native';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import R from 'ramda';
import Todo from './Todo';
import TodoCreater from './TodoCreater';
import * as todosActions from './Todos.action';


const getAllTodos = (state, props) => {
  const { meta } = props;
  const { entities, results } = state.todo;
  const todoResults = results[meta.id] || [];
  return todoResults.map(id => entities[id]);
};

const getTodos = createSelector([getAllTodos], R.sortBy(R.prop('isDone')));

const mapStateToProps = (state, props) => {
  return {
    user: state.auth.user,
    userId: state.auth.user.id,
    todos: getTodos(state, props)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(todosActions, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Todos extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: '#1d92c3',
    navBarNoBorder: true,
    navBarButtonColor: '#fff',
    navBarTextColor: '#fff'
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    // TODO: maybe better way
    if (event.type === 'ScreenChangedEvent' && event.id === 'willAppear') this.clearNavButton();
    if (event.type === 'NavBarButtonPress') {
      event.id === 'add' && this.createTodo();
    }
  }

  createTodo() {
    const userId = this.props.user.id;
    // FIXME
    this.props.actions.createTodo(this.props.meta.id, {userId})({content: this.refs.creater.state.content});
    this.refs.creater.clear();
    this.clearNavButton();
  }

  componentDidMount() {
    this.getTodos();
  }

  @autobind
  addCreateTodoButton() {
    this.props.navigator.setButtons({
      rightButtons: [{title: 'Add', id: 'add'}]
    });
  }

  @autobind
  clearNavButton() {
    this.props.navigator.setButtons({
      rightButtons: []
    });
  }

  @autobind
  getTodos() {
    const userId = this.props.user.id;
    this.props.actions.getTodos(this.props.meta.id, {userId});
  }

  renderTodos() {
    const { todos } = this.props;
    const userId = this.props.user.id;
    return todos.map(todo =>
      <Todo boxId={this.props.meta.id} user={this.props.user}
        key={todo.id} todo={todo} navigator={this.props.navigator}
        updateTodo={(data) => this.props.actions.updateTodo(this.props.meta.id, {userId, id: todo.id}, data)}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TodoCreater ref="creater" addCreateTodoButton={this.addCreateTodoButton}
          clearNavButton={this.clearNavButton} />
        {this.renderTodos()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#6eb8d4',
    paddingLeft: 10,
    paddingRight: 10,
    overflow: 'scroll'
  }
});

export default Todos;

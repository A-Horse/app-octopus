import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import R from 'ramda';
import Todo from './Todo';
import TodoCreater from './TodoCreater';
import * as todosActions from './Todos.action';

const getUserId = state => state.auth.user.id;
const getAllTodos = (state, props) => {
  const { meta } = props;
  const { entities } = state.todo;
  const todoResults = state.todo.results[meta.id] || [];
  return todoResults.map(id => entities[id]);
};

const getTodos = createSelector([getAllTodos], R.identity);

const mapStateToProps = (state, props) => {
  return {
    userId: getUserId(state),
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
    if (event.type === 'ScreenChangedEvent' && event.id === 'willAppear') {
      this.clearNavButton();
    }
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'add') {
        this.createTodo();
      }
    }
  }

  createTodo() {
    const userId = this.props.userId;
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
    const userId = this.props.userId;
    this.props.actions.getTodos(this.props.meta.id, {userId});
  }

  renderTodos() {
    const { todos } = this.props;
    return todos.map(todo => <Todo key={todo.id} todo={todo} navigator={this.props.navigator} />);
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

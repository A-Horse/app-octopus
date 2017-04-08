import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import Todo from './Todo';
import R from 'ramda';
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
    navBarNoBorder: true
  }
  static navigatorButtons = {

  };

  componentDidMount() {
    this.getTodos();
  }

  @autobind
  getTodos() {
    const userId = this.props.userId;
    this.props.actions.getTodos(this.props.meta.id, {userId});
  }

  renderTodos() {
    const { todos } = this.props;
    return todos.map(todo => <Todo key={todo.id} todo={todo} />);
  }


  render() {
    return (
      <View style={styles.container}>
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

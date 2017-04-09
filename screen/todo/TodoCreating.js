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

const mapStateToProps = (state, props) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class TodoCreating extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: '#1d92c3',
    navBarNoBorder: true,
    navBarButtonColor: '#fff',
    navBarTextColor: '#fff'
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
        <TodoCreater />
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

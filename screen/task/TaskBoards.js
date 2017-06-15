import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autobind from 'autobind-decorator';
import { createSelector } from 'reselect';
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, Button, ScrollView, ListView } from 'react-native';
import R from 'ramda';
import moment from 'moment';
import * as todosActions from './Todos.action';

const getTodoBox = (state, props) => {
  const { entities } = state.todoBox;
  return R.values(entities.todoBox);
};

const mapStateToProps = (state, props) => {
  return {
    userId: state.auth.user.id,
    todoBoxs: createSelector([getTodoBox], R.identity)(state, props)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(todosActions, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class TaskBoards extends Component {

  static navigatorButtons = {
    leftButtons: [

    ],
    rightButtons: [

    ]
  }


  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#71b8d2'
  }
});

export default TaskBoards;

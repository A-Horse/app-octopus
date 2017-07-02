import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autobind from 'autobind-decorator';
import { createSelector } from 'reselect';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ListView
} from 'react-native';
import R from 'ramda';
import moment from 'moment';
import * as taskActions from './Task.action';

const mapStateToProps = (state, props) => {
  return {
    userId: state.auth.user.id,
    boards: R.values(state.task.TaskBoards)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(taskActions, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class TaskBoards extends Component {
  static navigatorStyle = {
    navBarButtonColor: '#fff',
    navBarTextColor: '#fff'
  };

  static navigatorButtons = {
    leftButtons: [],
    rightButtons: []
  };

  componentWillMount() {
    this.props.actions.getTaskBoards({ userId: this.props.userId });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.boards.map(board => {
          <View key={board.id}>
            <Text>
              {board.name}
            </Text>
          </View>;
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  boardContainer: {}
});

export default TaskBoards;

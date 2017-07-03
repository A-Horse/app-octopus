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
  Dimensions,
  ListView
} from 'react-native';
import R from 'ramda';
import moment from 'moment';
import * as taskActions from './Task.action';
import {
  storageUrlPrefix,
  urlPrefix,
  DEFAULT_BOARD_COVER_SRC
} from '../../constant';

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

  componentDidMount() {
    this.props.actions.getTaskBoards({ userId: this.props.userId });
  }

  @autobind
  renderBoard(board) {
    return (
      <TouchableOpacity>
        <View key={board.id} style={styles.boardContainer}>
          <Image
            style={styles.boardBgImg}
            source={{
              uri: !!board.cover
                ? storageUrlPrefix + board.cover
                : urlPrefix + DEFAULT_BOARD_COVER_SRC
            }}
          />
          <View style={styles.boardInnerContainer}>
            <Text style={styles.boardName}>
              {board.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const boardsSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }).cloneWithRows(this.props.boards);
    return (
      <View style={styles.container}>
        <ListView
          style={styles.listView}
          dataSource={boardsSource}
          renderRow={this.renderBoard}
          enableEmptySections={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  listView: {
    flex: 1,
    width: '100%',
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  boardContainer: {
    width: '100%',
    height: Dimensions.get('window').width * 0.9 / (16 / 9),
    borderRadius: 5,
    position: 'relative',
    overflow: 'hidden',
    marginTop: 10
  },
  boardBgImg: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1,
    top: 0,
    left: 0
  },
  boardInnerContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    flex: 1,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, .05)'
  },
  boardName: {
    color: '#fff',
    fontSize: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    padding: 8
  }
});

export default TaskBoards;

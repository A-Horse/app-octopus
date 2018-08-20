// flow
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ListView,
  View
} from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { WebBrowser } from 'expo';
import { makeActionRequestCollection } from '../src/action/actions';
import { bindActionCreators } from 'redux';
import { MonoText } from '../components/StyledText';
import { SERVER_BASE } from '../src/env/env';
import Swiper from 'react-native-swiper';
import { TaskTrackContainer } from '../src/component/Track';

export class TaskBoardScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('board', 'TaskBoard').name
    };
  };

  state = {
    selectedIndex: 0
  };

  componentWillMount() {
    this.props.actions.GET_TASK_BOARD_REQUEST({ id: this.props.navigation.getParam('board').id });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.tracks.length ? (
          <Swiper
            style={styles.wrapper}
            key={`${this.props.board.id}-${this.props.board.name}`}
            automaticallyAdjustContentInsets={true}
            showsButtons={false}
            horizonta={true}
            showsPagination={true}
          >
            {this.props.tracks.map(track => {
              return <TaskTrackContainer key={track.id} track={track} board={this.props.board} />;
            })}
          </Swiper>
        ) : (
          <View>
            <Text>hi</Text>
          </View>
        )}
      </View>
    );
  }
}

export const TaskBoardScreenContainer = connect(
  (state, props) => {
    const board = state.task.taskBoardMap[props.navigation.getParam('board').id];

    let tracks;
    if (board && board.tracks) {
      tracks = board.tracks
        .map(id => state.task.taskTrackMap[id])
        .sort((a, b) => a.index > b.index);
    }

    return {
      user: state.auth.user,
      board,
      tracks: tracks || []
    };
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(TaskBoardScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  wrapper: {},
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  contentContainer: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20
  },
  boardContainer: {
    width: '100%',
    height: Dimensions.get('window').width * 0.9 / (16 / 9),
    borderRadius: 5,
    position: 'relative',
    overflow: 'hidden',
    marginTop: 10
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
  },
  boardBgImg: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1,
    top: 0,
    left: 0
  }
});

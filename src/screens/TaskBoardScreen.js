// @flow
import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../action/actions';
import { bindActionCreators } from 'redux';
import Swiper from '../component/Swiper';
import { TaskTrackContainer } from '../component/Track';
import { DoubleBounce } from 'react-native-loader';

export class TaskBoardScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('board', 'TaskBoard').name,
      headerBackTitle: ' '
    };
  };

  componentWillMount() {
    this.props.actions.GET_TASK_BOARD_REQUEST({ id: this.props.navigation.getParam('board').id });
  }

  componentWillUnmount() {}

  render() {
    return (
      <View style={styles.container}>
        {this.props.tracks.length ? (
          <Swiper
            scrollViewStyle={{
              width: Dimensions.get('window').width - 40,
              overflow: 'visible',
              alignSelf: 'center'
            }}
            loop={false}
            style={styles.wrapper}
            key={`${this.props.board.id}-${this.props.board.name}`}
            automaticallyAdjustContentInsets={true}
            showsButtons={false}
            horizonta={true}
            showsPagination={true}
          >
            {this.props.tracks.map(track => {
              return (
                <TaskTrackContainer
                  key={track.id}
                  track={track}
                  board={this.props.board}
                  navigation={this.props.navigation}
                />
              );
            })}
          </Swiper>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <DoubleBounce size={20} color="#e9676b" />
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
      tracks = board.tracks.map(id => state.task.taskTrackMap[id]).sort((a, b) => a.index > b.index);
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
    backgroundColor: '#e8e8e8',
    overflow: 'hidden'
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
    height: (Dimensions.get('window').width * 0.9) / (16 / 9),
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

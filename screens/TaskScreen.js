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

export class TaskScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    this.props.actions.GET_TASK_BOARD_LIST_REQUEST({
      userId: this.props.user.id
    });
  }

  navToTaskBoard = taskBoardName => {
    this.props.navigation.navigate('TaskBoard', {
      taskBoardName
    });
  };

  render() {
    const boardsSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }).cloneWithRows(this.props.boards);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <ListView
            style={styles.listView}
            dataSource={boardsSource}
            renderRow={board => {
              return (
                <TouchableOpacity onPress={() => this.navToTaskBoard(board.name)}>
                  <View key={board.id} style={styles.boardContainer}>
                    <Image
                      style={styles.boardBgImg}
                      source={{
                        uri: !!board.cover
                          ? `${SERVER_BASE}storage/${board.cover}`
                          : `${SERVER_BASE}static/image/board-cover/world-circle.png`
                      }}
                    />
                    <View style={styles.boardInnerContainer}>
                      <Text style={styles.boardName}>{board.name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            enableEmptySections={true}
          />
        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }
}

export const TaskScreenContainer = connect(
  state => {
    return {
      user: state.auth.user,
      boards: R.values(state.task.taskBoradMap)
    };
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(TaskScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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

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

export class TaskBoardScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('board', 'TaskBoard').name
    };
  };

  componentWillMount() {
    this.props.actions.GET_TASK_BOARD_REQUEST({ id: this.props.navigation.getParam('board').id });
  }

  render() {
    const boardsSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }).cloneWithRows(this.props.boards);
    return (
      <View style={styles.container}>
        <Swiper
          style={styles.wrapper}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          showsButtons={false}
        >
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
        </Swiper>
      </View>
    );
  }
}

export const TaskBoardScreenContainer = connect(
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
)(TaskBoardScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
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

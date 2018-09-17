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
import Swiper from '../src/component/Swiper';
import { TaskTrackContainer } from '../src/component/Track';
import { DoubleBounce } from 'react-native-loader';

export class TaskCardDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'CARD',
      headerBackTitle: null
    };
  };

  state = {
    hidden: false
  };

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <View style={styles.container}>
        <Text>Task</Text>
      </View>
    );
  }
}

export const TaskCardDetailScreenContainer = connect(
  (state, props) => {
    return {};
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(TaskCardDetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8'
  }
});

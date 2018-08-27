// @flow
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
import { makeActionRequestCollection } from '../../src/action/actions';
import { bindActionCreators } from 'redux';
import { MonoText } from '../../components/StyledText';
import { SERVER_BASE } from '../../src/env/env';
import Swiper from 'react-native-swiper';
import { TaskCard } from './TaskCard';
import { TaskCardCreater } from './TaskCardCreater';
import { TrackEmpty } from './TrackEmpty';

export class Track extends React.Component<{
  boards: any
}> {
  componentWillMount() {}

  addTask = ({ title, deadline }) => {
    this.props.actions.ADD_TASK_CARD_REQUEST({
      boardId: this.props.board.id,
      trackId: this.props.track.id,
      title,
      deadline
    });
  };

  render() {
    const cardsSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }).cloneWithRows(this.props.cards);

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ScrollView style={styles.scrollContainer}>
            <View>
              <Text style={styles.trackName}>◉ {this.props.track.name}</Text>
            </View>

            <ListView
              style={{}}
              dataSource={cardsSource}
              renderRow={card => {
                return <TaskCard card={card} />;
              }}
              enableEmptySections={true}
            />

            {!this.props.cards.length && <TrackEmpty />}
            <TaskCardCreater onSubmit={this.addTask} />
          </ScrollView>
        </View>
      </View>
    );
  }
}

export const TaskTrackContainer = connect(
  (state, props) => {
    const track = state.task.taskTrackMap[props.track.id];

    let cards;
    if (track && track.cards) {
      cards = track.cards.map(id => state.task.taskCardMap[id]);
    }

    return {
      user: state.auth.user,
      track,
      cards
    };
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(Track);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 10
  },
  trackName: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 17,
    marginBottom: 10
  },
  innerContainer: {
    backgroundColor: '#e9676b',
    padding: 20,
    borderRadius: 5
  },
  scrollContainer: {}
});

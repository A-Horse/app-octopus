// @flow
import React from 'react';
import { ScrollView, StyleSheet, Text, ListView, View } from 'react-native';
import { connect } from 'react-redux';

import { makeActionRequestCollection } from '../../src/action/actions';
import { bindActionCreators } from 'redux';
import { TaskCard } from './TaskCard';
import { TaskCardCreater } from './TaskCardCreater';
import { TrackEmpty } from './TrackEmpty';

export class Track extends React.Component<{
  boards: any,
  navigation: any
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

  onCardPress = card => {
    this.props.navigation.navigate('TaskCard', {
      card
    });
  };

  goToCreate = () => {
    this.props.navigation.navigate('TaskCreate', {
      board: this.props.board,
      track: this.props.track
    });
  };

  render() {
    const cardsSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }).cloneWithRows(this.props.cards);

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ScrollView removeClippedSubviews={false} style={styles.scrollContainer}>
            <View>
              <Text style={styles.trackName}>◉ {this.props.track.name}</Text>
            </View>

            <ListView
              removeClippedSubviews={false}
              style={{}}
              dataSource={cardsSource}
              renderRow={card => {
                return <TaskCard onPress={() => this.onCardPress(card)} card={card} />;
              }}
              enableEmptySections={true}
            />

            {!this.props.cards.length && <TrackEmpty />}
            <TaskCardCreater onPress={this.goToCreate} onSubmit={this.addTask} />
            <View style={{ height: 20 }} />
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

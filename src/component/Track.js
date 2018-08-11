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
import { makeActionRequestCollection } from '../../src/action/actions';
import { bindActionCreators } from 'redux';
import { MonoText } from '../../components/StyledText';
import { SERVER_BASE } from '../../src/env/env';
import Swiper from 'react-native-swiper';

export class Track extends React.Component {
  componentWillMount() {}

  render() {
    const cardsSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }).cloneWithRows(this.props.cards);

    return (
      <ListView
        style={{}}
        dataSource={cardsSource}
        renderRow={card => {
          return (
            <TouchableOpacity onPress={() => this.navToTaskBoard(board)}>
              <View style={styles.cardContainer}>
                <Text>{card.content}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        enableEmptySections={true}
      />
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

    console.log(track);
    console.log('card', cards);

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
    backgroundColor: '#fff'
  },
  cardContainer: {
    backgroundColor: '#f8f8f8'
  }
});

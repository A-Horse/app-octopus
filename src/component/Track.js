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
import { TaskCard } from './TaskCard';
import { TaskCardCreater } from './TaskCardCreater';

export class Track extends React.Component {
  componentWillMount() {}

  render() {
    const cardsSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }).cloneWithRows(this.props.cards);

    return (
      <View sytle={styles.container}>
        <View style={styles.innerContainer}>
          <ScrollView style={styles.scrollContainer}>
            <ListView
              style={{}}
              dataSource={cardsSource}
              renderRow={card => {
                return <TaskCard card={card} />;
              }}
              enableEmptySections={true}
            />
            <TaskCardCreater />
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
    backgroundColor: '#fff'
  },
  innerContainer: {
    backgroundColor: '#e8e8e8',
    padding: 20,
    margin: 20,
    borderRadius: 5
  },
  scrollContainer: {},
  cardContainer: {
    backgroundColor: '#f8f8f8',
    marginBottom: 5
  }
});

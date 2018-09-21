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
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

export class TaskCardDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      /* title: navigation.getParam('card').title, */
      titke: null,
      headerBackTitle: null
    };
  };

  state = {
    hidden: false
  };

  componentWillMount() {}

  componentWillUnmount() {}

  updateCard(data) {
    this.props.actions.UPDATE_TASK_CARD_REQUEST({
      id: this.props.card.id,
      ...data
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FormInput
          containerStyle={{
            borderBottomWidth: 0,
            padding: 6,
            paddingLeft: 12,
            paddingRight: 12,
            marginTop: 12,
            backgroundColor: '#e8e8e8',
            borderRadius: 6
          }}
          inputStyle={{
            width: '100%'
          }}
          multiline={true}
          placeholder="What do you want to do"
          defaultValue={this.props.card.title}
          onChangeText={value => {
            this.setState({ title: value });
            this.updateCard({ title: value });
          }}
        />

        <FormLabel style={{ marginTop: 12 }}>Remarks</FormLabel>

        <FormInput
          containerStyle={{
            borderBottomWidth: 0
          }}
          placeholder="write remarks..."
          defaultValue={this.props.card.content}
          onChangeText={value => {
            this.setState({ title: value });
            this.updateCard({ title: value });
          }}
        />
      </View>
    );
  }
}

export const TaskCardDetailScreenContainer = connect(
  (state, props) => {
    const cardId = props.navigation.getParam('card').id;
    const card = state.task.taskCardMap[cardId] || {};
    return {
      card
    };
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
    backgroundColor: '#fff'
  }
});

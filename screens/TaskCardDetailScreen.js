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

  render() {
    return (
      <View style={styles.container}>
        <FormInput
          containerStyle={{ borderBottomColor: '#e8e8e8', paddingBottom: 6, marginTop: 12 }}
          placeholder="What do you want to do"
          defaultValue={this.props.card.title}
          onChangeText={value => {
            this.setState({ title: value });
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

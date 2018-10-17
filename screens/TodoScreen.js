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
  FlatList,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../src/action/actions';
import { bindActionCreators } from 'redux';

export class TodoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('board', 'TaskBoard').name
    };
  };

  state = {
    selectedIndex: 0
  };
  contentWidth: number;

  componentWillMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Text>hi</Text>
      </View>
    );
  }
}

export const TodoScreenContainer = connect(
  (state, props) => {
    return {};
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(TodoScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8'
  }
});

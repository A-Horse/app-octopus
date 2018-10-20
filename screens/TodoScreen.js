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

export class TodoScreen extends React.Component<{ todoBoxId: string }> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('todoBox').name
    };
  };

  state = {
    selectedIndex: 0
  };

  componentWillMount() {
    this.props.actions.GET_TODOBOX_REQUEST({ todoBoxId: this.props.todoBoxId });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>hi</Text>
        <Text>{this.props.todoBoxId}</Text>
      </View>
    );
  }
}

export const TodoScreenContainer = connect(
  (state, props) => {
    const todoBoxId = props.navigation.getParam('todoBox').id;

    return {
      todoBoxId
    };
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

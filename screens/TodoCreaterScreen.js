// @flow
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { makeActionRequestCollection } from '../src/action/actions';
import { bindActionCreators } from 'redux';
import { FormInput } from 'react-native-elements';

class TodoCreaterScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: null,
      headerBackTitle: ' ',
      headerRight: (
        <TouchableOpacity style={{ marginRight: 18 }} onPress={() => params.handldeDone()}>
          <Text style={{ color: '#ef3d2c', fontSize: 18, fontWeight: '700' }}>Done</Text>
        </TouchableOpacity>
      )
    };
  };

  state = {
    isModalVisible: false,
    isDateTimePickerVisible: false,
    content: '',
    deadline: null
  };

  componentWillMount() {
    this.props.navigation.setParams({
      handldeDone: this.handldeDone
    });
  }

  handldeDone = () => {
    this.props.actions.ADD_TODO_REQUEST({
      content: this.state.content
    });
  };

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <FormInput
          containerStyle={{ borderBottomColor: '#e8e8e8', paddingBottom: 6, marginTop: 12 }}
          placeholder="What do you want to do"
          onChangeText={value => {
            this.setState({ content: value });
          }}
        />
      </View>
    );
  }
}

export const TodoCreaterScreenContainer = connect(
  state => {
    return {
      user: state.auth.user,
      boards: R.values(state.task.taskBoardMap)
    };
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(TodoCreaterScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

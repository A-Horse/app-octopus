import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import propTypes from 'prop-types';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import Button from '../../component/Button';
import Modal from 'react-native-modal';
import { navigatorStyle } from '../../navigation-setup';

export default class BoxCreater extends Component {
  static propTypes = {
    navigator: propTypes.object
  };

  state = {
    newTodoBoxName: '',
    modalVisible: false
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.touchContainer}
          onPress={() => {
            this.props.navigator.push({
              screen: 'octopus.TodoBoxCreateScreen',
              passProps: {},
              backButtonTitle: '',
              title: 'Add TodoBox',
              navigatorStyle: navigatorStyle // for Android
            });
          }}
        >
          <Icon style={{ paddingLeft: 1 }} name="create-new-folder" size={30} />
          <Text style={styles.content}>Add Todo Box...</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e8e8e8'
  },
  touchContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    fontSize: 16,
    fontWeight: '500',
    color: '#777'
  }
});

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import Button from '../../component/Button';
import Modal from 'react-native-modal';
import { navigatorStyle } from '../../navigation-setup';

export default class BoxCreater extends Component {
  static propTypes = {
    navigatior: propTypes.object
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
          <Image style={styles.icon} source={require('../../image/icons/add.png')} />
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
  icon: {
    width: 18,
    height: 18,
    marginRight: 9
  },
  content: {
    fontSize: 16,
    fontWeight: '500',
    color: '#777'
  }
});

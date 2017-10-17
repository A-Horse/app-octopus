import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

export default class BoxCreater extends Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onAddPress}>
          <Image style={styles.icon} source={require('../../image/icons/add.png')} />
        </TouchableOpacity>

        <Text style={styles.content}>Add Todo Box...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    marginTop: 2,
    padding: 10,
    backgroundColor: '#fff',
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

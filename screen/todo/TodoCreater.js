import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import Todo from './Todo';
import R from 'ramda';

export default class TodoCreater extends Component {
  state = {}

  clear() {
    this.refs.content.clear();
  }

  @autobind
  onAddPress() {
    this.refs.content.focus();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onAddPress}>
          <Image source={require('../../image/ios/ic_add/ic_add.png')} />
        </TouchableOpacity>

        <TextInput
          style={styles.content}
          placeholderTextColor="#000"
          placeholder="Add Todo..."
          ref="content"
          onBlur={this.props.clearNavButton}
          onFocus={this.props.addCreateTodoButton}
          onChangeText={(content) => this.setState({content})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderStyle: 'solid',
    borderRadius: 3,
    borderColor: '#000',
    marginTop: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginTop: 3
  }
});

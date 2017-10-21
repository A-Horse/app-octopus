import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import R from 'ramda';

export default class TodoCreater extends Component {
  state = {};

  clear() {
    this.input.clear();
    this.input.blur();
  }

  @autobind
  onAddPress() {
    this.input.focus();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={this.onAddPress} style={styles.iconContainer}>
            <Image style={styles.icon} source={require('../../image/icons/add.png')} />
          </TouchableOpacity>

          <TextInput
            underlineColorAndroid="transparent"
            style={styles.content}
            placeholderTextColor="#999"
            placeholder="Add Todo..."
            returnKeyType="done"
            blurOnSubmit={true}
            ref={ref => (this.input = ref)}
            onSubmitEditing={this.props.createTodo}
            onBlur={this.props.clearNavButton}
            onFocus={this.props.addCreateTodoButton}
            onChangeText={content => this.setState({ content })}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderStyle: 'solid',
    borderColor: '#000',
    paddingLeft: 4,
    paddingRight: 8,
    paddingTop: 12,
    paddingBottom: 12,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8'
  },
  innerContainer: {
    flex: 1,
    paddingLeft: 9,
    paddingRight: 9,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  iconContainer: {
    marginRight: 9
  },
  icon: {
    width: 16,
    height: 16
  },
  content: {
    top: 1,
    flex: 1,
    fontSize: 17,
    color: '#000'
  }
});

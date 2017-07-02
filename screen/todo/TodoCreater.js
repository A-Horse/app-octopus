import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import R from 'ramda';

export default class TodoCreater extends Component {
  state = {};

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
        <View style={styles.innerContainer}>
          <TouchableOpacity
            onPress={this.onAddPress}
            style={styles.iconContainer}
          >
            <Image
              style={styles.icon}
              source={require('../../image/icons/add.png')}
            />
          </TouchableOpacity>

          <TextInput
            style={styles.content}
            placeholderTextColor="#999"
            placeholder="Add Todo..."
            returnKeyType="done"
            ref="content"
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
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: '#e8e8e8'
  },
  innerContainer: {
    flex: 1,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 9,
    paddingRight: 9,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  iconContainer: {
    marginRight: 5
  },
  icon: {
    width: 16,
    height: 16
  },
  content: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginTop: 3
  }
});

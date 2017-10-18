import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Button from 'react-native-button';

export default class OctopusButton extends Component {
  render() {
    return (
      <Button
        color="#fff"
        containerStyle={[styles.container, styles[this.props.color], this.props.style]}
        style={[styles.button, styles[this.props.color + 'Text']]}
        onPress={() => this.props.onPress()}
      >
        {this.props.children}
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    color: '#555'
  },
  container: {
    overflow: 'hidden',
    borderRadius: 4,
    padding: 9,
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e8e8e8'
  },
  green: {
    backgroundColor: '#9ad477'
  },
  greenText: {
    color: '#fff'
  },
  blueText: {
    color: '#fff'
  },
  blue: {
    backgroundColor: '#6bd9ed',
    borderColor: '#6bd9ed'
  },
  gay: {
    backgroundColor: '#ccc'
  },
  red: {
    backgroundColor: '#e35a55'
  },
  redText: {
    color: '#fff'
  },
  error: {
    backgroundColor: '#E53935'
  }
});

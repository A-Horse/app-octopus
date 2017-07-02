import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, Animated, Text } from 'react-native';

const HIDE_TOP = 100;

export default class Toast extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  };

  state = {
    toastOpacity: new Animated.Value(0),
    top: new Animated.Value(-HIDE_TOP)
  };

  toggle() {
    return Animated.sequence([
      Animated.timing(this.state.top, {
        toValue: 0,
        duration: 0
      }),
      Animated.timing(this.state.toastOpacity, {
        toValue: 0.95,
        duration: 100
      }),
      Animated.delay(1700),
      Animated.timing(this.state.toastOpacity, {
        toValue: 0,
        duration: 100
      }),
      Animated.timing(this.state.top, {
        toValue: HIDE_TOP,
        duration: 0
      })
    ]).start();
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.toastContainer,
          {
            opacity: this.state.toastOpacity
          }
        ]}
      >
        <Image
          source={require('../image/icons/remove.png')}
          style={styles.toastErrIcon}
        />
        <Text style={styles.toastText}>
          {this.props.message}
        </Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  toastContainer: {
    width: '80%',
    position: 'absolute',
    backgroundColor: '#333',
    zIndex: 99,
    borderRadius: 6,
    overflow: 'hidden',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10
  },
  toastText: {
    borderRadius: 5,
    color: '#fff',
    marginLeft: 10,
    flex: 1,
    flexWrap: 'wrap'
  },
  toastErrIcon: {
    width: 18,
    height: 18,
    marginLeft: 15
  }
});

import React, { Component, Animated } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, Text } from 'react-native';

const HEIGHT = HEIGHT;

export default class Toast extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  };

  state = {
    toastOpacity: new Animated.Value(0),
    top: new Animated.Value(-HEIGHT)
  };

  openErrorToast() {
    Animated.sequence([
      Animated.timing(this.state.top, {
        toValue: 0,
        duration: 0
      }),
      Animated.timing(this.state.toastOpacity, {
        toValue: 0.95,
        duration: 100
      }),
      Animated.timing(this.state.toastOpacity, {
        toValue: 0,
        duration: 100
      }),
      Animated.timing(this.state.top, {
        toValue: HEIGHT,
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
          source={require('../image/icons/remove-red.png')}
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
    height: HEIGHT,
    position: 'absolute',
    backgroundColor: '#333',
    zIndex: 99,
    borderRadius: 6,
    overflow: 'hidden',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  toastText: {
    borderRadius: 5,
    color: '#fff',
    marginLeft: 10
  },
  toastErrIcon: {
    width: 18,
    height: 18,
    marginLeft: 15
  }
});

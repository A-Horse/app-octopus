import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Button from "react-native-button";

export default class OctopusButton extends Component {
  render() {
    return (
      <Button
        color="#fff"
        containerStyle={[styles.container, styles[this.props.color]]}
        style={[styles.button]}
        onPress={() => this.props.onPress()}
      >
        {this.props.children}
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    color: "#fff"
  },
  container: {
    overflow: "hidden",
    borderRadius: 4,
    padding: 9,
    width: "100%"
  },
  green: {
    backgroundColor: "#9ad477"
  },
  red: {
    backgroundColor: "#e35a55"
  },
  error: {
    backgroundColor: "#E53935"
  }
});

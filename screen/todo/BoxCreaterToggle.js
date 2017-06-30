import React, { Component } from "react";
import { connect } from "react-redux";
import autobind from "autobind-decorator";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import { bindActionCreators } from "redux";
import { createSelector } from "reselect";
import Todo from "./Todo";
import R from "ramda";

export default class BoxCreater extends Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onAddPress}>
          <Image source={require("../../image/ios/ic_add/ic_add.png")} />
        </TouchableOpacity>

        <Text>Add Todo Box...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    marginTop: 8,
    padding: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center"
  },
  content: {
    flex: 1,
    fontSize: 18,
    color: "#000",
    marginTop: 3
  }
});

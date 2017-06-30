import React, { Component } from "react";
import CheckBox from "react-native-check-box";
import { Image } from "react-native";
import autobind from "autobind-decorator";

export default class StarCheckBox extends Component {
  state = { checked: !!this.props.defaultChecked };

  @autobind
  onClick() {
    this.setState({ checked: !this.state.checked });
    this.props.onClick(!this.state.checked);
  }

  render() {
    return (
      <CheckBox
        style={this.props.style}
        onClick={this.onClick}
        isChecked={this.state.checked}
        checkedImage={
          <Image source={require("../image/ios/ic_star/ic_star.png")} />
        }
        unCheckedImage={
          <Image
            source={require("../image/ios/ic_star_border/ic_star_border.png")}
          />
        }
      />
    );
  }
}

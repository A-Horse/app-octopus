import React, { Component } from 'react';
import CheckBox from 'react-native-check-box';
import { Image } from 'react-native';

export default class MyCheckBox extends Component {

  render() {
    return (
      <CheckBox
        style={this.props.style}
        onClick={()=>this.props.onClick(this.props.checked)}
        isChecked={this.props.checked}
      />
    );
  }
}

import React, { Component } from 'react';
import CheckBox from 'react-native-check-box';
import { Image } from 'react-native';
import autobind from 'autobind-decorator';

export default class MyCheckBox extends Component {

  state = {checked: !!this.props.defaultChecked}

  @autobind
  onClick() {
    console.log('hi', this.state.checked);
    this.setState({checked: !this.state.checked});
    console.log('hi', this.state.checked);
    this.props.onClick(!!this.state.checked);
  }

  render() {
    return (
      <CheckBox
        style={this.props.style}
        onClick={this.onClick}
        isChecked={this.state.checked}
      />
    );
  }
}

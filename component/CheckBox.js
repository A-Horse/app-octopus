import React, { Component } from 'react';
import CheckBox from 'react-native-check-box';
import { Image } from 'react-native';
import autobind from 'autobind-decorator';

export default class MyCheckBox extends Component {

  state = {checked: !!this.props.defaultChecked}

  @autobind
  onClick() {
    this.setState({checked: !this.state.checked});
    this.props.onClick(!this.state.checked);
  }

  render() {
    return (
      <CheckBox
        style={this.props.style}
        onClick={this.onClick}
        isChecked={this.state.checked}
      checkedImage={<Image style={{width: 23, height: 23}} source={require('../image/ios/right/right.png')}/>}
        unCheckedImage={<Image style={{width: 23, height: 23}} source={require('../image/ios/box/box.png')}/>}
      />
    );
  }
}

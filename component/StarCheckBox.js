import React, { Component } from 'react';
import CheckBox from 'react-native-check-box';
import { Image } from 'react-native';

export default class StarCheckBox extends Component {

  render() {
    return (
      <CheckBox
        onClick={()=>this.prosp.onClick(this.props.checked)}
        isChecked={this.props.checked}
        checkedImage={<Image source={require('../image/ios/ic_star_border/ic_star_border.png')} />}
        unCheckedImage={<Image source={require('../image/ios/ic_star/ic_star.png')} />}
      />);
  }
}

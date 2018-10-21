import React from 'react';
import { Text } from 'react-native';
import ReactCheckBox from 'react-native-check-box';

export class CheckBox extends React.Component {
  render() {
    return (
      <ReactCheckBox
        style={{ flex: 1, padding: 10 }}
        onClick={() => {
          this.props.onChange(!this.props.isChecked);
        }}
        isChecked={this.props.isChecked}
      />
    );
  }
}

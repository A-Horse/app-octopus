// @flow
import React from 'react';
import ReactCheckBox from 'react-native-check-box';

export class CheckBox extends React.Component {
  render() {
    return (
      <ReactCheckBox
        checkBoxColor="#f36954"
        style={[{ flex: 1, padding: 10 }, this.props.style]}
        onClick={() => {
          this.props.onChange(!this.props.isChecked);
        }}
        isChecked={this.props.isChecked}
      />
    );
  }
}

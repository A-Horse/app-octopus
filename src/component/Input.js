// @flow
import React from 'react';
import { TextInput, View, Text, Platform } from 'react-native';

export class Input extends React.Component<{
  placeholder: string
}> {
  render() {
    return (
      <View style={{ borderWidth: 1, borderRadius: 3, borderColor: '#e8e8e8', padding: 10, height: 40 }}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', height: '100%', width: '100%' }}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          textContentType="text"
          spellCheck={false}
          placeholder={this.props.placeholder}
          onChangeText={value => this.props.onChange(value)}
        />
      </View>
    );
  }
}

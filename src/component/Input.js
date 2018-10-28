// @flow
import React from 'react';
import { TextInput, View, Text, Platform } from 'react-native';
import { Icon } from 'expo';
import R from 'ramda';

export class Input extends React.Component<{
  placeholder: string,
  style: any,
  textContentType: any,
  icon: string,
  iconColor: string
}> {
  render() {
    return (
      <View style={[{ borderWidth: 1, borderRadius: 6, borderColor: '#e8e8e8', height: 50 }, this.props.style]}>
        {this.props.icon && (
          <Icon.FontAwesome
            name={this.props.icon}
            size={23}
            style={{ marginBottom: -3, position: 'absolute', top: 12, left: 12 }}
            color={this.props.iconColor || '#999'}
          />
        )}

        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            height: '100%',
            width: '100%',
            padding: 10,
            paddingLeft: this.props.icon ? 43 : 10
          }}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          spellCheck={false}
          secureTextEntry={this.props.textContentType === 'password'}
          placeholder={this.props.placeholder}
          onChangeText={value => this.props.onChange(value)}
          textContentType={this.props.textContentType || 'text'}
        />
      </View>
    );
  }
}

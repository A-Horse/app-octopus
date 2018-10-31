// @flow
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'expo';

export class Button extends React.Component<{
  onPress: any,
  style: any,
  title: string,
  backgroundColor: string,
  icon: string,
  iconColor: string
}> {
  render() {
    return (
      <TouchableOpacity
        style={[
          {
            padding: 10,
            paddingRight: 30,
            paddingLeft: 20,
            width: 100,
            height: 40,
            borderColor: 'transparent',
            backgroundColor: '#ff886a',
            borderRadius: 20,
            paddingLeft: !!this.props.icon ? 25 : 10,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
          },
          this.props.style
        ]}
        onPress={this.props.onPress}
      >
        {this.props.icon && (
          <Icon.FontAwesome
            name={this.props.icon}
            size={18}
            style={{ marginRight: 10 }}
            color={this.props.iconColor || '#fff'}
          />
        )}
        <Text style={{ color: '#fff', fontWeight: '500' }}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

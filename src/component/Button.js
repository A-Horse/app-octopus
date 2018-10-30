// @flow
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
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
      <View>
        {this.props.icon && (
          <Icon.FontAwesome
            name={this.props.icon}
            size={18}
            style={{ marginBottom: -3, position: 'absolute', top: 14.5, left: 13 }}
            color={this.props.iconColor || '#999'}
          />
        )}
        <TouchableOpacity
          style={{
            padding: 10,
            paddingLeft: !!this.props.icon ? 25 : 10
          }}
          onPress={this.props.onPress}
        >
          {this.props.title}
        </TouchableOpacity>
      </View>
    );
  }
}

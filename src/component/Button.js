// @flow
import React from 'react';
import { View, Button as RNButton } from 'react-native';
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
        <RNButton onPress={this.props.onPress} title={this.props.title} color="#841584" />
      </View>
    );
  }
}

import React from 'react';
import { Text, Platform } from 'react-native';

export class AppText extends React.Component {
  render() {
    const fontFamily = Platform.OS === 'ios' ? 'PingFang TC' : '';
    return <Text {...this.props} style={[this.props.style, { fontFamily }]} />;
  }
}

import React from 'react';
import { Text } from 'react-native';

export class AppText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'PingFang TC' }]} />;
  }
}

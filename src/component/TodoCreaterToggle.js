// flow
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'expo';

export class TodoCreaterToggle extends React.Component<{
  onPress: Function
}> {
  componentWillMount() {}

  render() {
    return (
      <View>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this.props.onPress}>
          <Icon.FontAwesome name="plus" size={30} style={[{ marginTop: 10, marginRight: 3 }]} color="#999" />
        </TouchableOpacity>
      </View>
    );
  }
}

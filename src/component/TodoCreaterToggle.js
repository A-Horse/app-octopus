// flow
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Icon } from 'expo';

export class TodoCreaterToggle extends React.Component<{
  onPress: Function
}> {
  componentWillMount() {}

  render() {
    return (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            borderWidth: 1,
            borderColor: 'white',
            width: 100,
            height: 40,
            borderRadius: 6,
            backgroundColor: 'white',
            shadowColor: '#999',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.9,
            shadowRadius: 12
          }}
          onPress={this.props.onPress}
        >
          <Icon.FontAwesome name="plus" size={22} style={[{ marginTop: 10, marginRight: 3 }]} color="#999" />
          <Text>Add Todo</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

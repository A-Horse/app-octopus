import React from 'react';
import { Text, View, Platform } from 'react-native';
import { Icon } from 'expo';

export class TrackEmpty extends React.Component {
  render() {
    return (
      <View>
        <View
          style={{
            width: 140,
            height: 80,
            borderWidth: 1,
            borderColor: '#fff',
            borderRadius: 3,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginBottom: 20,
            marginTop: 20
          }}
        >
          <Icon.Ionicons
            name={'ios-filing-outline'}
            size={26}
            style={{ marginBottom: -3 }}
            color={'#fff'}
          />
          <Text style={{ color: '#fff' }}>No Task Now</Text>
        </View>
      </View>
    );
  }
}

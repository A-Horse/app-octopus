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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    padding: 5,
    paddingLeft: 10
  },
  text: {
    color: '#fff',
    paddingLeft: 2,
    fontWeight: '500',
    marginTop: 10
  },
  modalContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    margin: 0,
    paddingTop: 20,
    padding: 18
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50
  },
  closeIcon: {},
  listItemTouchable: {
    width: '100%',
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

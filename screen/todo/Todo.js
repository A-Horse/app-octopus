import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import CheckBox from 'react-native-check-box'

export default class Todo extends Component {
  static propTypes = {
    todo: React.PropTypes.object.isRequired
  };

  render() {
    const {todo} = this.props;

    return (
      <View style={styles.container}>
        <CheckBox style={styles.checkbox} onClick={() => {}}/>
        <Text numberOfLines={1} style={styles.content}>
          {todo.content}
        </Text>
        <Image style={styles.boderStar} source={require('../../image/ios/ic_star_border/ic_star_border.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderStyle: 'solid',
    borderRadius: 3,
    borderColor: '#000',
    marginTop: 10,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    maxHeight: 46,
    alignItems: 'center'
  },
  checkbox: {
    marginTop: 4
  },
  borderStar: {
    flex: 1
  },
  content: {
    flex: 1,
    textAlign: 'left',
    fontSize: 18
  }
});

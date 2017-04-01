import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import R from 'ramda';

class TodoLists extends Component {
  lists = [{name: 'Default', id: 1}];

  @autobind
  renderLists() {
    return this.lists.map(this.renderListItem);
  }

  renderListItem(item) {
    return (
      <View key={item.id}>
        <Text>
          {item.name}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderLists()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

export default TodoLists;

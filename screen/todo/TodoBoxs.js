import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import R from 'ramda';

@connect()
class TodoBoxs extends Component {
  lists = [{name: 'My Todo', id: 0, type: 'default'}];

  goTodoList(item) {
    return () => {
      this.props.navigator.push({
        screen: 'octopus.TodosScreen',
        passProps: {meta: item},
        animated: false
      });
    };
  }

  @autobind
  renderLists() {
    return this.lists.map(this.renderListItem);
  }

  @autobind
  renderListItem(item) {
    return (
      <View key={item.id}>
        <Text onPress={this.goTodoList(item)}>
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

export default TodoBoxs;

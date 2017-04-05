import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import R from 'ramda';
import { NavigationActions } from 'react-navigation'

class TodoBoxs extends Component {
  lists = [{name: 'My Todo', id: 0, type: 'default'}];

  goTodoList(item) {
    return () => {

      this.props.dispatch(NavigationActions.navigate({routeName: 'TodoList', params: item}));
        // this.props.navigation.navigate('TodoList', {x: 1, y: 2}, {});
      // this.props.navigation.dispatch(navigateAction);
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

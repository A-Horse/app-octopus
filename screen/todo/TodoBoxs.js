import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autobind from 'autobind-decorator';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import R from 'ramda';
import * as todosActions from './Todos.action';

const getTodoBox = (state, props) => {
  const { entities } = state.todoBox;
  return R.values(entities);
};

const mapStateToProps = (state, props) => {
  return {
    userId: state.auth.user.id,
    todoBoxs: createSelector([getTodoBox], R.identity);
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(todosActions, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class TodoBoxs extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  // lists = [{name: 'My Todo', id: null}]

  componentDidMount() {
    // this.goTodoList(this.lists[0])();
    const userId = this.props.userId;
    this.props.actions.getTodoBoxs({userId});
  }

  goTodoList(item) {
    return () => {
      this.props.navigator.push({
        screen: 'octopus.TodosScreen',
        passProps: {meta: item},
        animated: false,
        backButtonTitle: '',
        title: item.name
      });
    };
  }

  @autobind
  renderBox(box) {
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
        <ScrollView>
          <ListView
            dataSource={this.props.todoBoxs}
            renderRow={this.renderBox}
          />
        </ScrollView>
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

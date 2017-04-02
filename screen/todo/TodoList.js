import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native';
import { requestTodoList } from '../../action/todo';
// import

const getListType = (state, props) => {
  // const
};

@connect()
class TodoList extends Component {
  componentWillMount() {
    this.getTodoList();
  }

  @autobind
  getTodoList() {
    const { dispatch } = this.props;
    const userId = Memory.get(AUTH_DATA).user.id;
    return dispatch(requestTodoList(userId, this.props.navigation.state.params));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
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
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

export default TodoList;

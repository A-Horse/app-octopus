import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native';
import { requestTodoList } from '../../action/todo';
import Memory from '../../service/memory';
import { AUTH_DATA } from '../../constant';
// import

@connect()
class Todos extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  componentDidMount() {
    this.getTodoList();
  }

  @autobind
  getTodoList() {
    const { dispatch } = this.props;
    const userId = 1;
    // return dispatch(requestTodoList(userId, {}));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>hi222</Text>
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

export default Todos;

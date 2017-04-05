import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native';
import { requestTodoList } from '../../action/todo';
import Memory from '../../service/memory';
import { AUTH_DATA } from '../../constant';
// import
const mapStateToProps = state => ({
  navigation: state.navigation
});
@connect(mapStateToProps)
class Todos extends Component {
  componentDidMount() {
    this.getTodoList();
  }

  @autobind
  getTodoList() {
    console.log(
      this.props.navigation
    );
    const { dispatch } = this.props;
    const userId = Memory.get(AUTH_DATA).user.id;
    return dispatch(requestTodoList(userId, this.props.navigation.state.params));
  }

  render() {
    return (
      <View style={styles.container}>

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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect'
import * as todosActions from './Todos.action';

const getUserId = state => state.auth.user.id;

const mapStateToProps = (state, props) => {
  return {
    userId: getUserId(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(todosActions, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Todos extends Component {
  componentDidMount() {
    this.getTodos();
  }

  @autobind
  getTodos() {
    const { dispatch } = this.props;
    const userId = this.props.userId;
    this.props.actions.getTodos(null, {userId});
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

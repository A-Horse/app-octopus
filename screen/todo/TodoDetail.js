import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import R from 'ramda';
import Todo from './Todo';
import TodoCreater from './TodoCreater';
import * as todosActions from './Todos.action';

const mapStateToProps = (state, props) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class TodoDetail extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: '#1d92c3',
    navBarNoBorder: true,
    navBarButtonColor: '#fff',
    navBarTextColor: '#fff',
    tabBarHidden: true
  }

  static navigatorButtons = {
    rightButtons: [
      {
        icon: require('../../image/ios/ic_add/ic_add.png'),
        id: 'action'
      },
      {
        icon: require('../../image/ios/ic_add/ic_add.png'),
        id: 'action2'
      }
    ]
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'action') {

      }
    }
  }

  openActionSheet() {

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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#6eb8d4',
    paddingLeft: 10,
    paddingRight: 10,
    overflow: 'scroll'
  }
});

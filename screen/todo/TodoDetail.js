import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, Text, View, ActionSheetIOS } from 'react-native';
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
    actions: bindActionCreators(todosActions, dispatch)
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
        icon: require('../../image/ios/ic_more_horiz/ic_more_horiz.png'),
        id: 'action'
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
        this.openActionSheet();
      }
    }
  }

  destoryTodo() {
    console.log('destoRY');
    this.props.actions.destoryTodo(this.props.todo.id);
  }

  openActionSheet() {
    const buttonTexts = ['Done', 'Delete', 'Cancel'];
    ActionSheetIOS.showActionSheetWithOptions({
      options: buttonTexts,
      cancelButtonIndex: R.findIndex(R.equals('Cancel'))(buttonTexts),
      destructiveButtonIndex: R.findIndex(R.equals('Delete'))(buttonTexts)
    }, (buttonIndex) => {
      switch (buttonTexts[buttonIndex]) {
      case 'Delete':
        this.destoryTodo();
        break;
      default:
        return;
      }
    });
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, Text, TextInput, View, ActionSheetIOS } from 'react-native';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import R from 'ramda';
import Todo from './Todo';
import TodoCreater from './TodoCreater';
import * as todosActions from './Todos.action';
import StarCheckBox from '../../component/StarCheckBox';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

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

  @autobind
  onTodoContentChange(todoContent) {
    this.setState({todoContent});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <StarCheckBox
            style={styles.star}
            onClick={() => {}} />
          <AutoGrowingTextInput
            style={styles.content}
            onChangeText={this.onTodoContentChange}
            defaultValue={this.props.todo.content}
          />
        </View>
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
  },
  contentContainer: {

    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
  star: {
    flex: 1,
    // flexBasis: 1
    flexGrow: 1,
    alignItems: 'flex-start'
  },
  content: {
    flex: 1,
    textAlign: 'left',
    // flexBasis: 2
    flexGrow: 10,
    alignItems: 'flex-start'
  }
});

import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, Image, Text, TextInput, DatePickerIOS, View, ActionSheetIOS } from 'react-native';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-native-datepicker'
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

  state = {
  };


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
        <View style={styles.detailContainer}>
          <View style={styles.deallineContainer}>
            <Image style={styles.lineIcon} source={require('../../image/ios/ic_date_range/ic_date_range.png')}/>
            <View style={styles.lineContent}>
              <DatePicker
                date={this.state.dealline}
                mode="datetime"
                placeholder="Dealline"
                minDate="2016-05-01"
                maxDate="2020-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                multiline={true}
                customStyles={{
                  dateInput: {
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    borderWidth: 0
                  }
                }}
                onDateChange={(date) => {this.setState({date: date})}}
              />
            </View>
          </View>

          <View style={styles.deallineContainer}>
            <Image style={styles.lineIcon} source={require('../../image/ios/ic_notifications/ic_notifications.png')}/>
            <View style={styles.lineContent}>
              <DatePicker
                date={this.state.notice}
                mode="datetime"
                placeholder="Notice"
                minDate="2016-05-01"
                maxDate="2020-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                multiline={true}
                customStyles={{
                  dateInput: {
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    borderWidth: 0
                  }
                }}
                onDateChange={(date) => {this.setState({date: date})}}
              />
            </View>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    overflow: 'scroll'
  },
  contentContainer: {
    backgroundColor: '#2793c1',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 10
  },
  star: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'flex-start',
    width: 30
  },
  lineIcon: {
    marginRight: 10
  },
  lineContent: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection:'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8'
  },
  content: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: 'left',
    flexGrow: 11,
    alignItems: 'flex-start',
    color: '#fff',
    top: 2,
    flexDirection: 'column'
  },
  deallineContainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection:'row'
  },
  detailContainer: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 30
  }
});

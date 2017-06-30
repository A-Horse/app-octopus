import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import {
  StyleSheet,
  SwipeableRow,
  SwipeableListView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Text,
  TextInput,
  DatePickerIOS,
  View,
  ActionSheetIOS,
  Button,
  Picker
} from 'react-native';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-native-datepicker';
import { createSelector } from 'reselect';
import R from 'ramda';
import * as todosActions from './Todos.action';
import StarCheckBox from '../../component/StarCheckBox';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import moment from 'moment';
import { NavBarBgColor, ScreenBgColor } from '../../constant';

const mapStateToProps = (state, props) => {
  return {
    todo: state.todo.entities[props.todoId],
    userId: state.auth.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(todosActions, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class TodoDetail extends Component {
  static navigatorStyle = {
    navBarNoBorder: true,
    navBarButtonColor: '#fff',
    navBarTextColor: '#fff',
    tabBarHidden: true
  };

  static navigatorButtons = {
    rightButtons: [
      {
        icon: require('../../image/ios/ic_more_horiz/ic_more_horiz.png'),
        id: 'action'
      }
    ]
  };

  state = {};

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

  @autobind
  showRepeatPicker() {
    this.setState({ repeatTogglePicker: true });
  }

  transformRepeatValue(value) {
    return {
      null: 'Repeat',
      0: 'repeat day number',
      1: 'Every Day',
      2: 'Two day',
      7: 'Week'
    }[value];
  }

  goRemarkEditing() {
    this.props.navigator.push({
      screen: 'octopus.TodoRemarkScreen',
      title: 'Remarks',
      passProps: {
        content: this.props.todo.remark,
        updateTodo: this.props.updateTodo
      },
      backButtonTitle: ''
    });
  }

  destoryTodo() {
    this.props.actions.destoryTodo(this.props.todo.id);
  }

  openActionSheet() {
    const buttonTexts = ['Done', 'Delete', 'Cancel'];
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: buttonTexts,
        cancelButtonIndex: R.findIndex(R.equals('Cancel'))(buttonTexts),
        destructiveButtonIndex: R.findIndex(R.equals('Delete'))(buttonTexts)
      },
      buttonIndex => {
        switch (buttonTexts[buttonIndex]) {
          case 'Delete':
            this.destoryTodo();
            break;
          case 'Done':
            this.props.updateTodo({ isDone: true });
            break;
          default:
            return;
        }
      }
    );
  }

  render() {
    const { todo } = this.props || {};

    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <StarCheckBox
            style={styles.star}
            defaultChecked={todo.isStar}
            onClick={checked => {
              this.props.updateTodo({ isStar: checked });
            }}
          />

          <AutoGrowingTextInput
            style={styles.content}
            onChangeText={todoContent =>
              this.props.updateTodo({ content: todoContent })}
            value={todo.content}
            defaultValue={todo.content}
          />
        </View>

        {this.state.repeatTogglePicker &&
          <View style={styles.repeatPickerContainer}>
            <View style={styles.repeatPickerActions}>
              <TouchableHighlight
                style={styles.repeatPickerActionButton}
                onPress={() => this.setState({ repeatTogglePicker: false })}
              >
                <Text style={{ fontSize: 16 }}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.repeatPickerActionButton}
                onPress={() => {
                  this.setState({ repeatTogglePicker: false });
                  this.props.updateTodo({ repeat: this.state.repeat });
                }}
              >
                <Text style={{ fontSize: 16 }}>Confrim</Text>
              </TouchableHighlight>
            </View>
            <Picker
              selectedValue={this.state.repeat}
              onValueChange={value => {
                this.setState({ repeat: value });
              }}
              style={styles.repeatPicker}
            >
              <Picker.Item label="none" value={null} />
              <Picker.Item label="Every Day" value={1} />
              <Picker.Item label="Two Day" value={2} />
              <Picker.Item label="Every Week" value={7} />
            </Picker>
          </View>}

        <View style={styles.detailContainer}>
          <View style={[styles.fieldContainer]}>
            <Image
              style={styles.lineIcon}
              source={require('../../image/ios/ic_date_range/ic_date_range.png')}
            />
            <View style={styles.lineContent}>
              <DatePicker
                date={moment(todo.deadline).format('YYYY-MM-DD hh:mm:ss')}
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
                onDateChange={date => {
                  this.props.updateTodo({ deadline: moment(date).valueOf() });
                }}
              />
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <TouchableOpacity onPress={() => this.showRepeatPicker()}>
              <Image
                style={styles.lineIcon}
                source={require('../../image/ios/ic_notifications/ic_notifications.png')}
              />
            </TouchableOpacity>
            <View style={styles.lineContent}>
              <Text
                style={{
                  height: 40,
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 40
                }}
              >
                {this.transformRepeatValue(todo.repeat)}
              </Text>
            </View>
          </View>

          <View style={[styles.fieldContainer]}>
            <Image
              style={styles.lineIcon}
              source={require('../../image/ios/ic_notifications/ic_notifications.png')}
            />
            <View style={styles.lineContent}>
              <DatePicker
                date={todo.noticeTime}
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
                onDateChange={date =>
                  this.props.updateTodo({ noticeTime: date })}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.remarkContainer}
            onPress={() => this.goRemarkEditing()}
          >
            <Image
              style={styles.lineIcon}
              source={require('../../image/ios/ic_notifications/ic_notifications.png')}
            />
            <View style={styles.remark}>
              <Text
                style={{ flex: 1, color: !todo.remark ? '#c9c9c9' : '#000' }}
              >
                {!todo.remark ? 'Remarks' : todo.remark}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ScreenBgColor,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    overflow: 'scroll',
    height: '100%'
  },
  contentContainer: {
    backgroundColor: NavBarBgColor,
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
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8'
  },
  content: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'left',
    flexGrow: 11,
    alignItems: 'flex-start',
    color: '#fff',
    top: 2,
    flexDirection: 'column'
  },
  fieldContainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row'
  },
  repeatContainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row'
  },
  detailContainer: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 30
  },
  remarkContainer: {
    paddingTop: 8,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  remark: {
    paddingTop: 3,
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8'
  },
  repeatPicker: {},
  repeatPickerContainer: {
    position: 'absolute',
    borderTopColor: '#e8e8e8',
    borderStyle: 'solid',
    borderTopWidth: 1,
    flex: 1,
    bottom: 0,
    left: 0,
    width: '100%',
    height: 257,
    zIndex: 10,
    backgroundColor: '#fff'
  },
  repeatPickerActions: {
    height: 40,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderBottomColor: '#e8e8e8',
    borderStyle: 'solid',
    borderBottomWidth: 1
  },
  repeatPickerActionButton: {
    width: 98,
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

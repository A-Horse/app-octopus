import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, SwipeableRow, SwipeableListView, TouchableOpacity,
         Image, Text, TextInput, DatePickerIOS, View, ActionSheetIOS,
         Picker, PickerIOS } from 'react-native';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-native-datepicker'
import { createSelector } from 'reselect';
import R from 'ramda';
import * as todosActions from './Todos.action';
import StarCheckBox from '../../component/StarCheckBox';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { NavBarBgColor, ScreenBgColor } from '../../constant';
import SelectInputIOS from 'react-native-select-input-ios';


const mapStateToProps = (state, props) => {
  return {
    todo: state.todo.entities[props.todoId],
    userId: state.auth.user.id,
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

  goRemarkEditing() {
    this.props.navigator.push({
      screen: 'octopus.TodoRemarkScreen',
      title: 'Remarks',
      passProps: {content: this.props.todo.remark},
      backButtonTitle: ''
    });
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

  render() {
    const { todo } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <StarCheckBox
            style={styles.star}
            defaultChecked={todo.isStar}
            onClick={(checked) => {this.props.updateTodo({isStar: checked})}} />

          <AutoGrowingTextInput
            style={styles.content}
            onChangeText={todoContent => this.props.updateTodo({content: todoContent})}
            defaultValue={todo.content}
          />
        </View>
        <View style={styles.detailContainer}>

          <View style={[styles.fieldContainer]}>
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
                onDateChange={(date) => {this.props.updateTodo({dealline: date})}}
              />
            </View>
          </View>

          <SelectInputIOS
            value={todo.repeat}
            options={[
              {value: 1, label: 'Every Day'},
              {value: 2, label: 'Two Day'},
              {value: 7, label: 'Week'},
            ]}
            onCancelEditing={() => console.log('onCancel')}



          />
          <View style={styles.fieldContainer}>

          </View>

          <View style={[styles.fieldContainer]}>
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
                onDateChange={date => {this.setState({date: date})}}
              />
            </View>
          </View>


          <TouchableOpacity style={styles.remarkContainer} onPress={() => this.goRemarkEditing()}>
            <Image style={styles.lineIcon} source={require('../../image/ios/ic_notifications/ic_notifications.png')}/>
            <View style={styles.remark}>
              <Text
                style={{flex: 1, color: !this.state.remark ? '#c9c9c9' : '#000'}}>
                {!this.state.remark ? 'Remarks': this.state.remark}
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
    overflow: 'scroll'
  },
  contentContainer: {
    backgroundColor: ScreenBgColor,
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
  fieldContainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection:'row'
  },
  deallineContainer: {

  },
  repeatContainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection:'row'
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
    flexDirection:'row'
  },
  remark: {
    paddingTop: 3,
    flex: 1,
    height: 100,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8'
  }
});

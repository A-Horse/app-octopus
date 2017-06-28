import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, SwipeableRow, SwipeableListView, TouchableOpacity,
         Image, Text, TextInput, DatePickerIOS, View, ActionSheetIOS,
         Picker } from 'react-native';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-native-datepicker'
import { createSelector } from 'reselect';
import R from 'ramda';
import * as todosActions from './Todos.action';
import StarCheckBox from '../../component/StarCheckBox';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { NavBarBgColor, ScreenBgColor } from '../../constant';
import { makeGravatarUrl } from '../../service/gravatar';

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
export default class TDBoxCreater extends Component {
  static navigatorStyle = {
    navBarNoBorder: true,
    navBarButtonColor: '#fff',
    navBarTextColor: '#fff',
    tabBarHidden: true,
    title: 'Create Box',
  }

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Cancel',
        id: 'cancel'
      }
    ],
    rightButtons: [
      {
        title: 'Create',
        id: 'create'
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
      if (event.id === 'create') {
        this.props.actions.createTodoBox(this.getTodoBoxData());
      }
      if (event.id === 'cancel') {
        this.props.navigator.pop();
      }
    }
  }

  getTodoBoxData() {
    return {
      name: this.state.boxName,
      type: this.state.boxType,
      members: this.state.members
    };
  }

  render() {
    return (
      <View style={styles.container}>

        <View>
          <Image style={styles.boxIcon} source={require('../../image/ios/ic_list/ic_list.png')} />
          <TextInput
            style={styles.boxNameInput}
            ref="boxName"
            placeholder="Box Name"
            onChangeText={(boxName) => this.setState({boxName})}
          />
        </View>

        <View>
          <Text>Members</Text>
          <View>
            <Image source={{uri: makeGravatarUrl(this.props.user.email)}}
              style={styles.avatar}/>
            <Text>You</Text>
            <Text style={styles.ownerTag}>Owner</Text>
          </View>
          <View>
            <Image style={styles.boxIcon} source={require('../../image/ios/ic_add/ic_add.png')} />
          </View>
        </View>

        <View>
          <Text>Options</Text>
          <View>
            <Text>Notice</Text>
          </View>
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
    height: '100%',
  },
  boxIcon: {

  },
  boxNameInput: {

  },
  ownerTag: {
    backgroundColor: '#ea6e5e',
    color: '#fff',
    borderRadius: 3
  }
});

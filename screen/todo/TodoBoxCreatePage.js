import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, Image, Text, TextInput, View, Picker } from 'react-native';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-native-datepicker';
import R from 'ramda';
import { NavBarBgColor, ScreenBgColor } from '../../constant';
import { makeGravatarUrl } from '../../service/gravatar';
import { makeActionRequestCollection } from '../../action/actioner';
import { navigatorStyle } from '../../navigation-setup';

const mapStateToProps = (state, props) => {
  return {
    user: state.auth.user,
    isAddTodoBoxSuccess: state.todoBox.isAddTodoBoxSuccess,
    addedTodoBox: state.todoBox.addedTodoBox
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class TDBoxCreater extends Component {
  static navigatorStyle = {
    navBarNoBorder: true,
    navBarButtonColor: '#fff',
    navBarTextColor: '#fff',
    tabBarHidden: true,
    title: 'Create Box'
  };

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
  };

  static propTypes = {
    actions: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    addedTodoBox: PropTypes.object
  };

  state = { name: '' };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.props.actions.ADD_TODOBOX_FINISH(); // insure the flag clear
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.isAddTodoBoxSuccess !== this.props.isAddTodoBoxSuccess &&
      nextProps.isAddTodoBoxSuccess
    ) {
      this.props.actions.ADD_TODOBOX_FINISH();
      this.props.navigator.pop();
      /* this.props.navigator.push({
       *   screen: 'octopus.TodosScreen',
       *   passProps: { meta: nextProps.addedTodoBox },
       *   backButtonTitle: '',
       *   title: nextProps.addedTodoBox.name,
       *   navigatorStyle: navigatorStyle // for Android
       * });*/
    }
  }

  @autobind
  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id === 'create') {
        this.props.actions.ADD_TODOBOX_REQUEST({ name: this.state.name.trim() });
      }
      if (event.id === 'cancel') {
        this.props.navigator.pop();
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.fieldContainer,
            { borderBottomWidth: 1, borderStyle: 'solid', borderColor: '#e8e8e8', marginBottom: 10 }
          ]}
        >
          <Image style={styles.fieldIcon} source={require('../../image/ios/ic_list/ic_list.png')} />
          <TextInput
            style={[styles.fieldInput]}
            ref="boxName"
            placeholder="Box Name"
            underlineColorAndroid="transparent"
            onChangeText={name => this.setState({ name })}
          />
        </View>

        <View style={[styles.memberFieldContainer]}>
          <Text>Members:</Text>
          <View style={styles.memberContainer}>
            <Image source={{ uri: makeGravatarUrl(this.props.user.email) }} style={styles.avatar} />
            <Text style={{ width: '60%' }}>You</Text>
            <Text style={styles.memeberTag}>Owner</Text>
          </View>

          <View style={{ marginTop: 3 }}>
            <Image style={styles.boxIcon} source={require('../../image/ios/ic_add/ic_add.png')} />
            <Text>Add member</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ScreenBgColor,
    flex: 1
  },
  fieldContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15
  },
  memberFieldContainer: {
    paddingLeft: 15,
    paddingRight: 15
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    marginRight: 8
  },
  fieldIcon: {
    display: 'flex'
  },
  fieldInput: {
    width: '80%'
  },
  memberTag: {
    backgroundColor: '#ea6e5e',
    color: '#fff',
    borderRadius: 3
  },
  memberContainer: {
    flexDirection: 'row',
    height: 30,
    width: '100%',
    justifyContent: 'space-between'
  }
});

// @flow
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { Icon } from 'expo';
import { makeActionRequestCollection } from '../src/action/actions';
import format from 'date-fns/format';
import { bindActionCreators } from 'redux';
import { AppText } from '../src/component/AppText';
import { FormInput } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';

const CardTypes = [
  {
    label: 'Todo Task',
    value: 'TODO'
  },
  {
    label: 'Story Task',
    value: 'STORY'
  }
];

export class TaskCreaterScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: null,
      headerBackTitle: ' ',
      headerRight: (
        <TouchableOpacity style={{ marginRight: 18 }} onPress={() => params.onDone()}>
          <Text style={{ color: '#ef3d2c', fontSize: 18 }}>Done</Text>
        </TouchableOpacity>
      )
    };
  };

  state = {
    isModalVisible: false,
    isDateTimePickerVisible: false,
    title: null,
    deadline: null,
    type: 'STORY_TASK'
  };

  componentWillMount() {
    this.props.navigation.setParams({
      onDone: this.onDone
    });
  }

  componentDidMount() {}

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = date => {
    this.setState({ deadline: date.getTime() });
    this.hideDateTimePicker();
  };

  onDone = () => {
    this.props.actions.ADD_TASK_CARD_REQUEST({
      boardId: this.props.navigation.getParam('board').id,
      trackId: this.props.navigation.getParam('track').id,
      title: this.state.title,
      deadline: this.state.deadline,
      type: this.state.type
    });

    /* this.setState({
     *   isModalVisible: false,
     *   title: null,
     *   deadline: null
     * }); */

    this.props.navigation.pop();
  };

  showTaskTypePicker = () => {
    this.picker.togglePicker();
  };

  render() {
    return (
      <View style={styles.container}>
        <FormInput
          containerStyle={{ borderBottomColor: '#e8e8e8', paddingBottom: 6, marginTop: 12 }}
          placeholder="What do you want to do"
          onChangeText={value => {
            this.setState({ title: value });
          }}
        />

        <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.listItemTouchable} onPress={this.showDateTimePicker}>
            <Icon.FontAwesome name="clock-o" size={24} style={[{ flexShrink: 0, fontWeight: 900 }]} color="#e9676b" />

            <AppText
              style={{
                flex: 20,
                color: this.state.deadline ? '#333' : '#bbb',
                fontSize: 16,
                fontWeight: '400',
                marginLeft: 1,
                paddingLeft: 10
              }}
            >
              {this.state.deadline ? format(this.state.deadline, 'YYYY/MM/dd HH:mm') : 'Deadline'}
            </AppText>
            <Icon.Ionicons
              name="ios-arrow-forward"
              size={26}
              style={[{ flexShrink: 0, fontWeight: 900 }]}
              color="#999"
            />
          </TouchableOpacity>
          <DateTimePicker
            mode="datetime"
            date={this.state.deadline ? new Date(this.state.deadline) : new Date()}
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
        </View>

        <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.listItemTouchable} onPress={this.showTaskTypePicker}>
            <Icon.FontAwesome name="adjust" size={24} style={[{ flexShrink: 0, fontWeight: 900 }]} color="#158cb8" />

            <RNPickerSelect
              hideIcon={true}
              placeholder={{
                label: 'Select a type...',
                value: null
              }}
              ref={el => {
                this.picker = el;
              }}
              items={CardTypes}
              onValueChange={value => {
                this.setState({
                  type: value
                });
              }}
              style={{
                viewContainer: {
                  alignSelf: 'center',
                  flex: 20,
                  paddingLeft: 10
                },
                inputIOS: {
                  fontSize: 16,
                  fontWeight: '400',
                  color: '#333',
                  marginLeft: 1
                }
              }}
              value={this.state.type}
            />
            <Icon.Ionicons
              name="ios-arrow-forward"
              size={26}
              style={[{ flexShrink: 0, fontWeight: 900 }]}
              color="#999"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export const TaskCreaterScreenContainer = connect(
  state => {
    return {
      user: state.auth.user,
      boards: R.values(state.task.taskBoardMap)
    };
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(TaskCreaterScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  closeIcon: {},
  itemContainer: {
    marginTop: 20,
    marginLeft: 18,
    marginRight: 18,
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1
  },
  listItemTouchable: {
    width: '100%',
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

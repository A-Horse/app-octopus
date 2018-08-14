// flow
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ListView,
  View
} from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { Icon } from 'expo';
import { makeActionRequestCollection } from '../../src/action/actions';
import format from 'date-fns/format';
import { bindActionCreators } from 'redux';
import { MonoText } from '../../components/StyledText';
import { SERVER_BASE } from '../../src/env/env';
import Swiper from 'react-native-swiper';
import { AppText } from './AppText';
import Modal from 'react-native-modal';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';

const CardTypes = [
  {
    label: 'Todo Task',
    value: 'TODO_TASK'
  },
  {
    label: 'Story Task',
    value: 'STORY_TASK'
  }
];

export class TaskCardCreater extends React.PureComponent<{}> {
  state = {
    isModalVisible: false,
    isDateTimePickerVisible: false,
    title: null,
    deadline: null,
    type: 'STORY_TASK'
  };

  componentWillMount() {}

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = date => {
    this.setState({ deadline: date.getTime() });
    this.hideDateTimePicker();
  };

  onDone = () => {
    this.props.onSubmit({
      title: this.state.title,
      deadline: this.state.deadline,
      type: this.state.type
    });
    this.setState({
      isModalVisible: false,
      title: null,
      deadline: null
    });
  };

  showTaskTypePicker = () => {
    this.picker.togglePicker();
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.toggleModal}>
          <AppText style={styles.text}>Add Task...</AppText>
        </TouchableOpacity>

        <Modal style={{ margin: 0 }} isVisible={this.state.isModalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity style={styles.closeIcon} onPress={this.toggleModal}>
                <Icon.Ionicons
                  name="ios-close"
                  size={35}
                  style={[{ fontWeight: 900 }]}
                  color="#177efb"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onDone}>
                <AppText style={{ fontSize: 16, fontWeight: '500', color: '#177efb' }}>
                  Done
                </AppText>
              </TouchableOpacity>
            </View>

            <View>
              <FormInput
                containerStyle={{ margin: 0, padding: 0, marginLeft: 0, marginRight: 0 }}
                inputStyle={{ width: '100%' }}
                autoFocus
                autoCapitalize="none"
                textContentType="text"
                multiline={true}
                placeholder="What do you want to do"
                onChangeText={value => {
                  this.setState({ title: value });
                }}
              />

              <View style={{ marginTop: 20, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                <TouchableOpacity
                  style={styles.listItemTouchable}
                  onPress={this.showDateTimePicker}
                >
                  <Icon.Ionicons
                    name="ios-clock"
                    size={24}
                    style={[{ flexShrink: 0, fontWeight: 900 }]}
                    color="#158cb8"
                  />

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
                    {this.state.deadline
                      ? format(this.state.deadline, 'YYYY/MM/dd HH:mm')
                      : 'Deadline'}
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

              <View style={{ marginTop: 20, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                <TouchableOpacity
                  style={styles.listItemTouchable}
                  onPress={this.showTaskTypePicker}
                >
                  <Icon.Ionicons
                    name="ios-locate"
                    size={24}
                    style={[{ flexShrink: 0, fontWeight: 900 }]}
                    color="#158cb8"
                  />

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
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    padding: 5,
    paddingLeft: 10
  },
  text: {
    color: '#333',
    paddingLeft: 2
  },
  modalContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    margin: 0,
    paddingTop: 20,
    padding: 18
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50
  },
  closeIcon: {},
  listItemTouchable: {
    width: '100%',
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

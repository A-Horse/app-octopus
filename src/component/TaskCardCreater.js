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

export class TaskCardCreater extends React.PureComponent<{}> {
  state = {
    isModalVisible: false,
    isDateTimePickerVisible: false,
    deadline: null
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
                  color="blue"
                />
              </TouchableOpacity>
              <AppText style={{ fontSize: 20 }}>Add Task</AppText>
            </View>

            <View>
              <FormInput
                autoCapitalize="none"
                textContentType="email"
                placeholder="What do you want to do"
                onChangeText={value => {
                  this.setState({ email: value });
                }}
              />

              <View>
                <TouchableOpacity
                  style={{ marginLeft: 10, width: '100%' }}
                  onPress={this.showDateTimePicker}
                >
                  <AppText
                    style={{
                      color: this.state.deadline ? '#333' : '#bbb',
                      fontSize: 16,
                      letterSpacing: 1.3,
                      fontWeight: '400',
                      marginLeft: 1
                    }}
                  >
                    {this.state.deadline
                      ? format(this.state.deadline, 'YYYY/MM/dd HH:mm')
                      : '任务deadline'}
                  </AppText>
                </TouchableOpacity>
                <DateTimePicker
                  mode="datetime"
                  date={this.state.deadline ? new Date(this.state.deadline) : new Date()}
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this.handleDatePicked}
                  onCancel={this.hideDateTimePicker}
                />
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
    width: '100%',
    backgroundColor: '#fff',
    margin: 0,
    paddingTop: 20,
    padding: 20
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50
  },
  closeIcon: {
    position: 'absolute',
    left: 10
  }
});

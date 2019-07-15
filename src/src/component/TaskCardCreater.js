// flow
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText } from './AppText';
import { Icon } from 'expo';

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
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this.props.onPress}>
          <Icon.FontAwesome name="plus" size={18} style={[{ marginTop: 10, marginRight: 3 }]} color="#fff" />
          <AppText style={styles.text}>Add Task...</AppText>
        </TouchableOpacity>
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
    color: '#fff',
    paddingLeft: 2,
    fontWeight: '500',
    marginTop: 10
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

import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Text, Dimensions, TextInput, DatePickerIOS, View, ActionSheetIOS } from 'react-native';


import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';


export default class FullEditing extends Component {
  static navigatorStyle = {
    navBarButtonColor: '#2591fa',
    navBarTextColor: '#2591fa',
    tabBarHidden: true
  }

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Done',
        id: 'done'
      }
    ]
  }

  state = {}

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'action') {

      }
    }
  }

  @autobind
  onContentChange(content) {
    this.setState({content});
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView keyboardDismissMode='interactive'>
            <TextInput multiline={true}
              onChangeText={this.onContentChange}
              defaultValue={this.props.content}
              style={styles.content}
            />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fef3a1',
    flex: 1
  },
  content: {
    paddingTop: 5,
    paddingRight: 20,
    paddingLeft: 20,
    fontSize: 18,
    height: Dimensions.get('window').height - 60
  }
});

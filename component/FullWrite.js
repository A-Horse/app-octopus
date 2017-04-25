import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { StyleSheet, Image, Text, TextInput, DatePickerIOS, View, ActionSheetIOS } from 'react-native';

import * as todosActions from './Todos.action';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';


export default class FullWrite extends Component {
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

  onContentChange(content) {
    this.setState({content});
  }

  render() {
    return (
      <View style={styles.container}>
        <AutoGrowingTextInput
          style={styles.content}
          onChangeText={this.onContentChange}
          defaultValue={this.props.content}
          />
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

  }
});

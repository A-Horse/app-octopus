// flow
import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import { Icon, WebBrowser } from 'expo';
import { makeActionRequestCollection } from '../src/action/actions';
import { bindActionCreators } from 'redux';
import { MonoText } from '../components/StyledText';
import { AppRegistry, TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native';

class TodoBox extends React.Component<{
  todoBox: any,
  onPress: any
}> {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={{ flexDirection: 'row' }}>
        <Icon.FontAwesome
          name={this.props.todoBox.iconName}
          size={26}
          style={{ marginBottom: -3 }}
          color={this.props.todoBox.iconColor}
        />
        <Text style={{}}>{this.props.todoBox.name}</Text>
      </TouchableOpacity>
    );
  }
}

export class TodoBoxScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Todo'
    };
  };

  todoBoxs = [
    {
      key: '@user',
      name: 'Your Todo',
      iconColor: '#333',
      iconName: 'address-book'
    },
    {
      key: '@task',
      name: 'Task Todo',
      iconColor: '#333',
      iconName: 'tasks'
    }
  ];

  componentWillMount() {}

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.todoBoxs} renderItem={({ item }) => <TodoBox todoBox={item} />} />
      </View>
    );
  }
}

export const TodoBoxScreenContainer = connect(
  (state, props) => {
    return {};
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(TodoBoxScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8'
  }
});

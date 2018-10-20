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
      <TouchableOpacity
        onPress={() => this.props.onPress(this.props.todoBox)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 12,
          paddingRight: 12,
          paddingBottom: 12,
          paddingTop: 12,
          borderBottomWidth: 0.5,
          borderBottomColor: '#e8e8e8'
        }}
      >
        <View style={{ width: 40 }}>
          <Icon.FontAwesome
            name={this.props.todoBox.iconName}
            size={26}
            style={{ marginBottom: -3 }}
            color={this.props.todoBox.iconColor}
          />
        </View>
        <Text style={{ fontSize: 19 }}>{this.props.todoBox.name}</Text>
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
      id: '@user',
      key: '@user',
      name: 'Your Todo',
      iconColor: '#333',
      iconName: 'address-book'
    },
    {
      id: '@task',
      key: '@task',
      name: 'Task Todo',
      iconColor: '#333',
      iconName: 'tasks'
    }
  ];

  componentWillMount() {}

  onTodoBoxPress = todoBox => {
    console.log('todoBox', todoBox);
    this.props.navigation.navigate('Todo', {
      todoBox: todoBox
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.todoBoxs}
          renderItem={({ item }) => <TodoBox onPress={this.onTodoBoxPress} todoBox={item} />}
        />
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
    backgroundColor: '#f8f8f8'
  }
});

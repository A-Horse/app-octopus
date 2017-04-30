import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autobind from 'autobind-decorator';
import { createSelector } from 'reselect';
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, Button, ScrollView, ListView } from 'react-native';
import R from 'ramda';
import { getWeekDayName, getMonthDay, getMonth } from '../../service/date';
import * as todosActions from './Todos.action';

const getTodoBox = (state, props) => {
  const { entities } = state.todoBox;
  return R.values(entities.todoBox);
};

const mapStateToProps = (state, props) => {
  return {
    userId: state.auth.user.id,
    todoBoxs: createSelector([getTodoBox], R.identity)(state, props)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(todosActions, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class TodoBoxs extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: '#1d92c3',
    navBarButtonColor: '#fff',
  }

  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('../../image/ios/ic_pie_chart/ic_pie_chart.png'),
        id: 'pie'
      },
      {
        icon: require('../../image/ios/ic_settings/ic_settings.png'),
        id: 'setting'
      }
    ]
  }
  // lists = [{name: 'My Todo', id: null}]

  componentDidMount() {
    // this.goTodoList(this.lists[0])();
    const userId = this.props.userId;
    this.props.actions.getTodoBoxs({userId});
  }

  goTodoList(item) {
    return () => {
      this.props.navigator.push({
        screen: 'octopus.TodosScreen',
        passProps: {meta: item},
        animated: false,
        backButtonTitle: '',
        title: item.name
      });
    };
  }

  @autobind
  renderBox(box) {
    return (
      <View key={box.id}>
        <Text onPress={this.goTodoList(box)}>
          {box.name}
        </Text>
      </View>
    );
  }

  render() {
    var todoBoxDataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }).cloneWithRows(this.props.todoBoxs);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <ListView
            dataSource={todoBoxDataSource}
            renderRow={this.renderBox}
            enableEmptySections={true}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#F5FCFF',

  },
  header: {
    backgroundColor: '#1d92c3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerButtons: {
    flex: 1,
    flexDirection: 'row',
  },
  headerDate: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  scrollView: {
    flex: 1
  }
});

export default TodoBoxs;

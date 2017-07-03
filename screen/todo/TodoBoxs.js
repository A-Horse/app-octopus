import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autobind from 'autobind-decorator';
import { createSelector } from 'reselect';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  ListView
} from 'react-native';
import R from 'ramda';
import moment from 'moment';
import BoxCreaterToggle from './BoxCreaterToggle';
import * as todosActions from './Todos.action';
import { ScreenBgColor, ColorRed } from '../../constant';

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

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(todosActions, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class TodoBoxs extends Component {
  static navigatorStyle = {
    navBarButtonColor: '#fff'
  };

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
    ],
    rightButtons: [
      {
        title: moment().format('ddd')
      },
      {
        title: moment().format('D MMM')
      }
    ]
  };

  componentDidMount() {
    const userId = this.props.userId;
    this.props.actions.getTodoBoxs({ userId });

    // this.goTodoList(this.props.todoBoxs[0])();
  }

  goTodoList(item) {
    return () => {
      this.props.navigator.push({
        screen: 'octopus.TodosScreen',
        passProps: { meta: item },
        backButtonTitle: '',
        title: item.name
      });
    };
  }

  @autobind
  renderBox(box) {
    const icon = R.cond([
      [
        R.equals('only'),
        R.always(
          <Image
            style={styles.boxIcon}
            source={require('../../image/icons/portrait.png')}
          />
        )
      ]
    ])(box.type);
    return (
      <TouchableHighlight
        style={{ overflow: 'hidden', borderRadius: 5 }}
        underlayColor={ColorRed}
        activeOpacity={0.9}
        onPress={this.goTodoList(box)}
      >
        <View key={box.id} style={styles.box}>
          {icon}
          <Text style={styles.boxText}>
            {box.name}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  renderBoxCreater() {}

  render() {
    const todoBoxDataSource = new ListView.DataSource({
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
          <BoxCreaterToggle />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ScreenBgColor
  },
  scrollView: {
    flex: 1,
    padding: 10
  },
  box: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden'
  },
  boxIcon: {
    marginRight: 10
  },
  boxText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555'
  }
});

export default TodoBoxs;

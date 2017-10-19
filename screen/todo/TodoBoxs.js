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
  FlatList,
  ListView
} from 'react-native';
import R from 'ramda';
import { format } from 'date-fns';
import BoxCreater from './TodoBoxCreater';
import * as todosActions from './Todos.action';
import { ScreenBgColor, ColorRed } from '../../constant';
import { navigatorStyle } from '../../navigation-setup';

const getTodoBox = (state, props) => {
  const { entities } = state.todoBox;
  return R.values(entities).sort((a, b) => a.id); // let my todo top
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
        title: format(new Date(), 'ddd')
      },
      {
        title: format(new Date(), 'D MMM')
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
        title: item.name,
        navigatorStyle: navigatorStyle // for Android
      });
    };
  }

  @autobind
  renderBox({ item }) {
    const icon = R.cond([
      [
        R.equals('only'),
        R.always(
          <Image style={styles.boxIcon} source={require('../../image/icons/portrait.png')} />
        )
      ],
      [
        R.equals('normal'),
        R.always(
          <Image style={styles.boxIcon} source={require('../../image/ios/ic_list/ic_list.png')} />
        )
      ]
    ])(item.type);
    return (
      <TouchableHighlight
        style={{ overflow: 'hidden', borderRadius: 5 }}
        underlayColor={ColorRed}
        activeOpacity={0.9}
        onPress={this.goTodoList(item)}
      >
        <View style={styles.box}>
          {icon}
          <Text style={styles.boxText}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  @autobind
  itemSeparatorComponent() {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#f8f8f8'
        }}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <BoxCreater navigator={this.props.navigator} />
        <FlatList
          data={this.props.todoBoxs}
          renderItem={this.renderBox}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.itemSeparatorComponent}
        />
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

import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import R from 'ramda';
import Todo from './Todo';
import TodoCreater from './TodoCreater';
import { ScreenBgColor } from '../../constant';
import { makeActionRequestCollection } from '../../action/actioner';
import { navigatorStyle } from '../../navigation-setup';

const getAllTodos = (state, props) => {
  const { meta } = props;
  const { entities, results } = state.todo;
  const todoResults = results[meta.id] || [];
  return todoResults.map(id => entities[id]);
};

const getTodos = createSelector([getAllTodos], R.sort(R.prop('isDone')));

const mapStateToProps = (state, props) => {
  return {
    user: state.auth.user,
    userId: state.auth.user.id,
    todos: getTodos(state, props)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Todos extends Component {
  static navigatorStyle = navigatorStyle;

  static propTypes = {
    actions: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    // TODO: maybe better way
    if (event.type === 'ScreenChangedEvent' && event.id === 'willAppear') {
      this.clearNavButton();
    }
    if (event.type === 'NavBarButtonPress') {
      event.id === 'add' && this.createTodo();
    }
  }

  @autobind
  createTodo() {
    const userId = this.props.user.id;
    this.props.actions.ADD_TODO_REQUEST({
      todoBoxId: this.props.meta.id,
      content: this.refs.creater.state.content
    });
    this.refs.creater.clear();
  }

  componentDidMount() {
    const userId = this.props.user.id;
    const boxId = this.props.meta.id; // TODO rename meta.id => boxId
    this.props.actions.GET_TODOLIST_REQUEST({ boxId }, { userId });
  }

  @autobind
  addCreateTodoButton() {
    this.props.navigator.setButtons({
      rightButtons: [{ title: 'Add', id: 'add' }]
    });
  }

  @autobind
  clearNavButton() {
    this.props.navigator.setButtons({
      rightButtons: []
    });
  }

  render() {
    const userId = this.props.user.id;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <TodoCreater
            ref="creater"
            addCreateTodoButton={this.addCreateTodoButton}
            clearNavButton={this.clearNavButton}
            createTodo={this.createTodo}
          />
          <View>
            <FlatList
              data={this.props.todos}
              renderItem={({ item }) => (
                <Todo
                  boxId={this.props.meta.id}
                  user={this.props.user}
                  meta={this.props.meta}
                  key={item.id}
                  todo={item}
                  navigator={this.props.navigator}
                  updateTodo={data =>
                    this.props.actions.UPDATE_TODO_REQUEST({ ...data, id: item.id })}
                />
              )}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#f8f8f8'
                  }}
                />
              )}
            />
            <TouchableOpacity>
              <Icon name="playlist-add-check" size={30} color="#900" />
              <Text>Show Done Todos</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: ScreenBgColor,
    overflow: 'scroll'
  },
  scrollView: {
    flex: 1
  }
});

export default Todos;

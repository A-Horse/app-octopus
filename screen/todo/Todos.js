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

const getTodos = (state, props) => {
  const { meta } = props;
  const { entities, results } = state.todo;
  const todoResults = results[meta.id] || [];
  return todoResults.map(id => entities[id]);
};

const mapStateToProps = (state, props) => {
  return {
    user: state.auth.user,
    userId: state.auth.user.id,
    unDoneTodos: createSelector(
      [getTodos],
      R.compose(
        R.sort(R.descend(R.prop('created_at'))),
        R.filter(R.compose(R.not, R.prop('isDone')))
      )
    )(state, props),
    doneTodos: createSelector(
      [getTodos],
      R.compose(R.sort(R.descend(R.prop('created_at'))), R.filter(R.prop('isDone')))
    )(state, props)
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

  state = {
    showAll: false
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
      content: this.refCreater.state.content
    });
    this.refCreater.clear();
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

  renderList(category) {
    return (
      <FlatList
        data={this.props[category]}
        renderItem={({ item }) => (
          <Todo
            boxId={this.props.meta.id}
            user={this.props.user}
            meta={this.props.meta}
            key={item.id}
            todo={item}
            navigator={this.props.navigator}
            updateTodo={data => this.props.actions.UPDATE_TODO_REQUEST({ ...data, id: item.id })}
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
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <TodoCreater
            ref={ref => (this.refCreater = ref)}
            addCreateTodoButton={this.addCreateTodoButton}
            clearNavButton={this.clearNavButton}
            createTodo={this.createTodo}
          />
          <View>
            {this.renderList('unDoneTodos')}

            <TouchableOpacity
              onPress={() => this.setState({ showAll: !this.state.showAll })}
              style={{
                paddingTop: 9,
                paddingLeft: 9,
                flex: 1,
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Icon
                style={{ marginRight: 3 }}
                name="playlist-add-check"
                size={30}
                color="#80be65"
              />
              <Text style={{ color: '#555' }}>Show Done Todos</Text>
            </TouchableOpacity>

            {this.state.showAll && this.renderList('doneTodos')}
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

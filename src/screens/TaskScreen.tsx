import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, Dimensions, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { makeActionRequestCollection } from '../action/actions';
import { bindActionCreators } from 'redux';
import { SERVER_BASE } from '../env/env';

export class TaskScreen extends Component<any, any> {
  static navigationOptions = ({}) => {
    return {
      title: 'Projects'
    };
  };

  componentWillMount() {
    this.props.actions.GET_TASK_BOARD_LIST_REQUEST({
      userId: this.props.user.id
    });
  }

  navToTaskBoard = board => {
    this.props.navigation.navigate('TaskBoard', {
      board: board
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <FlatList
            data={this.props.boards}
            removeClippedSubviews={false}
            keyExtractor={(item: any) => item.id}
            renderItem={({item}: any) => {
              console.log(item);
              return (
                <TouchableOpacity key={item.id} onPress={() => this.navToTaskBoard(item)}>
                  <View style={styles.boardContainer}>
                    {!!item.cover && (
                      <Image
                        style={styles.boardBgImg}
                        source={{
                          uri: `${SERVER_BASE}storage/${item.cover}`,
                          cache: 'force-cache'
                        }}
                      />
                    )}
                    <View style={styles.boardInnerContainer}>
                      <Text style={styles.boardName}>{item.name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

export const TaskScreenContainer = connect(
  state => {
    return {
      user: state.auth.user,
      boards: R.values(state.task.taskBoardMap)
    };
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(TaskScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30
  },
  boardContainer: {
    backgroundColor: '#ddd',
    width: '90%',
    height: ((Dimensions.get('window').width - 40) * 0.9) / (16 / 9),
    borderRadius: 5,
    position: 'relative',
    overflow: 'hidden',
    marginTop: 10,
    alignSelf: 'flex-end'
  },
  boardInnerContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    flex: 1,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, .05)'
  },
  boardName: {
    color: '#fff',
    fontSize: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    padding: 8
  },
  boardBgImg: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1,
    top: 0,
    left: 0
  }
});

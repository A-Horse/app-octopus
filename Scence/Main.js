import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { StyleSheet, View, Text, TextInput, Button, Navigator } from 'react-native';
import { authRequest } from '../action/auth';
import TodoScence from '../screen/Todo';

import style from '../style';


class Main extends Component {
  state = {};

  renderScene2(route, navigator) {

    return <TodoScence />;

  }


  render() {
    return (
      <View style={styles.container}>

        <Navigator
          initialRoute={{name: 'todo'}}
          renderScene={this.renderScene2}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  }
});

export default Main;

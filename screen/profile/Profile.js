import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autobind from 'autobind-decorator';
import { createSelector } from 'reselect';
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, Button, ScrollView, ListView } from 'react-native';
import R from 'ramda';
import moment from 'moment';
import { getWeekDayName, getMonthDay, getMonth } from '../../service/date';


const mapStateToProps = (state, props) => {
  return {
    userId: state.auth.user.id,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Profile extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: '#1d92c3',
    navBarButtonColor: '#fff'
  }

  static navigatorButtons = {

  }

  componentDidMount() {

  }


  render() {

    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#71b8d2'
  },

});

export default Profile;

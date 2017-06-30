import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autobind from 'autobind-decorator';
import { createSelector } from 'reselect';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  ListView
} from 'react-native';
import R from 'ramda';
import moment from 'moment';
import { getWeekDayName, getMonthDay, getMonth } from '../../service/date';
import { makeGravatarUrl } from '../../service/gravatar';
import { clearStorage } from '../../service/storage';
import Button from '../../component/Button';
import { setupSignApp } from '../../navigation-setup';
import { initialStore } from '../../store';

const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

@connect(mapStateToProps, mapDispatchToProps)
class Information extends Component {
  static navigatorButtons = {
    rightButtons: []
  };

  componentDidMount() {}

  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#71b8d2'
  }
});

export default Information;

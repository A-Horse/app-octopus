import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autobind from 'autobind-decorator';
import { createSelector } from 'reselect';
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, ScrollView, ListView } from 'react-native';
import R from 'ramda';
import moment from 'moment';
import { getWeekDayName, getMonthDay, getMonth } from '../../service/date';
import { makeGravatarUrl } from '../../service/gravatar';
import { clearStorage } from '../../service/storage';
import Button from '../../component/Button';
import { setupSignApp } from '../../navigation-setup';
import { initialStore } from '../../store';


const mapStateToProps = (state, props) => {
  return {
    user: state.auth.user
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
    navBarButtonColor: '#fff',
    navBarTextColor: '#fff',

  }

  static navigatorButtons = {
    rightButtons: [

    ]
  }

  componentDidMount() {

  }

  logout() {
    clearStorage();
    setupSignApp();
    initialStore();
    this.props.navigator.resetTo({
      screen: 'octopus.LoginScreen',
    });
  }


  render() {

    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Image source={{uri: makeGravatarUrl(this.props.user.email)}}
            style={styles.avatar}/>
          <View>
            <Text>{this.props.user.username}</Text>
            <Text>{this.props.user.email}</Text>
          </View>
          <Image source={require('../../image/ios/ic_keyboard_arrow_right/ic_keyboard_arrow_right.png')}/>
        </View>

        <View style={styles.actions}>
          <Button onPress={this.logout.bind(this)} color="green">Logout</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#71b8d2',

  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 3,
    padding: 8,
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8
  },
  actions: {
    padding: 20
  }
});

export default Profile;

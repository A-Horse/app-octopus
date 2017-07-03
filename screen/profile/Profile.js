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
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import R from 'ramda';
import moment from 'moment';
import { getWeekDayName, getMonthDay, getMonth } from '../../service/date';
import { makeGravatarUrl } from '../../service/gravatar';
import { clearStorage } from '../../service/storage';
import Button from '../../component/Button';
import { setupSignApp } from '../../navigation-setup';
import { initialStore } from '../../store';
import { ScreenBgColor, BorderColor } from '../../constant';

const mapStateToProps = (state, props) => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

@connect(mapStateToProps, mapDispatchToProps)
class Profile extends Component {
  static navigatorStyle = {
    navBarButtonColor: '#fff',
    navBarTextColor: '#fff'
  };

  static navigatorButtons = {
    rightButtons: []
  };

  componentDidMount() {}

  logout() {
    clearStorage();
    setupSignApp();
    initialStore();
    this.props.navigator.resetTo({
      screen: 'octopus.LoginScreen'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <View style={styles.infoContainer}>
            <Image
              source={{ uri: makeGravatarUrl(this.props.user.email) }}
              style={styles.avatar}
            />
            <View>
              <Text>
                {this.props.user.username}
              </Text>
            </View>
            <Image
              source={require('../../image/ios/ic_keyboard_arrow_right/ic_keyboard_arrow_right.png')}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.field}>
            <Image source={require('../../image/icons/key.png')} />
            <Text>Update Password</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.actions}>
          <Button onPress={this.logout.bind(this)} color="red" type="error">
            Logout
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ScreenBgColor
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 3,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8
  },
  actions: {
    padding: 20
  },
  field: {
    flex: 1,
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: BorderColor,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Profile;

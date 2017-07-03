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
  TouchableHighlight,
  Alert
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

  @autobind
  logout() {
    clearStorage();
    setupSignApp();
    initialStore();
    this.props.navigator.resetTo({
      screen: 'octopus.LoginScreen'
    });
  }

  @autobind
  onLogoutPress() {
    Alert.alert(
      'Confirm',
      'Are you sure logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: this.logout }
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <View style={styles.infoContainer}>
            <View style={styles.infoMainContainer}>
              <Image
                source={{ uri: makeGravatarUrl(this.props.user.email) }}
                style={styles.avatar}
              />
              <View style={styles.usernameContainer}>
                <Text>
                  {this.props.user.username}
                </Text>
              </View>
            </View>
            <Image
              source={require('../../image/ios/ic_keyboard_arrow_right/ic_keyboard_arrow_right.png')}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.fieldContainer}>
          <TouchableOpacity>
            <View style={styles.field}>
              <Image
                style={styles.fieldIcon}
                source={require('../../image/icons/key.png')}
              />
              <Text>Update Password</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.fieldContainer} />

        <View style={styles.actions}>
          <Button onPress={this.onLogoutPress} color="red" type="error">
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
  infoMainContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8
  },
  usernameContainer: {
    marginLeft: 10
  },
  actions: {
    padding: 20
  },
  fieldContainer: {
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: BorderColor
  },
  field: {
    height: 46,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  fieldIcon: {
    marginLeft: 21,
    marginRight: 12
  },
  fieldText: {}
});

export default Profile;

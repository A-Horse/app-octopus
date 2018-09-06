import React from 'react';
import md5 from 'blueimp-md5';
import R from 'ramda';
import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../src/action/actions';
import { bindActionCreators } from 'redux';
import { ScrollView, StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';

function makeGravatarHash(email) {
  return md5(email.trim().toLowerCase());
}

const gravatarUrlBase = 'https://www.gravatar.com/avatar/';

function makeGravatarUrl(email, size) {
  const urlQuery = size ? makeGravatarHash(email) + `?s=${size}` : makeGravatarHash(email);
  return gravatarUrlBase.concat(urlQuery);
}

export class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile'
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity>
          <View style={styles.infoContainer}>
            <View style={styles.infoMainContainer}>
              <Image
                source={{ uri: makeGravatarUrl(this.props.user.email) }}
                style={styles.avatar}
              />
              <View style={styles.usernameContainer}>
                <Text>{this.props.user.username}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export const ProfileScreenContainer = connect(
  state => {
    return {
      user: state.auth.user
    };
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
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
  infoMainContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  usernameContainer: {
    marginLeft: 10
  }
});

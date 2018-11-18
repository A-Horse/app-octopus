// @flow
import React from 'react';
import md5 from 'blueimp-md5';
import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../src/action/actions';
import { bindActionCreators } from 'redux';
import { ScrollView, StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Button } from '../src/component/Button';
import { Icon } from 'expo';

function makeGravatarHash(email) {
  return md5(email.trim().toLowerCase());
}

const gravatarUrlBase = 'https://www.gravatar.com/avatar/';

function makeGravatarUrl(email, size) {
  const urlQuery = size ? makeGravatarHash(email) + `?s=${size}` : makeGravatarHash(email);
  return gravatarUrlBase.concat(urlQuery);
}

export class ProfileScreen extends React.Component<{}> {
  static navigationOptions = {
    title: 'Profile'
  };

  logout = () => {
    this.props.navigation.navigate('Login');
    this.props.actions.LOGOUT_REQUEST();
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity>
          <View style={styles.infoContainer}>
            <View style={styles.infoMainContainer}>
              <Image
                source={{ uri: makeGravatarUrl(this.props.user.email), cache: 'force-cache' }}
                style={styles.avatar}
              />
              <View style={styles.usernameContainer}>
                <Text>{this.props.user.username}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <List containerStyle={{ marginBottom: 20, borderTopColor: '#eee' }}>
          <ListItem
            containerStyle={{ borderBottomColor: '#eee', paddingLeft: 5 }}
            leftIcon={<Icon.FontAwesome name={'user-secret'} size={22} style={{ marginRight: 8 }} color={'#999'} />}
            key="setting"
            title={'App setting'}
            onPress={() => {
              this.props.navigation.navigate('Settings');
            }}
          />
        </List>

        <View style={[styles.bottomArea]}>
          <Button icon="sign-out" style={{ width: '100%' }} title="Logout" onPress={this.logout} />
        </View>
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
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 2
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
  },
  bottomArea: {
    paddingLeft: 10,
    paddingRight: 10
  }
});

import { Navigation } from 'react-native-navigation';
import { NavBarBgColor } from './constant';
import AuthService from './service/auth';
import store from './store';

const navigatorStyle = {
  navBarBackgroundColor: NavBarBgColor,
  navBarNoBorder: true
};

export function setupSignApp() {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'octopus.LoginScreen', // unique ID registered with Navigation.registerScreen
      navigatorStyle: {
        navBarBackgroundColor: '#fff'
      }
    }
  });
}

export function setupMainApp() {
  AuthService.loadJWTFromState(store.getState());
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'TODO',
        screen: 'octopus.TodoBoxsScreen',
        icon: require('./image/icons/playlist_add_check.png'),
        selectedIcon: require('./image/icons/playlist_add_check.png'),
        navigatorStyle: navigatorStyle
      },
      {
        label: 'PROFILE',
        screen: 'octopus.ProfileScreen',
        title: 'Profile',
        icon: require('./image/ios/ic_account_circle/ic_account_circle.png'),
        selectedIcon: require('./image/ios/ic_account_circle/ic_account_circle.png'),
        navigatorStyle: navigatorStyle
      },
      {
        label: 'TASK',
        screen: 'octopus.TaskBoardsScreen',
        icon: require('./image/icons/ic_assignment.png'),
        selectedIcon: require('./image/icons/ic_assignment.png'),
        navigatorStyle: navigatorStyle
      }
    ],
    tabsStyle: {
      tabBarTranslucent: true,
      forceTitlesDisplay: false,
      tabBarSelectedButtonColor: NavBarBgColor,
      tabBarBackgroundColor: '#fffcfe'
    }
  });
}

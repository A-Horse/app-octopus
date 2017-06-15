import { Navigation } from 'react-native-navigation';
import { NavBarBgColor } from './constant';
import AuthService from './service/auth';
import store from './store';

export function setupSignApp() {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'octopus.LoginScreen', // unique ID registered with Navigation.registerScreen
      title: 'Login', // title of the screen as appears in the nav bar (optional)
      navigatorStyle: {
          navBarBackgroundColor: NavBarBgColor
      }
    }
  });
};

export function setupMainApp() {
  AuthService.loadJWTFromState(store.getState());
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'TODO',
        screen: 'octopus.TodoBoxsScreen',
        icon: require('./ic_assignment.png'),
        selectedIcon: require('./ic_assignment.png'), // iOS only
        navigatorStyle: {
          navBarBackgroundColor: NavBarBgColor
        }
      },
      {
        label: 'PROFILE',
        screen: 'octopus.ProfileScreen',
        title: 'Profile',
        icon: require('./image/ios/ic_account_circle/ic_account_circle.png'),
        selectedIcon: require('./image/ios/ic_account_circle/ic_account_circle.png'), // iOS only
        navigatorStyle: {
          navBarBackgroundColor: NavBarBgColor
        }
      },
      {
        label: 'TASK',
        screen: 'octopus.TaskBoardsScreen', // this is a registered name for a screen
        icon: require('./ic_assignment.png'),
        selectedIcon: require('./ic_assignment.png'), // iOS only
        navigatorStyle: {
          navBarBackgroundColor: NavBarBgColor
        }
      }
    ],
    tabsStyle: {
      tabBarTranslucent: true,
      forceTitlesDisplay: false,
      tabBarSelectedButtonColor: NavBarBgColor
    }

  });
}

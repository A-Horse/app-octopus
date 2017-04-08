import { Navigation } from 'react-native-navigation';
import AuthService from './service/auth';
import store from './store';

export function setupSignApp() {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'octopus.LoginScreen', // unique ID registered with Navigation.registerScreen
      title: 'Welcome', // title of the screen as appears in the nav bar (optional)
      navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
      navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
    }
  });
};

export function setupMainApp() {
  AuthService.loadJWTFromState(store.getState());
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Task',
        screen: 'octopus.TaskBoardsScreen', // this is a registered name for a screen
        icon: require('./ic_assignment.png'),
        selectedIcon: require('./ic_assignment.png') // iOS only
      },
      {
        label: 'Todo',
        screen: 'octopus.TodoBoxsScreen',
        icon: require('./ic_assignment.png'),
        selectedIcon: require('./ic_assignment.png') // iOS only
      }
    ]
  });
}

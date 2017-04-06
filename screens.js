import { Navigation } from 'react-native-navigation';

// import FirstTabScreen from './FirstTabScreen';
// import SecondTabScreen from './SecondTabScreen';
// import PushedScreen from './PushedScreen';
import TodoScreen from './screen/Todo';
import TodoListScreen from './screen/todo/Todos';
import TaskScreen from './screen/Task';
import IndexScreen from './screen/Index';
import LoginScreen from './screen/Login';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('octopus.FirstTabScreen', () => TaskScreen, store, Provider);
  Navigation.registerComponent('octopus.SecondTabScreen', () => TodoScreen, store, Provider);
  Navigation.registerComponent('octopus.PushedScreen', () => TodoListScreen, store, Provider);
}

import { Navigation } from 'react-native-navigation';

import TodoBoxsScreen from './screen/todo/TodoBoxs';
import TodosScreen from './screen/todo/Todos';
import TodoEditScreen from './screen/todo/TodoEdit';
import TaskBoardsScreen from './screen/Task';
import LoginScreen from './screen/Login';


export function registerScreens(store, Provider) {
  Navigation.registerComponent('octopus.TaskBoardsScreen', () => TaskBoardsScreen, store, Provider);

  Navigation.registerComponent('octopus.TodoBoxsScreen', () => TodoBoxsScreen, store, Provider);
  Navigation.registerComponent('octopus.TodosScreen', () => TodosScreen, store, Provider);
  Navigation.registerComponent('octopus.TodoEditScreen', () => TodoEditScreen, store, Provider);

  Navigation.registerComponent('octopus.LoginScreen', () => LoginScreen, store, Provider);
}

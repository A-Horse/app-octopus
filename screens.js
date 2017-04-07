import { Navigation } from 'react-native-navigation';

import TodoBoxsScreen from './screen/todo/TodoBoxs';
import TodosScreen from './screen/todo/Todos';
import TaskBoardsScreen from './screen/Task';
import IndexScreen from './screen/Index';
import LoginScreen from './screen/Login';


export function registerScreens(store, Provider) {
  Navigation.registerComponent('octopus.TaskBoardsScreen', () => TaskBoardsScreen, store, Provider);
  Navigation.registerComponent('octopus.TodoBoxsScreen', () => TodoBoxsScreen, store, Provider);
  Navigation.registerComponent('octopus.TodosScreen', () => TodosScreen, store, Provider);
}

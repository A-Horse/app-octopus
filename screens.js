import { Navigation } from 'react-native-navigation';
import TodoBoxsScreen from './screen/todo/TodoBoxs';
import TodosScreen from './screen/todo/Todos';
import TodoBoxCreatePage from './screen/todo/TodoBoxCreatePage';
import TodoDetailScreen from './screen/todo/TodoDetail';
import TaskBoardsScreen from './screen/task/TaskBoards';
import FullEditingScreen from './component/FullEditing';
import ProfileScreen from './screen/profile/Profile';
import LoginScreen from './screen/Login';
import SignUpScreen from './screen/SignUp';

// TODO 函数化:
export function registerScreens(store, Provider) {
  Navigation.registerComponent('octopus.TaskBoardsScreen', () => TaskBoardsScreen, store, Provider);

  Navigation.registerComponent('octopus.TodoBoxsScreen', () => TodoBoxsScreen, store, Provider);
  Navigation.registerComponent(
    'octopus.TodoBoxCreateScreen',
    () => TodoBoxCreatePage,
    store,
    Provider
  );
  Navigation.registerComponent('octopus.TodosScreen', () => TodosScreen, store, Provider);
  Navigation.registerComponent('octopus.TodoDetailScreen', () => TodoDetailScreen, store, Provider);
  Navigation.registerComponent(
    'octopus.TodoRemarkScreen',
    () => FullEditingScreen,
    store,
    Provider
  );

  Navigation.registerComponent('octopus.ProfileScreen', () => ProfileScreen, store, Provider);

  Navigation.registerComponent('octopus.LoginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('octopus.SignUpScreen', () => SignUpScreen, store, Provider);
}

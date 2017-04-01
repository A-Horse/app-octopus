import TodoScreen from './screen/Todo';
import TodoListScreen from './screen/todo/TodoList';
import TaskScreen from './screen/Task';
import IndexScreen from './screen/Index';
import LoginScreen from './screen/Login';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';

export const TodoDrawerNavigator = DrawerNavigator({
  Home: {
    screen: TodoScreen
  },
  List: {
    screen: TodoListScreen
  }
});

export const AppTabNavigator = TabNavigator({
  Home: {
    screen: TaskScreen
  },
  Todo: {
    screen: TodoDrawerNavigator
  }
}, {
  tabBarOptions: {
    activeTintColor: '#e91e63'
  }
});

export const AppDrawerNavigator = DrawerNavigator({
  Home: {
    screen: IndexScreen,
    navigationOptions: {
      header: {
        visible: false
      }
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: {
        visible: false
      }
    }
  },
  Main: {
    screen: AppTabNavigator
  }

}, { headerMode: 'screen' });

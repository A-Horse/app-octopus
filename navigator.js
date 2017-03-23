import TodoScreen from './screen/Todo.js';
import TaskScreen from './screen/Task.js';
import { TabNavigator } from 'react-navigation';

const AppNavigator = TabNavigator({
  Home: {
    screen: TaskScreen
  },
  Todo: {
    screen: TodoScreen
  }
}, {
  tabBarOptions: {
    activeTintColor: '#e91e63'
  }
});

export default AppNavigator;

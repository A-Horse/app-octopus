// @flow
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import { TaskScreenContainer } from '../screens/TaskScreen';
import { TaskBoardScreenContainer } from '../screens/TaskBoardScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { TodoScreenContainer } from '../screens/TodoScreen';
import { ProfileScreenContainer } from '../screens/ProfileScreen';
import { TaskCardDetailScreenContainer } from '../screens/TaskCardDetailScreen';

const TaskStack = createStackNavigator({
  Home: TaskScreenContainer,
  TaskBoard: TaskBoardScreenContainer,
  TaskCard: TaskCardDetailScreenContainer
});

const TodoStack = createStackNavigator({
  Home: TodoScreenContainer
});

TaskStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarLabel: 'Task',
    tabBarVisible,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? `ios-paper${focused ? '' : '-outline'}` : 'md-filing'}
      />
    )
  };
};

const LinksStack = createStackNavigator({
  Links: LinksScreen
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: ProfileScreenContainer
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  )
};

export default createBottomTabNavigator({
  TaskStack,
  LinksStack,
  SettingsStack
});

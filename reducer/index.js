import authReducer from './auth';
import todoReducer from './todo';
import todoBoxReducer from './todo-box';
import taskReducer from './task';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
  todoBox: todoBoxReducer,
  task: taskReducer
});

export default appReducer;

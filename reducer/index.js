import authReducer from './auth';
import todoReducer from './todo';
import todoBoxReducer from './todo-box';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
  todoBox: todoBoxReducer
});

export default appReducer;

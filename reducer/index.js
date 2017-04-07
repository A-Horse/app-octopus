import authReducer from './auth';
import todoReducer from './todo';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer
});

export default appReducer;

import navReducer from './nav';
import authReducer from './auth';
import todoReducer from './todo';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
  nav: navReducer,
  auth: authReducer,
  todo: todoReducer
});

export default appReducer;

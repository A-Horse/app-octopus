import navReducer from './nav';
import authReducer from './auth';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
  nav: navReducer,
  auth: authReducer
});

export default appReducer;

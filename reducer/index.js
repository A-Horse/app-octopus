import navReducer from './nav';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
  nav: navReducer
});

export default appReducer;

import { combineEpics } from 'redux-observable';

import { auth } from './auth';
import { todos } from './todo';

export default combineEpics(
  auth,

  todos
);

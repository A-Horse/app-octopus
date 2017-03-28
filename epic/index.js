import { combineEpics } from 'redux-observable';

import { auth } from './auth';
import { userTodoList } from './todo';

export default combineEpics(
  auth,

  userTodoList
)

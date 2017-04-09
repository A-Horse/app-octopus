import { combineEpics } from 'redux-observable';

import { auth } from './auth';
import { todos, createTodo } from './todo';

export default combineEpics(
  auth,

  todos,
  createTodo
);

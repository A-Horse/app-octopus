import { combineEpics } from 'redux-observable';

import { auth } from './auth';
import { todos, createTodo, destoryTodo, getTodoBoxs } from './todo';

export default combineEpics(
  auth,

  todos,
  createTodo,
  destoryTodo,
  getTodoBoxs
);

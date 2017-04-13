import R from 'ramda';
import { requestTodos, requestCreateTodo, requestDestroyTodo } from '../../action/todo';

export function getTodos(id, meta) {
  return dispatch => dispatch(requestTodos(id, meta));
}

export function createTodo(id, meta) {
  return dispatch => data => dispatch(requestCreateTodo(id, meta, data));
}

export function destoryTodo(id) {
  return dispatch => dispatch(requestDestroyTodo(id));
}

import R from 'ramda';
import {
  requestTodos,
  requestCreateTodo,
  requestDestroyTodo,
  requestTodoBox,
  requestUpdateTodo
} from '../../action/todo';

export function getTodos(id, meta) {
  return dispatch => dispatch(requestTodos(id, meta));
}

export function createTodo(id, meta) {
  return dispatch => data => dispatch(requestCreateTodo(id, meta, data));
}

export function destoryTodo(id) {
  return dispatch => dispatch(requestDestroyTodo(id));
}

export function updateTodo(boxId, meta, data) {
  return dispatch => dispatch(requestUpdateTodo(boxId, meta, data));
}

export function getTodoBoxs(meta) {
  return dispatch => dispatch(requestTodoBox(meta));
}

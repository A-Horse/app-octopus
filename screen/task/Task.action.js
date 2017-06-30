import R from "ramda";
import {
  requestTodos,
  requestCreateTodo,
  requestDestroyTodo,
  requestTodoBox,
  createTodoBox,
  requestUpdateTodo
} from "../../action/task";

export function getTodos(id, meta) {
  return dispatch => dispatch(requestTodos(id, meta));
}

export function createTodo(meta, data) {
  return dispatch => dispatch(requestCreateTodo(meta, data));
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

export function createTodoBox(meta) {
  return dispatch => dispatch(requestTodoBox(meta));
}

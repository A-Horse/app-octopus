import { requestTodos } from '../../action/todo';

export function getTodos(id, meta) {
  return dispatch => dispatch(requestTodos(id, meta));
}

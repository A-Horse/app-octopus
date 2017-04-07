export const TODOS_REQUEST = 'TODOS_REQUEST';
export const TODOS_SUCCESS = 'TODOS_SUCCESS';

export function requestTodos(id, meta) {
  return {
    type: TODOS_REQUEST,
    playload: {id, meta}
  };
}

export function requestTodoListSuccess(todos, id) {
  return {
    type: TODOS_SUCCESS,
    playload: {todos, id}
  }
}

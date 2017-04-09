export const TODOS_REQUEST = 'TODOS_REQUEST';
export const TODOS_SUCCESS = 'TODOS_SUCCESS';

export function requestTodos(id, meta) {
  return {
    type: TODOS_REQUEST,
    playload: {id, meta}
  };
}

export function requestTodosSuccess(id, todos) {
  return {
    type: TODOS_SUCCESS,
    playload: {todos, id}
  };
}

export const CREATE_TODO_REQUEST = 'CREATE_TODO_REQUEST';
export const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS';

export function requestCreateTodo(id, meta, data) {
  return {
    type: CREATE_TODO_REQUEST,
    playload: {id, meta, data}
  };
}

export function requestCreateTodoSuccess(id, meta, data) {
  return {
    type: CREATE_TODO_SUCCESS,
    playload: {id, meta, data}
  };
}

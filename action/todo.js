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

export const DESTORY_TODO_REQUEST = 'DESTORY_TODO_REQUEST';
export const DESTORY_TODO_SUCCESS = 'DESTORY_TODO_SUCCESS';

export function requestDestroyTodo(id) {
  return {
    type: DESTORY_TODO_REQUEST,
    playload: {id}
  }
}

export function requestDestroyTodoSuccess(id) {
  return {
    type: DESTORY_TODO_SUCCESS,
    playload: {id}
  };
}

export const PATCH_TODO_REQUEST = 'DESTORY_TODO_REQUEST';
export const PATCH_TODO_SUCCESS = 'DESTORY_TODO_SUCCESS';

export function requesUpdateTodo(data) {
  return {
    type: PATCH_TODO_REQUEST,
    playload: {id}
  }
}

export function requesUpdateTodoSuccess(id) {
  return {
    type: PATCH_TODO_SUCCESS,
    playload: {id}
  };
}

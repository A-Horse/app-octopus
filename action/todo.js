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

export function requestCreateTodo(meta, data) {
  return {
    type: CREATE_TODO_REQUEST,
    playload: data,
    meta
  };
}

export function requestCreateTodoSuccess(meta, data) {
  return {
    type: CREATE_TODO_SUCCESS,
    playload: data,
    meta
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

export const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST';
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';

export function requestUpdateTodo(boxId, meta, data) {
  return {
    type: UPDATE_TODO_REQUEST,
    playload: data,
    meta
  };
}

export function requestUpdateTodoSuccess(boxId, meta, data) {
  return {
    type: UPDATE_TODO_SUCCESS,
    playload: data,
    meta
  };
}

export const GET_TODOBOX_REQUEST = 'GET_TODOBOX_REQUEST';
export const GET_TODOBOX_SUCCESS = 'GET_TODOBOX_SUCCESS';

export function requestTodoBox(meta) {
  return {
    type: GET_TODOBOX_REQUEST,
    meta: meta
  }
}

export function requestTodoBoxSuccess(todoBoxs) {
  return {
    type: GET_TODOBOX_SUCCESS,
    playload: {todoBoxs}
  };
}

export const CREATE_TODOBOX_REQUEST = 'CREATE_TODOBOX_REQUEST';
export const CREATE_TODOBOX_SUCCESS = 'CREATE_TODOBOX_SUCCESS';

export function requestCreateTodoBox(meta) {
  return {
    type: CREATE_TODOBOX_REQUEST,
    meta: meta
  }
}

export function createTodoBoxSuccess(playload) {
  return {
    type: CREATE_TODOBOX_SUCCESS,
    playload: playload
  };
}

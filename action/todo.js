export const USER_TODO_LIST_REQUEST = 'USER_TODO_LIST_REQUEST';
export const USER_TODO_LIST_SUCCESS = 'USER_TODO_LIST_SUCCESS';

export const TODO_LIST_REQUEST = 'TODO_LIST_REQUEST';
export const TODO_LIST_SUCCESS = 'TODO_LIST_SUCCESS';

// TODO 每个 todo list 单独区分
export function requestUserTodoList(userId, isAll = false) {
  return {
    type: USER_TODO_LIST_REQUEST,
    playload: {userId, isAll}
  };
}

export function requestUserTodoListSuccess(todoList) {
  return {
    type: USER_TODO_LIST_SUCCESS,
    playload: todoList
  };
}

export function requestTodoList(userId, listMeta) {
  return {
    type: USER_TODO_LIST_REQUEST,
    playload: {userId, listMeta}
  };
}

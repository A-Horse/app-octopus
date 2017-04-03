export const TODO_LIST_REQUEST = 'TODO_LIST_REQUEST';
export const TODO_LIST_SUCCESS = 'TODO_LIST_SUCCESS';

export function requestTodoList(userId, listMeta) {
  return {
    type: TODO_LIST_REQUEST,
    playload: {userId, listMeta}
  };
}

export function requestTodoListSuccess(todos, id) {
  return {
    type: TODO_LIST_SUCCESS,
    playload: {todos, id}
  }
}

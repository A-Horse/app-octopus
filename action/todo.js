export const TODO_LIST_REQUEST = 'TODO_LIST_REQUEST';
export const TODO_LIST_SUCCESS = 'TODO_LIST_SUCCESS';

export function requestTodoList(category, page) {
  return {
    type: TODO_LIST_REQUEST,
    playload: {category, page}
  };
}

export function requestTodoListSuccess(todoList) {
  return {
    type: TODO_LIST_SUCCESS,
    playload: todoList
  };
}

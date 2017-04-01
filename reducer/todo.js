import { normalize } from 'normalizr';
import { AUTH_REQUEST, AUTH_SUCCESS } from '../action/todo';
import { USER_TODO_LIST_REQUEST, USER_TODO_LIST_SUCCESS } from '../action/todo';
import { todos } from '../schema';
import Storage from '../service/storage';
import { JWT } from '../constant';
import Memory from '../service/memory';
import { AUTH_DATA } from '../constant';

const todo = (state = {}, action) => {
  switch (action.type) {
  case USER_TODO_LIST_SUCCESS:
    const normalized = normalize(action.playload, todos);
    return Object.assign({}, state, {
      userTodos: normalized.result,
      entities: normalized.entities
    });
  default:
    return state;
  }
};

export default todo;

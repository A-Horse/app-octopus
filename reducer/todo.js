import { normalize } from 'normalizr';
import { AUTH_REQUEST, AUTH_SUCCESS } from '../action/todo';
import { USER_TODOS_REQUEST, TODOS_SUCCESS } from '../action/todo';
import { todos } from '../schema';
import Storage from '../service/storage';
import { JWT } from '../constant';
import Memory from '../service/memory';
import { AUTH_DATA } from '../constant';

const todo = (state = {}, action) => {
  switch (action.type) {
  case TODOS_SUCCESS:
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

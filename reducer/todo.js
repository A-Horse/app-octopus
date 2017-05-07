import { normalize } from 'normalizr';
import R from 'ramda';
import { TODOS_SUCCESS, UPDATE_TODO_SUCCESS } from '../action/todo';
import { Todo, Todos } from '../schema';

const todo = (
  state = {
    results: {},
    entities: {}
  },
  action
) => {
  switch (action.type) {
  case TODOS_SUCCESS:
    const todosNormalized = normalize(action.playload.todos, Todos);
    const todosResult = R.assoc(action.playload.id, todosNormalized.result, {});
    return {
      ...state,
      results: {...state.results, ...todosResult},
      entities: {...state.entities, ...todosNormalized.entities.todo}
    };
  case UPDATE_TODO_SUCCESS:
    const todoNormalized = normalize(action.playload, Todo);
    return {
      ...state,
      entities: {...state.entities, ...todoNormalized.entities.todo}
    };
  default:
    return state;
  }
};

export default todo;

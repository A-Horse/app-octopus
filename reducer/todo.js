import { normalize } from 'normalizr';
import R from 'ramda';
import { TODOS_SUCCESS } from '../action/todo';
import { todos } from '../schema';

const todo = (
  state = {
    results: {},
    entities: {}
  },
  action
) => {
  switch (action.type) {
  case TODOS_SUCCESS:
    const normalized = normalize(action.playload.todos, todos);
    const todosResult = R.assoc(action.playload.id, normalized.result, {});
    return {
      ...state,
      results: {...state.results, ...todosResult},
      entities: {...state.entities, ...normalized.entities.todo}
    };
  default:
    return state;
  }
};

export default todo;

import { normalize } from 'normalizr';
import R from 'ramda';
import { GET_TODOBOX_SUCCESS } from '../action/todo';
import { TodoBoxs } from '../schema';

const todoBox = (
  state = {
    results: {},
    entities: {}
  },
  action
) => {
  switch (action.type) {
  case GET_TODOBOX_SUCCESS:
    const normalized = normalize(action.playload.todos, TodoBoxs);
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

export default todoBox;

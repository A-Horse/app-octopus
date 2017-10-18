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
      const boxs = [...action.playload.todoBoxs, { name: 'My Todo', id: null, type: 'only' }];
      const normalized = normalize(boxs, TodoBoxs);
      return {
        ...state,
        ...normalized
      };
    default:
      return state;
  }
};

export default todoBox;

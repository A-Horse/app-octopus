import { normalize } from 'normalizr';
import R from 'ramda';
import { TASKBOARDS_REQUEST, TASKBOARDS_SUCCESS } from '../action/task';
import { TodoBoxs } from '../schema';

const todo = (
  state = {
    TaskBoards: {}
  },
  action
) => {
  switch (action.type) {
    case TASKBOARDS_SUCCESS:
      return {
        ...state,
        TaskBoards: normalize(action.playload, TodoBoxs).entities.TaskBoard
      };

    default:
      return state;
  }
};

export default todo;

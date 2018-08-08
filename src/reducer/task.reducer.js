// @flow
import Actions from '../action/actions';
import { normalize } from 'normalizr';
import { TaskBoards, TaskBoard, TaskCard, TaskTrack } from '../schema';

export function task(state = {}, action: FSAction) {
  switch (action.type) {
    case Actions.GET_TASK_BOARD_LIST.REQUEST:
      return {
        ...state
      };
    case Actions.GET_TASK_BOARD_LIST.SUCCESS:
      const normalizedAllBoard = normalize(action.payload, TaskBoards);
      console.log(normalizedAllBoard);
      return {
        ...state
      };
    default:
      return state;
  }
}

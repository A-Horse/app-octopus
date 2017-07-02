import R from 'ramda';
import {
  requestTaskBoards
} from '../../action/task';

export function getTaskBoards(meta) {
  return dispatch => dispatch(requestTaskBoards(meta));
}

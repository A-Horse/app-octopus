export const TASKBOARDS_REQUEST = 'TASKBOARDS_REQUEST';
export const TASKBOARDS_SUCCESS = 'TASKBOARDS_SUCCESS';

export function requestTaskBoards() {
  return {
    type: TASKBOARDS_REQUEST
  };
}

export function requestTaskBoardsSuccess() {
  return {
    type: TASKBOARDS_SUCCESS
  };
}

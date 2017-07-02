export const TASKBOARDS_REQUEST = 'TASKBOARDS_REQUEST';
export const TASKBOARDS_SUCCESS = 'TASKBOARDS_SUCCESS';

export function requestTaskBoards(meta) {
  return {
    type: TASKBOARDS_REQUEST,
    meta
  };
}

export function requestTaskBoardsSuccess(playload) {
  return {
    type: TASKBOARDS_SUCCESS,
    playload
  };
}

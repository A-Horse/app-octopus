import { TASKBOARDS_REQUEST,
         requestTaskBoardsSuccess
       } from '../action/task';
import { makeServerApi } from '../util/api-maker';
import { ajax } from 'rxjs/observable/dom/ajax';
import { handleEpicError } from '../util/request-helper';

export const getTaskBoards = action$ =>
  action$.ofType(TASKBOARDS_REQUEST)
  .mergeMap(action => {
    return ajax.post(makeServerApi('signin'), action.playload)
      .map(response => response.response)
      .map(requestTaskBoardsSuccess);
  }).catch(handleEpicError);

export const signup = action$ =>
  action$.ofType(SIGNUP_REQUEST)
  .mergeMap(action => {
    return ajax.post(makeServerApi('signup'), action.playload)
      .map(response => response.response)
      .map(signupSuccess);
  }).catch(handleEpicError);

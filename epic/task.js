import { TASKBOARDS_REQUEST, requestTaskBoardsSuccess } from '../action/task';
import { makeServerApi } from '../util/api-maker';
import { ajax } from 'rxjs/observable/dom/ajax';
import { handleEpicError } from '../util/request-helper';
import AuthService from '../service/auth';

export const getTaskBoards = action$ =>
  action$.ofType(TASKBOARDS_REQUEST).mergeMap(action => {
    return ajax
      .get(
        makeServerApi(`/tk/user/${action.meta.userId}/task-board`),
        AuthService.makeJWTHeader()
      )
      .map(response => response.response)
      .map(requestTaskBoardsSuccess)
      .catch(handleEpicError);
  });

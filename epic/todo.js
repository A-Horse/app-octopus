import { USER_TODO_LIST_REQUEST, USER_TODO_LIST_SUCCESS, requestUserTodoListSuccess } from '../action/todo';
import { makeServerApi } from '../util/api-maker';
import { ajax } from 'rxjs/observable/dom/ajax';
import { handleEpicError } from '../util/request-helper';

export const userTodoList = action$ =>
  action$.ofType(USER_TODO_LIST_REQUEST)
  .mergeMap(action => {
    return ajax.get(makeServerApi(
      `user/${action.playload.userId}/todo${action.playload.isAll ? '/all' : ''}`,
      {}
    ), action.playload).map(requestUserTodoListSuccess);
  }).catch(handleEpicError);

import { USER_TODO_LIST_REQUEST, USER_TODO_LIST_SUCCESS, TODO_LIST_REQUEST, TODO_LIST_SUCCESS, requestUserTodoListSuccess, requestTodoListSuccess } from '../action/todo';
import { AUTH_REQUEST, AUTH_SUCCESS, authSuccess } from '../action/auth';
import { makeServerApi } from '../util/api-maker';
import { ajax } from 'rxjs/observable/dom/ajax';
import { handleEpicError } from '../util/request-helper';
import AuthService from '../service/auth';
import { makeTodosUrl } from '../service/todo-helper';

export const todos = action$ =>
  action$.ofType(TODO_LIST_REQUEST)
  .mergeMap(action => {
    const url = makeTodosUrl(action.playload.userId, action.listMeta);
    return ajax.get(url, AuthService.makeJWTHeader())
      .map(response => response.response)
      .map((response) => requestTodoListSuccess(response, action.listMeta.id));
  }).catch(handleEpicError);

import { TODOS_REQUEST, requestUserTodoListSuccess, requestTodosSuccess } from '../action/todo';
import { makeServerApi } from '../util/api-maker';
import { ajax } from 'rxjs/observable/dom/ajax';
import { handleEpicError } from '../util/request-helper';
import AuthService from '../service/auth';
import { makeTodosUrl } from '../util/todo-helper';

export const todos = action$ =>
  action$.ofType(TODOS_REQUEST)
  .mergeMap(action => {
    console.log('action', action);
    const url = makeTodosUrl(action.playload.id, action.playload.meta);
    return ajax.get(url, AuthService.makeJWTHeader())
      .map(response => response.response)
      .map(response => requestTodosSuccess(response, action.meta.id));
  }).catch(handleEpicError);

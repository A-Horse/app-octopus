import { TODOS_REQUEST, CREATE_TODO_REQUEST,  requestTodosSuccess, requestCreateTodoSuccess } from '../action/todo';
import { makeServerApi } from '../util/api-maker';
import { ajax } from 'rxjs/observable/dom/ajax';
import { handleEpicError } from '../util/request-helper';
import AuthService from '../service/auth';
import { makeTodosUrl } from '../util/todo-helper';

export const todos = action$ =>
  action$.ofType(TODOS_REQUEST)
  .mergeMap(action => {
    const url = makeTodosUrl(action.playload.id, action.playload.meta);
    return ajax.get(url, AuthService.makeJWTHeader())
      .map(response => response.response)
      .map(response => requestTodosSuccess(action.playload.id, response));
  }).catch(handleEpicError);

export const createTodo = action$ =>
  action$.ofType(CREATE_TODO_REQUEST)
  .mergeMap(action => {
    const url = makeTodosUrl(action.playload.id, action.playload.meta);
    return ajax.post(url, action.playload.data, AuthService.makeJWTHeader())
      .map(response => response.response)
      .map(response => requestCreateTodoSuccess(action.playload.id, action.playload.meta, response));
  }).catch(handleEpicError);

import {
  TODOS_REQUEST, CREATE_TODO_REQUEST, DESTORY_TODO_REQUEST, GET_TODOBOX_REQUEST,
  UPDATE_TODO_REQUEST,
  requestTodosSuccess, requestCreateTodoSuccess, requestDestroyTodoSuccess,
  requestTodoBoxSuccess
} from '../action/todo';
import { makeServerApi } from '../util/api-maker';
import {AjaxObservable} from 'rxjs/observable/dom/AjaxObservable';
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
    const url = makeTodosUrl(action.playload.id, action.meta);
    return ajax.post(url, action.playload.data, AuthService.makeJWTHeader())
      .map(response => response.response)
      .map(response => requestCreateTodoSuccess(action.playload.id, action.meta, response));
  }).catch(handleEpicError);

export const destoryTodo = action$ =>
  action$.ofType(DESTORY_TODO_REQUEST)
  .mergeMap(action => {
    return ajax.delete(makeServerApi(`todo/${action.playload.id}`), AuthService.makeJWTHeader())
      .map(() => {
        return requestDestroyTodoSuccess(action.playload.id);
      });
  }).catch(handleEpicError);

export const updateTodo = action$ =>
  action$.ofType(UPDATE_TODO_REQUEST)
  .mergeMap(action => {

    return new AjaxObservable({
      method: 'PATCH',
      url: makeServerApi(`todo/${action.meta.id}`)
    })
  });

export const getTodoBoxs = action$ =>
  action$.ofType(GET_TODOBOX_REQUEST)
  .mergeMap(action => {
    return ajax.get(makeServerApi(`user/${action.meta.userId}/todo-box`), AuthService.makeJWTHeader())
      .map(response => response.response)
      .map(response => requestTodoBoxSuccess(response));
  }).catch(handleEpicError);

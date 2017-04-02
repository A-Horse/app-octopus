import { USER_TODO_LIST_REQUEST, USER_TODO_LIST_SUCCESS, TODO_LIST_REQUEST, TODO_LIST_SUCCESS, requestUserTodoListSuccess } from '../action/todo';
import { AUTH_REQUEST, AUTH_SUCCESS, authSuccess } from '../action/auth';
import { makeServerApi } from '../util/api-maker';
import { ajax } from 'rxjs/observable/dom/ajax';
import { handleEpicError } from '../util/request-helper';
import AuthService from '../service/auth';
import { makeTodoListUrl } from '../service/todo-helper';

export const userTodoList = action$ =>
  action$.ofType(USER_TODO_LIST_REQUEST)
  .mergeMap(action => {
    // 操 host 有问题，我擦 调死爹了
    return ajax.get(makeServerApi(
      `user/${action.playload.userId}/todo${action.playload.isAll ? '/all' : ''}`
    ), AuthService.makeJWTHeader())
      .map(response => response.response)
      .map(requestUserTodoListSuccess);
  }).catch(handleEpicError);

export const todoList = action$ =>
  action$.ofType(TODO_LIST_REQUEST)
  .mergeMap(action => {
    const url = makeTodoListUrl(action.playload.userId, action.listMeta);
    return ajax.get(url, AuthService.makeJWTHeader())
      .map(response => response.response)
      .map(requestUserTodoListSuccess);
  }).catch(handleEpicError);

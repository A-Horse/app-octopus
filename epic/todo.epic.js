import {
  CREATE_TODO_REQUEST,
  DESTORY_TODO_REQUEST,
  GET_TODOBOX_REQUEST,
  CREATE_TODOBOX_REQUEST,
  requestCreateTodoSuccess,
  requestDestroyTodoSuccess,
  requestTodoBoxSuccess,
  requestUpdateTodoSuccess,
  createTodoBoxSuccess
} from '../action/todo';
import { makeServerApi } from '../util/api-maker';
import { AjaxObservable } from 'rxjs/observable/dom/AjaxObservable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { handleEpicError } from '../util/request-helper';
import AuthService from '../service/auth';
import { makeTodosUrl } from '../util/todo-helper';
import Actions from '../action/actioner';
import axios from 'axios';

export const todos = action$ =>
  action$.ofType(Actions.GET_TODOLIST.REQUEST).mergeMap(action => {
    const url = action.playload.boxId
      ? `/t/todo-box/${action.playload.boxId}`
      : `/t/user/${action.meta.userId}/todo`;

    return axios
      .get(makeServerApi(url))
      .then(response => Actions.GET_TODOLIST.success(response.data, action.playload))
      .catch(Actions.GET_TODOLIST.failure);
  });

export const ADD_TODOBOX_REQUEST = action$ =>
  action$.ofType(Actions.ADD_TODOBOX.REQUEST).mergeMap(action => {
    return axios
      .post(makeServerApi('/t/todo-box'), action.playload)
      .then(response => Actions.ADD_TODOBOX.success(response.data))
      .catch(Actions.ADD_TODOBOX.failure);
  });

export const ADD_TODO_REQUEST = action$ =>
  action$.ofType(Actions.ADD_TODO.REQUEST).mergeMap(action => {
    return axios
      .post(makeServerApi('/t/todo'), action.playload)
      .then(response => Actions.ADD_TODO.success(response.data))
      .catch(Actions.ADD_TODO.failure);
  });

export const destoryTodo = action$ =>
  action$.ofType(DESTORY_TODO_REQUEST).mergeMap(action => {
    return ajax
      .delete(makeServerApi(`todo/${action.playload.id}`), AuthService.makeJWTHeader())
      .map(() => {
        return requestDestroyTodoSuccess(action.playload.id);
      })
      .catch(handleEpicError);
  });

export const UPDATE_TODO_REQUEST = action$ =>
  action$
    .ofType(Actions.UPDATE_TODO.REQUEST)
    .distinctUntilChanged()
    .debounceTime(250)
    .mergeMap(action => {
      return axios
        .patch(makeServerApi(`/t/todo/${action.playload.id}`), action.playload)
        .then(response => Actions.UPDATE_TODO.success(response.data))
        .catch(Actions.UPDATE_TODO.failure);
    });

export const getTodoBoxs = action$ =>
  action$.ofType(GET_TODOBOX_REQUEST).mergeMap(action => {
    return ajax
      .get(makeServerApi(`t/user/${action.meta.userId}/todo-box`), AuthService.makeJWTHeader())
      .map(response => response.response)
      .map(response => requestTodoBoxSuccess(response))
      .catch(handleEpicError);
  });

export const createTodoBox = action$ =>
  action$.ofType(CREATE_TODOBOX_REQUEST).mergeMap(action => {
    return ajax
      .post(makeServerApi(`t/todo-box`), action.playload, AuthService.makeJWTHeader())
      .map(response => response.response)
      .map(response => createTodoBoxSuccess(response))
      .catch(handleEpicError);
  });

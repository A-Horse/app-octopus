import { USER_TODO_LIST_REQUEST, USER_TODO_LIST_SUCCESS, requestUserTodoListSuccess } from '../action/todo';
import { AUTH_REQUEST, AUTH_SUCCESS, authSuccess } from '../action/auth';
import { makeServerApi } from '../util/api-maker';
import { ajax } from 'rxjs/observable/dom/ajax';
import { handleEpicError } from '../util/request-helper';
import AuthService from '../service/auth';

export const userTodoList = action$ =>
  action$.ofType(USER_TODO_LIST_REQUEST)
  .mergeMap(action => {
    console.log(action);
    console.log(`user/${action.playload.userId}/todo${action.playload.isAll ? '/all' : ''}`);
    console.log(makeServerApi(
      `user/${action.playload.userId}/todo${action.playload.isAll ? '/all' : ''}`
    ));
    // return ajax.post(makeServerApi('signin'), {email: 'abychen@outlook.com', password: '123456'})
    //   .map(response => response.response)
    //   .map(authSuccess);
    // 操 host 有问题，我擦 调死爹了
    return ajax.get(makeServerApi(
      `user/${action.playload.userId}/todo${action.playload.isAll ? '/all' : ''}`
    ), AuthService.makeJWTHeader())
      .map(response => response.response)
      .map(requestUserTodoListSuccess);
  }).catch(handleEpicError);

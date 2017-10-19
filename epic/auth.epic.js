import {
  AUTH_REQUEST,
  SIGNUP_REQUEST,
  authSuccess,
  authFailure,
  signupSuccess
} from '../action/auth';
import { makeServerApi } from '../util/api-maker';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs/Observable';
import Actions from '../action/actioner';
import axios from 'axios';

import { handleEpicError } from '../util/request-helper';

export const auth = action$ => {
  return action$.ofType(Actions.SIGN_IN.REQUEST).mergeMap(action => {
    return axios
      .post(makeServerApi('/user/signin'), action.playload)
      .then(response => Actions.SIGN_IN.success(response.data))
      .catch(Actions.SIGN_IN.failure);
    // return ajax
    //   .post(makeServerApi('/user/signin'), action.playload)
    //   .map(response => response.response)
    //   .map(authSuccess)
    //   .catch((error, caught) => {
    //     if (error.status) {
    //       return Observable.of(authFailure(error));
    //     }
    //     throw error;
    //   })
    //   .catch(handleEpicError);
  });
};

export const signup = action$ =>
  action$.ofType(SIGNUP_REQUEST).mergeMap(action => {
    return ajax
      .post(makeServerApi('/user/signup'), action.playload)
      .map(response => response.response)
      .map(signupSuccess)
      .catch(handleEpicError);
  });

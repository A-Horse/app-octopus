import {
  AUTH_REQUEST,
  SIGNUP_REQUEST,
  authSuccess,
  signupSuccess
} from '../action/auth';
import { makeServerApi } from '../util/api-maker';
import { ajax } from 'rxjs/observable/dom/ajax';
import { handleEpicError } from '../util/request-helper';

export const auth = action$ =>
  action$
    .ofType(AUTH_REQUEST)
    .mergeMap(action => {
      return ajax
        .post(makeServerApi('signin'), action.playload)
        .map(response => response.response)
        .map(authSuccess);
    })
    .catch(handleEpicError);

export const signup = action$ =>
  action$
    .ofType(SIGNUP_REQUEST)
    .mergeMap(action => {
      return ajax
        .post(makeServerApi('signup'), action.playload)
        .map(response => response.response)
        .map(signupSuccess);
    })
    .catch(handleEpicError);

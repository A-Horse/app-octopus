import { AUTH_REQUEST, AUTH_SUCCESS, authSuccess } from '../action/auth';
import { makeServerApi } from '../util/api-maker';
import { ajax } from 'rxjs/observable/dom/ajax';
import { handleEpicError } from '../util/request-helper';

export const auth = action$ =>
  action$.ofType(AUTH_REQUEST)
  .mergeMap(action => {
    return ajax.post(makeServerApi('signin'), action.playload).map(authSuccess);
  }).catch(handleEpicError);

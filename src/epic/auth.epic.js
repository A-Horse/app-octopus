import Actions from '../action/actions';
import axios from 'axios';
import { setupAxiosJwtHeader } from '../helper/http-intercetor';
import { API_BASE } from '../env/env';
import NavigationService from '../service/single/navigation.service';

import { ofType } from 'redux-observable';
import { mergeMap, tap, ignoreElements } from 'rxjs/operators';

export const SIGNIN = action$ => {
  return action$.pipe(
    ofType(Actions.SIGNIN.REQUEST),
    mergeMap(action => {
      return axios
        .post(`${API_BASE}/signin`, action.payload)
        .then(response => {
          setupAxiosJwtHeader(response.data.token);
          return Actions.SIGNIN.success(response.data);
        })
        .catch(error => {
          return Actions.SIGNIN.failure(error);
        });
    })
  );
};

export const SIGNIN_SUCCESS = action$ =>
  action$.pipe(
    ofType(Actions.SIGNIN.SUCCESS),
    tap(() => {
      NavigationService.navigate('Main');
    }),
    ignoreElements()
  );

export const GET_USER_INFO = action$ => {
  return action$.ofType(Actions.GET_USER_INFO.REQUEST).mergeMap(action => {
    return axios
      .get(`${API_BASE}/auth/user/${action.payload.userId}`)
      .then(resp => {
        return Actions.GET_USER_INFO.success(resp.data);
      })
      .catch(Actions.GET_USER_INFO.failure);
  });
};

export const REHYDRATE = action$ => {
  return action$.pipe(
    ofType('persist/REHYDRATE'),
    tap(action => {
      if (action.payload) {
        setupAxiosJwtHeader(action.payload.auth.token);
      }
    }),
    ignoreElements()
  );
};

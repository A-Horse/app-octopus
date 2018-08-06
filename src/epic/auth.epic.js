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
        .post(`${API_BASE}/user/signin`, action.payload)
        .then(response => {
          console.log(response);
          setupAxiosJwtHeader(response.data.jwt);
          return Actions.SIGNIN.success({
            token: response.data.jwt,
            user: response.data.user
          });
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

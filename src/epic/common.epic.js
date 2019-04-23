import Actions from '../action/actions';
import axios from 'axios';
import { setupAxiosJwtHeader } from '../helper/http-intercetor';
import { API_BASE } from '../env/env';
import NavigationService from '../service/single/navigation.service';

import { ofType } from 'redux-observable';
import { mergeMap, tap, ignoreElements } from 'rxjs/operators';

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

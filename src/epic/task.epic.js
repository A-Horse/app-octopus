// @flow
import Actions from '../action/actions';
import axios from 'axios';
import { setupAxiosJwtHeader } from '../helper/http-intercetor';
import { API_BASE } from '../env/env';
import NavigationService from '../service/single/navigation.service';

import { ofType } from 'redux-observable';
import { mergeMap, tap, ignoreElements } from 'rxjs/operators';

export const GET_TASK_BOARD_LIST = action$ => {
  return action$.pipe(
    ofType(Actions.GET_TASK_BOARD_LIST.REQUEST),
    mergeMap(action => {
      return axios
        .get(`${API_BASE}/tk/user/${action.payload.userId}/task-board`)
        .then(response => {
          console.log(response);
          return Actions.GET_TASK_BOARD_LIST.success(response.data);
        })
        .catch(error => {
          return Actions.GET_TASK_BOARD_LIST.failure(error);
        });
    })
  );
};

export const GET_TASK_BOARD_LIST_SUCCESS = action$ =>
  action$.pipe(ofType(Actions.GET_TASK_BOARD_LIST.SUCCESS), ignoreElements());

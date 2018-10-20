import Actions from '../action/actions';
import axios from 'axios';
import { setupAxiosJwtHeader } from '../helper/http-intercetor';
import { API_BASE } from '../env/env';
import NavigationService from '../service/single/navigation.service';

import { ofType } from 'redux-observable';
import { mergeMap, map, tap, switchMap, debounceTime, ignoreElements } from 'rxjs/operators';

export const GET_TODOBOX = (action$, state$) => {
  return action$.pipe(
    ofType(Actions.GET_TODOBOX.REQUEST),
    /* mergeMap(state$), */
    mergeMap(action => {
      return state$.pipe(
        map(state => state.auth.user.id),
        mergeMap(userId => {
          let apiUrl;
          switch (action.payload.todoBoxId) {
            case '@user':
              apiUrl = `/t/user/${userId}/todo`;
              break;
            case '@task':
              apiUrl = `/t/user/${userId}/task-todo`;
              break;
          }
          return axios
            .get(`${API_BASE}/${apiUrl}`)
            .then(response => {
              return Actions.GET_TODOBOX.success({
                id: action.payload.todoBoxId,
                data: response.data
              });
            })
            .catch(error => {
              return Actions.GET_TODOBOX.failure(error);
            });
        })
      );
    })
  );
};

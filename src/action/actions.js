import { values } from 'ramda';

const actionNames = [
  'SIGNIN',
  'GET_TASK_BOARD_LIST',
  'GET_TASK_BOARD',
  'ADD_TASK_CARD',
  'UPDATE_TASK_CARD',

  'GET_TODOBOX',
  'ADD_TODO',
  'UPDATE_TODO',

  'LOGOUT'
];

export const actions = actionNames.reduce((result, actionName) => {
  const REQUEST_SYMBOL = actionName + '_REQUEST';
  const SUCCESS_SYMBOL = actionName + '_SUCCESS';
  const FAILURE_SYMBOL = actionName + '_FAILURE';
  const FINISH_SYMBOL = actionName + '_FINISH';
  result[actionName] = {
    name: actionName,
    REQUEST: REQUEST_SYMBOL,
    SUCCESS: SUCCESS_SYMBOL,
    FAILURE: FAILURE_SYMBOL,
    FINISH: FINISH_SYMBOL,
    request: (payload, meta) => ({
      type: REQUEST_SYMBOL,
      payload,
      meta
    }),
    success: (payload, meta) => ({
      type: SUCCESS_SYMBOL,
      payload,
      meta
    }),
    failure: (payload, meta) => ({
      type: FAILURE_SYMBOL,
      error: true,
      payload,
      meta
    }),
    finish: (payload, meta) => {
      return {
        type: FINISH_SYMBOL,
        payload,
        meta
      };
    }
  };
  return result;
}, {});

export function makeActionRequestCollection() {
  return values(actions).reduce((result, actionFactor) => {
    result[actionFactor.name + '_REQUEST'] = actionFactor.request;
    result[actionFactor.name + '_FINISH'] = actionFactor.finish;
    return result;
  }, {});
}

export default actions;

// @flow
import Actions from '../action/actions';

export function todo(state = { token: null, userId: null }, action: FSAction) {
  switch (action.type) {
    case Actions.GET_TODOBOX.SUCCESS:
      return {
        ...state
      };

    default:
      return state;
  }
}

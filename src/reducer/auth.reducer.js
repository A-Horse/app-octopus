// @flow
import Actions from '../action/actions';

export function auth(state = { token: null, userId: null }, action: FSAction) {
  switch (action.type) {
    case Actions.SIGNIN.REQUEST:
      return {
        ...state,
        username: action.payload.username
      };
    case Actions.SIGNIN.SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
      };

    default:
      return state;
  }
}

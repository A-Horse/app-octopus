import Actions from '../action/actions';

export function auth(state = { token: null, userId: null }, action) {
  switch (action.type) {
    case Actions.SIGNIN.REQUEST:
      return {
        ...state
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

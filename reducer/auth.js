import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from '../action/auth';
import { JWT } from '../constant';
import Actions from '../action/actioner';

const auth = (
  state = {
    user: {},
    isLogin: false,
    isAuthError: false,
    loginFetching: false
  },
  action
) => {
  switch (action.type) {
    case Actions.SIGN_IN.REQUEST:
      return {
        ...state,
        loginFetching: true
      };
    case Actions.SIGN_IN.SUCCESS:
      return {
        ...state,
        user: action.playload.user,
        jwt: action.playload[JWT],
        isLogin: true,
        isAuthError: false,
        loginFetching: false
      };
    case Actions.SIGN_IN.FAILURE:
      console.log(action);
      return {
        ...state,
        isLogin: false,
        isAuthError: true,
        loginFetching: false,
        authErrorStatus: action.playload.response.status
      };

    default:
      return state;
  }
};

export default auth;

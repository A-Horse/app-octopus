import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from '../action/auth';
import { JWT } from '../constant';

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
    case AUTH_REQUEST:
      return {
        ...state,
        loginFetching: true
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.playload.user,
        jwt: action.playload[JWT],
        isLogin: true,
        isAuthError: false,
        loginFetching: false
      };
    case AUTH_FAILURE:
      return {
        ...state,
        isLogin: false,
        isAuthError: true,
        loginFetching: false,
        authErrorStatus: action.playload.status
      };

    default:
      return state;
  }
};

export default auth;

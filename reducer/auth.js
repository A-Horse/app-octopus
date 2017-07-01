import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from '../action/auth';
import Storage from '../service/storage';
import { JWT } from '../constant';
import Memory from '../service/memory';
import { AUTH_DATA } from '../constant';

const auth = (
  state = {
    user: {}
  },
  action
) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.playload.user,
        jwt: action.playload[JWT],
        isLogin: true
      };
    case AUTH_FAILURE:
      switch (action.playload.status) {
        case 401:
          return {
            isLogin: false,
            isAuthError: true,
            ...state
          };
      }

    default:
      return state;
  }
};

export default auth;

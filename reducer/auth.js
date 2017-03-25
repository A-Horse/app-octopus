import { AUTH_REQUEST, AUTH_SUCCESS } from '../action/auth';
import { JWT } from '../constant';
import Memory from '../service/Memory';

const auth = (state = {}, action) => {
  switch (action.type) {
  case AUTH_SUCCESS:
    Memory.set('jwt', action.playload[JWT]);
    Memory.set('user', action.playload.user);
    return Object.assign({}, state, {user: action.playload.user, jwt: action.playload[JWT]});
  default:
    return state;
  }
}

export default auth;

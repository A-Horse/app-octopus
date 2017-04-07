import { AUTH_REQUEST, AUTH_SUCCESS } from '../action/auth';
import Storage from '../service/storage';
import { JWT } from '../constant';
import Memory from '../service/memory';
import { AUTH_DATA } from '../constant';

const auth = (state = {}, action) => {
  switch (action.type) {
  case AUTH_SUCCESS:
    console.log(action);
    Memory.set(AUTH_DATA, action.playload);
    Storage.set(AUTH_DATA, JSON.stringify(action.playload));
    return Object.assign({}, state,
                    {user: action.playload.user,
                     jwt: action.playload[JWT],
                     AUTH_DATA: action.playload});
  default:
    return state;
  }
}

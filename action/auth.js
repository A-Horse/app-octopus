export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';

export function authRequest(authData) {
  return {
    type: AUTH_REQUEST,
    playload: authData
  };
}

export function authSuccess(data) {
  console.log(data, 'data');
  return {
    type: AUTH_SUCCESS,
    playload: data
  };
}

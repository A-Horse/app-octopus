export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';

export function authRequest(authData) {
  return {
    type: AUTH_REQUEST,
    playload: authData
  };
}

export function authSuccess(data) {
  return {
    type: AUTH_SUCCESS,
    playload: data
  };
}

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

export function signupRequest(data) {
  return {
    type: SIGNUP_REQUEST,
    playload: data
  };
}

export function signupSuccess(data) {
  return {
    type: SIGNUP_SUCCESS,
    playload: data
  };
}

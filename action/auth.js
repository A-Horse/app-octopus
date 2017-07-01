export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export function authRequest(authData) {
  return {
    type: AUTH_REQUEST,
    playload: authData
  };
}

export function authSuccess(playload) {
  return {
    type: AUTH_SUCCESS,
    playload
  };
}

export function authFailure(error) {
  return {
    type: AUTH_FAILURE,
    playload: error,
    error: true
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

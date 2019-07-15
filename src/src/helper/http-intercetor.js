//      
import axios from 'axios';
import Promise from 'es6-promise';
import navigationService from '../service/single/navigation.service';

function responseSuccessInterceptor(response) {
  return response;
}
function responseFailureInterceptor(error) {
  if (error.response.status === 401) {
    navigationService.navigate('Login');
  }
  return Promise.reject(error);
}

export function setupAxiosJwtHeader(jwt        ) {
  axios.defaults.headers.common['jwt-token'] = `${jwt}`;
}

export function setupAxiosIntercetor() {
  axios.interceptors.response.use(responseSuccessInterceptor, responseFailureInterceptor);
}

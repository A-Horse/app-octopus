import { Alert } from 'react-native';

export function handleEpicError(error, caught) {
  function handleCaught() {
    if (caught) {
      return caught;
    }
  }

  if (__DEV__) {
    // console.error(error, caught);
    return handleCaught();
  } else {
    if (error.status && error.status < 500) {
      return handleCaught();
    }
    Alert.alert(
      'Unexpected error occurred',
      `
      ${error.name} ${error.message}
        `
    );
  }
  return handleCaught(); // must return Observable http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-catch
}

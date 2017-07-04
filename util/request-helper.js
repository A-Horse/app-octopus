import { Alert } from 'react-native';
import { Observable } from 'rxjs/Observable';

export function handleEpicError(error, caught) {
  function handleCaught() {
    if (caught) {
      return Observable.of({ type: 'UNEXPECTED_ERROR' });
    }
  }

  if (__DEV__) {
    console.log(error, caught);
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

import { Alert } from 'react-native';

export function handleEpicError(error, caught) {
  if (__DEV__) {
    console.error(error, caught);
    return caught;
  } else {
    Alert.alert(
      'Unexpected error occurred',
      `
      ${error.name} ${error.message}
        `
    );
  }
  return caught; // must return Observable http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-catch
}

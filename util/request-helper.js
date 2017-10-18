import { Alert } from 'react-native';
import { Observable } from 'rxjs/Observable';

export function handleEpicError(error, caught) {
  Alert.alert(
    'Unexpected error occurred',
    `
      ${error.name} ${error.message}
        `
  );
  if (caught) {
    return Observable.of({ type: 'UNEXPECTED_ERROR' });
  }
}

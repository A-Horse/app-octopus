import { Alert } from 'react-native';

export function handleEpicError(error, caught) {
  if (__DEV__) {
    console.error(error, caught);
    return caught; // TODO ? return 有毛用
  } else {
    Alert.alert(
      'Unexpected error occurred',
      `
      ${error.name} ${error.message}
        `
    );
  }
}

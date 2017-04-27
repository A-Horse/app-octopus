import { combineEpics } from 'redux-observable';

import { auth } from './auth';
import * as todoEpics from './todo';

export default combineEpics(
  auth,

  ...todoEpics
);

import Storage from './storage';

import { AUTH_DATA } from '../constant';

export async function checkLogin() {
  return !!(await Storage.get(AUTH_DATA));
}

import Storage from './storage';
import Memory from './memory';
import { AUTH_DATA } from '../constant';

export class Auth {
  authRead = false;
  isAuth = false;

  async getAuthFromStorage() {
    return await Storage.get(AUTH_DATA);
  }

  async startupFlow() {
    const authData = await this.getAuthFromStorage();
    this.isAuth = !!authData;
    this.authRead = true;
    if (!!authData) {
      Memory.set(AUTH_DATA, authData);
    }
  }
}

export default new Auth();

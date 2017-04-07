import Storage from './storage';
import Memory from './memory';
import { AUTH_DATA, JWT, JWTS_TOKEN } from '../constant';

export class Auth {
  authRead = false;
  isAuth = false;
  authData = null;

  async getAuthFromStorage() {
    return await Storage.get(AUTH_DATA);
  }

  // TODO 建一个常量promise 安全起见
  async startupFlow() {
    const authData = await this.getAuthFromStorage();
    this.isAuth = !!authData;
    this.authRead = true;
    if (!!authData) {
      const authDataObj = JSON.parse(authData);
      Memory.set(AUTH_DATA, authDataObj);
      this.authData = authDataObj;
    }
  }

  checkLoginFromState(state) {
    const { auth } = state;
    if (auth && auth.user && auth.jwt) {
      return true;
    }
    return false;
  }

  makeJWTHeader(header = {}) {
    const jwtObj = {};
    jwtObj[JWTS_TOKEN] = this.authData[JWT];
    return Object.assign({}, header, jwtObj);
  }
}


const AuthService = new Auth();

export default AuthService;

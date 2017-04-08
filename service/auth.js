import { JWT, JWTS_TOKEN } from '../constant';

export class Auth {
  jwt = null;

  loadJWTFromState(state) {
    const { auth } = state;
    this.jwt = auth.jwt;
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
    jwtObj[JWTS_TOKEN] = this.jwt;
    return Object.assign({}, header, jwtObj);
  }
}


const AuthService = new Auth();

export default AuthService;

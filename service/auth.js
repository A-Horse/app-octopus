import { JWT, JWTS_TOKEN } from '../constant';

export class Auth {

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

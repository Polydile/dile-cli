export class TokenService {
  get token() {
    return window.localStorage.getItem('token')
  }

  set token(token) {
    window.localStorage.setItem('token', token);
  }

  storeToken(token) { 
    this.token = token;
  }  

  removeToken(token) {
    window.localStorage.removeItem('token');
  }
}
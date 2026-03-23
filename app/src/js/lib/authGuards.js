import { waitForAuthState } from './authState.js';

export function protectLoggedIn(app, enterFn, options = {}) {
  return async () => {
    const isLoggedIn = await waitForAuthState(options.timeout);
    if (!isLoggedIn) {
      app.goToUrl('/login');
      return false;
    }
    return enterFn();
  };
}

export default protectLoggedIn;

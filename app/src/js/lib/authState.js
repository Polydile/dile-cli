import { store } from '../redux/store.js';

export async function waitForAuthState(timeout = 5000) {
  return new Promise((resolve) => {
    let state = store.getState();
    if (state?.user?.isInitialized) {
      resolve(Boolean(state.user.isLoggedIn));
      return;
    }

    let unsubscribe;
    unsubscribe = store.subscribe(() => {
      state = store.getState();
      if (state?.user?.isInitialized) {
        try { unsubscribe(); } catch (e) {}
        resolve(Boolean(state.user.isLoggedIn));
      }
    });

    // Fallback: resolve after timeout to avoid hanging indefinitely
    if (typeof timeout === 'number' && timeout > 0) {
      setTimeout(() => {
        try { unsubscribe && unsubscribe(); } catch (e) {}
        state = store.getState();
        resolve(Boolean(state?.user?.isLoggedIn));
      }, timeout);
    }
  });
}

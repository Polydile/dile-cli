import { LitElement, html, css } from 'lit';
import '@dile/iconlib/lucide-icons/user.js';
import '@dile/ui/components/menu-overlay/menu-overlay.js';
import '@dile/crud/components/ajax/ajax.js';
import { DileAppNavigate } from '@dile/lib';
import { tokenService } from '../../lib/app';
import { store } from '../../redux/store';
import { storeUser, setInitialized, removeUser} from '@dile/lib';
import { StateMixin } from '../../mixin/StateMixin.js';
import './dile-user-menu.js';
import { userMenuStyles } from '../styles/user-menu-styles.js';

export class DileUser extends DileAppNavigate(StateMixin(LitElement)) {
  static styles = [
    userMenuStyles,
    css`
      :host {
        display: flex;
        align-items: center;
        --dile-icon-rounded-background-color: var(--dile-primary-dark-color);
        --dile-icon-color: var(--dile-on-primary-dark-color);
        --dile-icon-rounded-padding: 0.25rem;
      }
      @media(min-width: 1000px) {
        :host {
          --dile-icon-rounded-padding: 0.35rem;
          --dile-icon-size: 28px;
        }
      }
    `
  ];

  static get properties() {
    return {
      loggedIn: { type: Boolean },
      user: { type: Object },
    };
  }

  firstUpdated() {
    if(tokenService.token) { 
      this.checkUser();
    }
  }

  stateChanged(state) {
    this.loggedIn = state.user.isLoggedIn;
    this.user = state.user.userData;
  }

  render() {
    return html`
      ${this.ajaxGetUserTemplate}
      ${this.loggedIn
        ? this.authenticatedTemplate
        : this.unauthenticatedTemplate
      }
    `;
  }

  get authenticatedTemplate() {
    return html`
      <dile-user-menu .user="${this.user}"></dile-user-menu>
    `;
  }

  get unauthenticatedTemplate() {
    return html`
      <dile-menu-overlay class="loginoverlay" horizontalAlign="under" moveLeft="15">
        <div class="loginbutton" slot="trigger">
          <a href="#" @click="${e => e.preventDefault()}"><dile-lucide-icon-user rounded></dile-lucide-icon-user></a>
        </div>
        <div slot="content">
          <a class="loginoption" href="/login" @click="${e => { e.preventDefault(); this.goToUrl('/login', 'Login'); }}">Login</a>
          <a class="loginoption" href="/register" @click="${e => { e.preventDefault(); this.goToUrl('/register', 'Register'); }}">Register</a>
        </div>
      </dile-menu-overlay>
    `;
  }

  get ajaxGetUserTemplate() {
    return html`
      <dile-ajax 
        id="getUser" 
        method="GET" 
        url="/api/auth/user" 
        @ajax-success="${this.handleUserResponse}"
        @ajax-error="${this.handleUserError}">
      </dile-ajax>
    `;
  }

  get ajaxUser() {
    return this.shadowRoot.querySelector('#getUser');
  }

  checkUser() {
    this.ajaxUser.generateRequest();
  }

  handleUserResponse(e) {
    const user = e.detail.data;
    console.log('User data received', user);
    store.dispatch(storeUser(user));
    store.dispatch(setInitialized(true));
  }
  
  handleUserError(e) {
    tokenService.removeToken();
  }
}
customElements.define('dile-user', DileUser);

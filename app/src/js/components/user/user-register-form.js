import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form'

import '@dile/ui/components/input/input.js';
import '@dile/ui/components/password/password.js';

export class userRegisterForm extends DileForm(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];


  render() {
    return html`
      <dile-input value="Mi" label="Name" name="name" id="name" hideErrorOnInput></dile-input>
      <dile-input value="m@example.com" label="Email" name="email" id="email" hideErrorOnInput></dile-input>
      <dile-password value="1234qwer" label="Password" name="password" id="password" hideErrorOnInput></dile-password>
    `;
  }
}
customElements.define('user-register-form', userRegisterForm);

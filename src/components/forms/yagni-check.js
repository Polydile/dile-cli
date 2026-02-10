import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form'

export class yagniCheck extends DileForm(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
      Component yagni-check
    `;
  }
}
customElements.define('yagni-check', yagniCheck);
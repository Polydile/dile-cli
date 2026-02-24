import { LitElement, html, css } from 'lit';
import { DileFeedback } from '@dile/lib';
import { store } from '../../redux/store';
import { pageStyles } from '../styles/page-styles';

export class DilePageHome extends DileFeedback(store)(LitElement) {
  static styles = [
    pageStyles
  ];

  render() {
    return html`
      <h1>Dile App Home</h1>
      <p>
        <dile-button @click=${() => this.positiveFeedback('Hi Dile App')}>Create positive feedback</dile-button>
        <dile-button @click=${() => this.neutralFeedback('Bye my love')}>Create neutral feedback</dile-button>
        <dile-button @click=${() => this.negativeFeedback('Sorry this is not possible')}>Create negative feedback</dile-button>
      </p>
      <p>
        <dile-button @click=${() => this.modalFeedback('This is a modal message')}>Create modal feedback</dile-button>
        <dile-button @click=${() => this.modalFeedback('This is a modal message with a info icon', 'Thak\'s', 'info')}>Info modal</dile-button>
        <dile-button @click=${() => this.modalFeedback('This is a modal message with a warning icon and a customized button label', 'Ok', 'warning')}>Create warning modal</dile-button>
        <dile-button @click=${() => this.modalFeedback('Success icon and a customized button label', 'Great', 'success')}>Success modal</dile-button>
        <dile-button @click=${() => this.modalFeedback('Error icon and a customized button label', 'I am sad', 'error')}>Success modal</dile-button>
      </p>
      <p>
        <dile-button @click=${() => { this.startLoading(); setTimeout(() => this.stopLoading(), 3000)} }>Start loading for 3 seconds</dile-button>
      </p>
      <p>
        <a href="/login">login page</a>
      </p>
    `;
  }
}
customElements.define('dile-page-home', DilePageHome);

import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';

export class AppBackOffice extends LitElement {
  static get styles() {
    return css``;
  }

  showDCI() {
    Router.go('/admin');
  }

  render() {
    return html`
      <h1>Back Office</h1>

      <input type="text" placeholder="username" />
      <input type="password" placeholder="password" />
      <button @click=${this.showDCI}>Login</button>
    `;
  }
}

customElements.define('app-backoffice', AppBackOffice);

import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';

export class AppBackOffice extends LitElement {
  static get styles() {
    return css``;
  }

  showDCI() {
    // Vaadin Router doesn't handle baseUrl propertly here
    // TODO: report issue to Vaadin
    // alternatively, we could use a popstate event
    const baseURL = document.querySelector('base')?.href || '/';
    const routed = Router.go(`${baseURL}admin`);
    if (!routed) {
      // eslint-disable-next-line no-console
      console.error('admin route not found');
    }
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

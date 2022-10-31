import { LitElement, html, css } from 'lit';
import '@blindnet/dci';
import { ifDefined } from 'lit/directives/if-defined.js';

export class AppDCI extends LitElement {
  static get properties() {
    return {
      _apiToken: { state: true },
    };
  }

  static get styles() {
    return css``;
  }

  render() {
    this._apiToken = localStorage.getItem('dci_admin_token');
    setTimeout(() => {}, 1000);
    return html`
      <bldn-data-consum
        admin-token=${ifDefined(this._apiToken)}
      ></bldn-data-consum>
    `;
  }
}

customElements.define('app-dci', AppDCI);

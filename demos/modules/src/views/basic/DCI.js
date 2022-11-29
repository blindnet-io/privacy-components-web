import { LitElement, html, css } from 'lit';
import '@blindnet/bridge';
import { ifDefined } from 'lit/directives/if-defined.js';

export class AppDCI extends LitElement {
  static get properties() {
    return {
      _apiToken: { state: true },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 40vw;
        padding: 50px 100px;
        background: white;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.34),
          0px 0.500862px 1.50259px rgba(0, 0, 0, 0.17);
        border-radius: 20px;
      }
    `;
  }

  render() {
    this._apiToken = localStorage.getItem('dci_admin_token');
    setTimeout(() => {}, 1000);
    return html`
      <bldn-bridge admin-token=${ifDefined(this._apiToken)}></bldn-bridge>
    `;
  }
}

customElements.define('basic-demo-dci', AppDCI);

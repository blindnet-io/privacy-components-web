import { LitElement, html, css } from 'lit';

import '@blindnet/prci'; // WTF

export class AppLogin extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return css``;
  }

  render() {
    return html`
      <bldn-magic-auth
        prompt="Please enter your email to submit a request."
        magic-pub-key="pk_live_7BFA1BB7D19A6FD9"
        redirect-uri="${window.location
          .origin}/demos/devkit-simple-tutorial/privacy"
      >
      </bldn-magic-auth>
    `;
  }
}

customElements.define('app-login', AppLogin);

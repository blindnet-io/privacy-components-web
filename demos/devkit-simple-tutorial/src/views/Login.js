import { LitElement, html, css } from 'lit';

import '@blindnet/prci';

import { Auth0Client } from '@auth0/auth0-spa-js';

const auth0 = new Auth0Client({
  domain: 'dev-h7hjew-e.us.auth0.com',
  client_id: '1j68DJxHXTgTj7OE3QIgiBpO7J21pVQm',
  redirect_uri: 'http://localhost:8000/demos/devkit-simple-tutorial/privacy',
  authorizationParams: {
    redirect_uri: 'http://localhost:8000/demos/devkit-simple-tutorial/privacy'
  }
});

export class AppLogin extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return css``;
  }

  render() {
    auth0.getTokenSilently();
    auth0.loginWithRedirect();
    return html`

      <!-- <bldn-magic-auth
        prompt="Please enter your email to submit a request."
        magic-pub-key="pk_live_7BFA1BB7D19A6FD9"
        redirect-uri="${window.location
          .origin}/demos/devkit-simple-tutorial/privacy"
      >
      </bldn-magic-auth>
      <bldn-auth></bldn-auth> -->
    `;
  }
}

customElements.define('app-login', AppLogin);

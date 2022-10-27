import { LitElement, html, css } from 'lit';

import '@blindnet/prci';

import { Auth0Client } from '@auth0/auth0-spa-js';

const auth0 = new Auth0Client({
  domain: 'blindnet.eu.auth0.com',
  client_id: '1C0uhFCpzvJAkFi4uqoq2oAWSgQicqHc',
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
  }
}

customElements.define('app-login', AppLogin);

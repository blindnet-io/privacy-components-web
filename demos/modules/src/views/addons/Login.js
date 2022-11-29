import { LitElement, css } from 'lit';

import { Auth0Client } from '@auth0/auth0-spa-js';

const auth0 = new Auth0Client({
  domain: 'blindnet.eu.auth0.com',
  client_id: '1C0uhFCpzvJAkFi4uqoq2oAWSgQicqHc',
  audience: 'https://blindnet-connector-demo-staging.azurewebsites.net',
  redirect_uri: `${window.location.origin}/demos/devkit-simple-tutorial/privacy`,
  authorizationParams: {
    redirect_uri: `${window.location.origin}/demos/devkit-simple-tutorial/privacy`,
  },
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

customElements.define('addons-demo-login', AppLogin);

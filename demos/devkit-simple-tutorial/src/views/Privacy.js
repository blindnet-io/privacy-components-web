import { LitElement, html, css } from 'lit';
import { when } from 'lit/directives/when.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Auth0Client } from '@auth0/auth0-spa-js';

import '@blindnet/prci'

// Get an auth0 instance
const auth0 = new Auth0Client({
  domain: 'blindnet.eu.auth0.com',
  client_id: '1C0uhFCpzvJAkFi4uqoq2oAWSgQicqHc',
  redirect_uri: 'http://localhost:8000/demos/devkit-simple-tutorial/privacy',
  authorizationParams: {
    redirect_uri: 'http://localhost:8000/demos/devkit-simple-tutorial/privacy'
  }
});

export class AppPrivacy extends LitElement {

  static get properties() {
    return {
      _userData: { state: true },
      _apiToken: { state: true },
    };
  }

  static get styles() {
    return css`
      bldn-priv-request {
        margin-bottom: 30px;
      }
    `;
  }

  async getBlindnetToken(auth0Token) {

    const headers = {
      Authorization: `Bearer ${auth0Token}`
    }

    return fetch(
      // 'https://blindnet-connector-demo-staging.azurewebsites.net/auth/token',
      'https://devkit-pce-staging.azurewebsites.net/v0/auth/token',
      {
        method: 'GET',
        headers
      }
    )

  }

  handleLoginClick() {
    window.location.href = `${window.location.origin}/demos/devkit-simple-tutorial/login`;
  }

  handleLogoutClick() {
    auth0.logout()
  }

  render() {

    // Try to get a login token
    auth0.getTokenSilently()
      .then(token => {
        this._apiToken = token;
        this.getBlindnetToken().then(result => {
          console.log(result)
        })
        auth0.getUser().then(user => {
          this._userData = user
        })
      })
      .catch(() => {
        this._apiToken = undefined
        // If not logged in, do nothing as PRCI can be used unauthenticated
      })


    return html`
      
      <bldn-priv-request
        data-categories='["contact", "name", "uid", "other-data"]'
        api-token=${ifDefined(this._apiToken)}
      ></bldn-priv-request>

      ${when(this._userData, () => html`
      
        <span>Logged in as ${this._userData?.email}.</span>
        <bldn-button
          @click=${this.handleLogoutClick}
          mode='link'
        >
          Logout
        </bldn-button>

      `, () => html`
        <bldn-button
          @click=${this.handleLoginClick}
          mode='link'
        >
          Login
        </bldn-button>
      `)}
    `
  }
}

customElements.define('app-privacy', AppPrivacy);

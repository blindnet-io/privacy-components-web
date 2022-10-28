import { LitElement, html, css } from 'lit';
import { when } from 'lit/directives/when.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Auth0Client } from '@auth0/auth0-spa-js';

import '@blindnet/prci';

// Get an auth0 instance
const auth0 = new Auth0Client({
  domain: 'blindnet.eu.auth0.com',
  client_id: '1C0uhFCpzvJAkFi4uqoq2oAWSgQicqHc',
  redirect_uri: 'http://localhost:8000/demos/devkit-simple-tutorial/privacy',
  authorizationParams: {
    redirect_uri: 'http://localhost:8000/demos/devkit-simple-tutorial/privacy',
  },
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

  /**
   * Get a blindnet token given an auth0 ones
   * @param {string} auth0Token
   * @returns Promise<Response>
   */
  async getBlindnetToken(auth0Token) {
    const headers = {
      Authorization: `Bearer ${auth0Token}`,
    };

    return fetch(
      'https://blindnet-connector-demo-staging.azurewebsites.net/auth/token',
      {
        method: 'GET',
        headers,
      }
    );
  }

  handleLoginClick() {
    window.location.href = `${window.location.origin}/demos/devkit-simple-tutorial/login`;
  }

  handleLogoutClick() {
    auth0.logout();
  }

  render() {
    // Try to get an auth0 token
    auth0
      .getTokenSilently()
      .then(auth0Token => {
        // Get a blindnet token with our auth0 one
        this.getBlindnetToken(auth0Token).then(blindnetToken => {
          // Use this token for the PRCI
          this._apiToken = blindnetToken;
        });
        // Get user info
        auth0.getUser().then(user => {
          this._userData = user;
        });
      })
      .catch(() => {
        // If not logged in, do nothing as PRCI can be used unauthenticated
        this._apiToken = undefined;
      });

    return html`
      <bldn-priv-request
        data-categories='["contact", "name", "uid", "other-data"]'
        api-token=${ifDefined(this._apiToken)}
      ></bldn-priv-request>

      ${when(
        this._userData,
        () => html`
          <span>Logged in as ${this._userData?.email}.</span>
          <bldn-button @click=${this.handleLogoutClick} mode="link">
            Logout
          </bldn-button>
        `,
        () => html`
          <bldn-button @click=${this.handleLoginClick} mode="link">
            Login
          </bldn-button>
        `
      )}
    `;
  }
}

customElements.define('app-privacy', AppPrivacy);

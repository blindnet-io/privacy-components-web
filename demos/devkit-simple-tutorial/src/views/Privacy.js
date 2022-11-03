import { LitElement, html, css } from 'lit';
import { when } from 'lit/directives/when.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Auth0Client } from '@auth0/auth0-spa-js';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

import '@blindnet/prci';

// Get an auth0 instance
const auth0 = new Auth0Client({
  domain: 'blindnet.eu.auth0.com',
  client_id: '1C0uhFCpzvJAkFi4uqoq2oAWSgQicqHc',
  audience: 'https://blindnet-connector-demo-staging.azurewebsites.net',
  redirect_uri: `${window.location.origin}/demos/devkit-simple-tutorial/privacy`,
  authorizationParams: {
    redirect_uri: `${window.location.origin}/demos/devkit-simple-tutorial/privacy`,
  },
  languageDictionary: {
    title: 'Let us verify your e-mail',
    passwordlessEmailInstructions:
      'Enter the email associated<br/>with your data',
    signUpTerms:
      'By clicking SUMBIT, you give consent for processing your data (email) for the purposes of identifying you and processing your privacy request.',
    success: {
      logIn: 'Email verified.',
      magicLink: 'We sent you a link to verify<br />your e-mail at %s.',
    },
  },
  allowSignUp: false,
  passwordlessMethod: `link`,
});

export class AppPrivacy extends LitElement {
  static get properties() {
    return {
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
    if (this._apiToken === undefined) {
      auth0
        .getTokenSilently()
        .then(auth0Token => {
          // Exchange auth0 token for a blindnet one
          this.getBlindnetToken(auth0Token)
            .then(response => {
              response.json().then(blindnetToken => {
                this._apiToken = blindnetToken;
              });
            })
            .catch(error => {
              // eslint-disable-next-line no-console
              console.log(error);
            });
        })
        .catch(() => {
          // If not logged in, do nothing as PRCI can be used unauthenticated
        });
    }

    return html`
      <bldn-priv-request
        data-categories='["contact", "name", "uid", "other-data"]'
        api-token=${ifDefined(this._apiToken)}
      ></bldn-priv-request>

      ${when(
        this._apiToken,
        () => html`
          <span
            >Making a Privacy Request as
            ${
              // @ts-ignore
              jwt_decode(this._apiToken).uid
            }.</span
          >
          <bldn-button @click=${this.handleLogoutClick} mode="link">
            Change
          </bldn-button>
        `,
        () => html`
          <bldn-button @click=${this.handleLoginClick} mode="link">
            Verify your e-mail
          </bldn-button>
        `
      )}
    `;
  }
}

customElements.define('app-privacy', AppPrivacy);

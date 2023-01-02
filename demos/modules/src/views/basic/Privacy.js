/* eslint-disable lit/binding-positions */
import { LitElement, html, css } from 'lit';
import { when } from 'lit/directives/when.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Auth0Client } from '@auth0/auth0-spa-js';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

import '@blindnet/privacy-portal';

// Get an auth0 instance
const auth0 = new Auth0Client({
  domain: 'blindnet.eu.auth0.com',
  client_id: '1C0uhFCpzvJAkFi4uqoq2oAWSgQicqHc',
  audience: 'https://blindnet-connector-demo-staging.azurewebsites.net',
  redirect_uri: `${window.location.origin}/demos/modules/basic/privacy`,
  authorizationParams: {
    redirect_uri: `${window.location.origin}/demos/modules/basic/privacy`,
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
      _intervalId: { state: true },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 50px 100px;
        background: white;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.34),
          0px 0.500862px 1.50259px rgba(0, 0, 0, 0.17);
        border-radius: 20px;

        /* --bldn-background: 128, 128, 128; */
        /* --bldn-font-size-small: 2em; */
        /* --bldn-font-size-medium: 2.5em; */
        /* --bldn-font-size-large: 3em; */
        /* --bldn-font-family: cursive; */
      }

      @media (min-width: 1250px) {
        :host {
          width: 950px;
        }
      }

      bldn-privacy-portal {
        margin-bottom: 65px;
      }

      #additional-info-module {
        margin: 4em;
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
    window.location.href = `${window.location.origin}/demos/modules/basic/login`;
  }

  handleLogoutClick() {
    auth0.logout();
  }

  connectedCallback() {
    super.connectedCallback();

    // Auto click the refresh button every 3 seconds if it exists
    this._intervalId = setInterval(() => {
      const refreshButton = this.renderRoot
        .querySelector('bldn-privacy-portal')
        ?.shadowRoot?.querySelector('bldn-request-viewer')
        ?.shadowRoot?.querySelector('bldn-request-status')
        ?.shadowRoot?.querySelector('bldn-dropdown.main-section')
        ?.querySelector('#summary-heading')
        ?.querySelector('#refresh-request');
      refreshButton?.dispatchEvent(new Event('bldn-button:click'));
    }, 3000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Remove auto refresh click interval
    clearInterval(this._intervalId);
  }

  render() {
    // Handle redirect from login page
    const search = new URLSearchParams(window.location.search);
    if (search.has('code') && search.has('state')) {
      auth0.handleRedirectCallback();
    }

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
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
          // If not logged in, do nothing as PRCI can be used unauthenticated
        });
    }

    return html`
      <bldn-privacy-portal
        computation-base-url="https://computing.blindnet.io/v0/"
        data-categories='["contact", "name", "uid", "other-data"]'
        api-token=${ifDefined(this._apiToken)}
      >
      </bldn-privacy-portal>

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

customElements.define('basic-demo-privacy', AppPrivacy);

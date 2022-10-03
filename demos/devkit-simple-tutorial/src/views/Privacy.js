import { LitElement, html, css } from 'lit';

import '@blindnet/prci';

import { Magic } from 'magic-sdk';
import { when } from 'lit/directives/when.js';

const magicPublicKey = 'pk_live_7BFA1BB7D19A6FD9'
const magic = new Magic(magicPublicKey);

export class AppPrivacy extends LitElement {

  static get properties() {
    return {
      _userData: { type: Object, state: true }
    }
  }

  static get styles() {
    return css``;
  }

  handleLogoutClick() {
    magic.user.logout().then(() => this.requestUpdate())
  }

  render() {

    // Complete magic auth flow after redirect from login page
    if (magic) {
      const url = new URL(window.location.href);
      if (url.searchParams.has('magic_credential')) {
        magic.auth.loginWithCredential().then(r => {
          // Get info on the logged in user
          magic.user.getMetadata().then(userData => {
            this._userData = userData
          })
        })
      } else {
        magic.user.isLoggedIn().then(isLogged => {
          if (isLogged) {
            magic.user.getMetadata().then(userData => {
              this._userData = userData
            })
          } else {
            console.log('Not logged in!')
            window.location.href = `${window.location.origin}/demos/devkit-simple-tutorial/login`
          }
        })
      }
    }

    // FIXME: Must configure computation-api.ts to actually use this api-token once CORS issue is resolved
    return html`
      ${when(this._userData, () => html`
        <bldn-priv-request
          data-categories='["contact", "name", "uid", "other-data"]'
          api-token=${this._userData.email}
        ></bldn-priv-request>
        <span>Logged in as ${this._userData.email}. <bldn-button mode='link' @bldn-button:click=${this.handleLogoutClick}>Logout</bldn-button></span>
      `)}
    `
  }
}

customElements.define('app-privacy', AppPrivacy);

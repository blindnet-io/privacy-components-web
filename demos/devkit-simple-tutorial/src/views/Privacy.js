import { LitElement, html, css } from 'lit';

import '@blindnet/prci';

import { Magic } from 'magic-sdk';
import { choose } from 'lit/directives/choose.js';

const magicPublicKey = 'pk_live_7BFA1BB7D19A6FD9';
const magic = new Magic(magicPublicKey);

export class AppPrivacy extends LitElement {
  static get properties() {
    return {
      _isLoggedIn: { type: Boolean, state: true },
      _userData: { state: true },
    };
  }

  static get styles() {
    return css`
      :host {
        margin-top: 50px;
      }
    `;
  }

  handleLoginClick() {
    window.location.href = `${window.location.origin}/demos/devkit-simple-tutorial/login`;
  }

  handleLogoutClick() {
    magic.user.logout().then(() => {
      this._userData = false;
    });
  }

  render() {
    // Complete magic auth flow after redirect from login page
    if (magic) {
      const url = new URL(window.location.href);
      if (url.searchParams.has('magic_credential')) {
        magic.auth
          .loginWithCredential()
          .then(() => {
            this._isLoggedIn = true;
            // Get info on the logged in user
            magic.user.getMetadata().then(userData => {
              this._userData = userData;
            });
          })
          .catch(e => {
            // eslint-disable-next-line no-console
            console.log(e);
          });
      } else if (this._userData === undefined) {
        magic.user
          .isLoggedIn()
          .then(isLogged => {
            if (isLogged) {
              magic.user.getMetadata().then(userData => {
                this._userData = userData;
              });
            } else {
              this._userData = false;
            }
          })
          .catch(e => {
            // eslint-disable-next-line no-console
            console.log(e);
          });
      }
    }

    // FIXME: Must configure computation-api.ts to actually use this api-token once CORS issue is resolved
    return html`
      <bldn-priv-request
        data-categories='["contact", "name", "uid", "other-data"]'
        api-token=${this._userData
          ? this._userData.email
          : 'john.doe@example.com'}
      ></bldn-priv-request>
      <p>
        ${choose(
          this._userData,
          [
            [undefined, () => html` Getting user data... `],
            [
              false,
              () => html`
                Not logged in.<bldn-button
                  mode="link"
                  @bldn-button:click=${this.handleLoginClick}
                  >Login</bldn-button
                >
              `,
            ],
          ],
          () => html`
            Logged in as ${this._userData.email}.
            <bldn-button
              mode="link"
              @bldn-button:click=${this.handleLogoutClick}
              >Logout</bldn-button
            >
          `
        )}
      </p>
    `;
  }
}

customElements.define('app-privacy', AppPrivacy);

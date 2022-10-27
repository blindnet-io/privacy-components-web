import { LitElement, html, css } from 'lit';

import { choose } from 'lit/directives/choose.js';
import '@blindnet/prci'

import { Auth0Client } from '@auth0/auth0-spa-js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';

const auth0 = new Auth0Client({
  domain: 'dev-h7hjew-e.us.auth0.com',
  client_id: '1j68DJxHXTgTj7OE3QIgiBpO7J21pVQm',
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

  handleLoginClick() {
    window.location.href = `${window.location.origin}/demos/devkit-simple-tutorial/login`;
  }

  // handleLogoutClick() {
  //   magic.user.logout().then(() => {
  //     this._userData = false;
  //   });
  // }

  firstUpdated() {

  }

  render() {

    auth0.getTokenSilently()
      .then(token => {
        // apiToken = token
        auth0.getUser().then(user => {
          console.log(user)
          console.log('setting')
          this._userData = user
        })
      })
      .catch(() => {
        // If not logged in, do nothing as PRCI can be used without user
      })

    console.log(this._userData)

    return html`
      
      <bldn-priv-request
        data-categories='["contact", "name", "uid", "other-data"]'
        api-token=${ifDefined(this._apiToken)}
      ></bldn-priv-request>
      ${when(this._userData !== undefined, () => html`
        <bldn-button
          @click=${() => auth0.logout()}
        >
          Logout
        </bldn-button>
      `, () => html`
        <bldn-button
          @click=${this.handleLoginClick}
        >
          Login
        </bldn-button>
      `)}
      

    `
  }

  // render() {
  //   // Complete magic auth flow after redirect from login page
  //   if (magic) {
  //     const url = new URL(window.location.href);
  //     if (url.searchParams.has('magic_credential')) {
  //       magic.auth
  //         .loginWithCredential()
  //         .then(() => {
  //           this._isLoggedIn = true;
  //           // Get info on the logged in user
  //           magic.user.getMetadata().then(userData => {
  //             this._userData = userData;
  //           });
  //         })
  //         .catch(e => {
  //           // eslint-disable-next-line no-console
  //           console.log(e);
  //         });
  //     } else if (this._userData === undefined) {
  //       magic.user
  //         .isLoggedIn()
  //         .then(isLogged => {
  //           if (isLogged) {
  //             magic.user.getMetadata().then(userData => {
  //               this._userData = userData;
  //             });
  //           } else {
  //             this._userData = false;
  //           }
  //         })
  //         .catch(e => {
  //           // eslint-disable-next-line no-console
  //           console.log(e);
  //         });
  //     }
  //   }

  //   // FIXME: Must configure computation-api.ts to actually use this api-token once CORS issue is resolved
  //   return html`
  //     <bldn-priv-request
  //       data-categories='["contact", "name", "uid", "other-data"]'
  //       api-token=${this._userData
  //         ? this._userData.email
  //         : 'john.doe@example.com'}
  //     ></bldn-priv-request>
  //     <span>
  //       ${choose(
  //         this._userData,
  //         [
  //           [undefined, () => html` Getting user data... `],
  //           [
  //             false,
  //             () => html`
  //               Not logged in.<bldn-button
  //                 mode="link"
  //                 @bldn-button:click=${this.handleLoginClick}
  //                 >Login</bldn-button
  //               >
  //             `,
  //           ],
  //         ],
  //         () => html`
  //           Logged in as ${this._userData.email}.
  //           <bldn-button
  //             mode="link"
  //             @bldn-button:click=${this.handleLogoutClick}
  //             >Logout</bldn-button
  //           >
  //         `
  //       )}
  //     </span>
  //   `;
  // }
}

customElements.define('app-privacy', AppPrivacy);

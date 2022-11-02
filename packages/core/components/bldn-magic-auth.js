import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { Magic } from 'magic-sdk';

const bldnLogoSvg = new URL(new URL('../assets/bldn-logo.svg', import.meta.url).href, import.meta.url)
    .href;
let BldnMagicAuth = class BldnMagicAuth extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * @prop {string} prompt Text to display above the email input
         * @example Welcome to MyApplication!
         */
        this.prompt = '';
        this._isLoggedIn = false;
        this._email = '';
        this._requireEmail = false;
    }
    handleSubmit() {
        if (this._email) {
            this._magic.auth.loginWithMagicLink({
                email: this._email,
                redirectURI: this.redirectUri,
            })
                // eslint-disable-next-line no-console
                .catch((e) => console.log(e));
        }
        else {
            this._requireEmail = true;
        }
    }
    handleLogout() {
        this._magic.user.logout().then(() => {
            this._isLoggedIn = false;
        });
    }
    handleMagicPubKeyChange() {
        if (this.magicPubKey) {
            this._magic = new Magic(this.magicPubKey); // Get a new Magic instant if publishable key changes
            // Check if a user is logged in
            this._magic.user.isLoggedIn().then((isLogged) => {
                this._isLoggedIn = isLogged;
            });
        }
    }
    handleLoggedInChange() {
        if (this._magic) {
            // Get details for logged in user
            this._magic.user.getMetadata().then((data) => {
                this._loggedInUser = data;
            });
        }
    }
    handleEmailChange(e) {
        this._email = e.detail;
        if (this._requireEmail) {
            this._requireEmail = false;
        }
    }
    willUpdate(_changedProperties) {
        if (_changedProperties.has('magicPubKey'))
            this.handleMagicPubKeyChange();
        if (_changedProperties.has('_isLoggedIn') && this._isLoggedIn)
            this.handleLoggedInChange();
    }
    render() {
        return html `
      <div>
        <img src=${bldnLogoSvg} alt="blindnet-logo" />
        ${when(this._magic, () => html `
            ${when(this._isLoggedIn && this._loggedInUser, () => {
            var _a;
            window.location.replace((_a = this.redirectUri) !== null && _a !== void 0 ? _a : window.location.toString());
        }, () => html `
                ${when(this.prompt, () => html ` <span><b>${this.prompt}</b></span> `)}
                <bldn-input
                  mode=${this._requireEmail ? 'error' : 'default'}
                  type="email"
                  name="email"
                  placeholder="Email address"
                  @bldn-input:input=${this.handleEmailChange}
                ></bldn-input>
                <bldn-button type="submit" @click=${this.handleSubmit}
                  >${msg('Log in / Sign up')}</bldn-button
                >
              `)}
          `, () => {
            throw TypeError('You must provide a valid magic publishable API key via the magic-pub-key attribute.');
        })}
      </div>
    `;
    }
};
BldnMagicAuth.styles = css `
    :host {
      max-width: 500px;
      color: var(--color-dark);
      --bldn-button-border-radius: 20px;
    }

    div {
      background: blue;
      display: flex;
      flex-direction: column;
      justify-content: center;
      row-gap: 40px;
      padding: 60px 100px;
      background: #ffffff;
      box-shadow: 0px 33px 77px rgba(0, 0, 0, 0.16),
        0px 9.94853px 23.2132px rgba(0, 0, 0, 0.104254),
        0px 4.13211px 9.64159px rgba(0, 0, 0, 0.08),
        0px 1.4945px 3.48718px rgba(0, 0, 0, 0.0557458);
      border-radius: 10px;
    }

    span {
      margin: 0px;
      max-width: 300px;
      font-size: 20px;
    }
  `;
__decorate([
    property({ type: String, attribute: 'magic-pub-key' })
], BldnMagicAuth.prototype, "magicPubKey", void 0);
__decorate([
    property({ type: String, attribute: 'prompt' })
], BldnMagicAuth.prototype, "prompt", void 0);
__decorate([
    property({ type: String, attribute: 'redirect-uri' })
], BldnMagicAuth.prototype, "redirectUri", void 0);
__decorate([
    state()
], BldnMagicAuth.prototype, "_magic", void 0);
__decorate([
    state()
], BldnMagicAuth.prototype, "_isLoggedIn", void 0);
__decorate([
    state()
], BldnMagicAuth.prototype, "_loggedInUser", void 0);
__decorate([
    state()
], BldnMagicAuth.prototype, "_email", void 0);
__decorate([
    state()
], BldnMagicAuth.prototype, "_requireEmail", void 0);
BldnMagicAuth = __decorate([
    customElement('bldn-magic-auth')
], BldnMagicAuth);

export { BldnMagicAuth };
//# sourceMappingURL=bldn-magic-auth.js.map

import { msg } from '@lit/localize';
import { css, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import { Magic, MagicUserMetadata } from 'magic-sdk';

const bldnLogoSvg = new URL('./../assets/icons/bldn-logo.svg', import.meta.url)
  .href;

@customElement('bldn-auth')
export class BldnAuth extends LitElement {
  /**
   * @prop {string} magicPubKey Publishable api key for a magic auth application
   * See https://magic.link/auth for details
   * @example pk_live_2BDA1CB7D23A6XF9
   */
  @property({ type: String, attribute: 'magic-pub-key' }) magicPubKey:
    | undefined
    | string;

  /**
   * @prop {string} prompt Text to display above the email input
   * @example Welcome to MyApplication!
   */
  @property({ type: String, attribute: 'prompt' }) prompt: string = '';

  /**
   * @prop {undefined | string} redirectURI URI to redirect to after a successful auth flow
   * @example http://localhost:8000/myAppPage
   */
  @property({ type: String, attribute: 'redirect-uri' }) redirectUri:
    | undefined
    | string;

  @state() private _magic: undefined | Magic;

  @state() private _isLoggedIn: boolean = false;

  @state() private _loggedInUser: undefined | MagicUserMetadata;

  @state() private _email: string = '';

  @state() private _requireEmail: boolean = false;

  handleSubmit() {
    if (this._email) {
      this._magic!.auth.loginWithMagicLink({
        email: this._email,
        redirectURI: this.redirectUri,
      })
        // eslint-disable-next-line no-console
        .catch((e: Error) => console.log(e));
    } else {
      this._requireEmail = true;
    }
  }

  handleLogout() {
    this._magic!.user.logout().then(() => {
      this._isLoggedIn = false;
    });
  }

  handleMagicPubKeyChange() {
    if (this.magicPubKey) {
      this._magic = new Magic(this.magicPubKey); // Get a new Magic instant if publishable key changes
      // Check if a user is logged in
      this._magic.user.isLoggedIn().then((isLogged: boolean) => {
        this._isLoggedIn = isLogged;
      });
    }
  }

  handleLoggedInChange() {
    if (this._magic) {
      // Get details for logged in user
      this._magic!.user.getMetadata().then((data: MagicUserMetadata) => {
        this._loggedInUser = data;
      });
    }
  }

  handleEmailChange(e: CustomEvent<string>) {
    this._email = e.detail;
    if (this._requireEmail) {
      this._requireEmail = false;
    }
  }

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has('magicPubKey')) this.handleMagicPubKeyChange();
    if (_changedProperties.has('_isLoggedIn') && this._isLoggedIn)
      this.handleLoggedInChange();
  }

  render() {
        
    return html`BLDN AUTH COMPONENT
      <div>
        <img src=${bldnLogoSvg} alt="blindnet-logo" />
        ${when(
          this._magic,
          () => html`
            ${when(
              this._isLoggedIn && this._loggedInUser,
              () => {
                window.location.replace(
                  this.redirectUri ?? window.location.toString()
                );
              },
              () => html`
                ${when(
                  this.prompt,
                  () => html` <span><b>${this.prompt}</b></span> `
                )}
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
              `
            )}
          `,
          () => {
            throw TypeError(
              'You must provide a valid magic publishable API key via the magic-pub-key attribute.'
            );
          }
        )}
      </div>
    `;
  }

  static styles = css`
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
}

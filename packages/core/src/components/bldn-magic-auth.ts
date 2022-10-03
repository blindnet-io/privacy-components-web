import { html, LitElement, PropertyValueMap } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { when } from "lit/directives/when.js";

import { Magic, MagicUserMetadata } from 'magic-sdk';

@customElement('bldn-magic-auth')
export class BldnMagicAuth extends LitElement {
  
  @property({ type: String, attribute: 'magic-pub-key' }) magicPubKey: undefined | string;

  @state() private _magic: undefined | Magic;

  @state() private _isLoggedIn: boolean = false;

  @state() private _loggedInUser: undefined | MagicUserMetadata

  handleSubmit(e: Event) {
    e.preventDefault()
    const email = new FormData(e.target as HTMLFormElement).get("email");
    if (email) {
      this._magic!.auth.loginWithMagicLink({ email: email as string })
    }
    return false
  }

  handleMagicPubKeyChange() {
    if (this.magicPubKey) {
      this._magic = new Magic(this.magicPubKey)
      // Check if a user is logged in
      this._magic.user.isLoggedIn().then((isLogged: boolean) => {
        this._isLoggedIn = isLogged
      })
    }
  }

  handleLoggedInChange() {
    if (this._magic) {
      // Get details for logged in user
      this._magic!.user.getMetadata().then((data: MagicUserMetadata) => {
        this._loggedInUser = data
        console.log(this._loggedInUser)
      })
    }
  }

  protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('magicPubKey')) this.handleMagicPubKeyChange()
    if (_changedProperties.has('_isLoggedIn') && this._isLoggedIn) this.handleLoggedInChange()
  }

  render() {

    return html`
      ${when(this._magic, () => html`
        ${when(this._isLoggedIn && this._loggedInUser, () => html`
          Currently logged in as: ${this._loggedInUser!.email}
        `, () => html`
          <form @submit=${this.handleSubmit}>
            <input type="email" name="email" required placeholder="Enter your email" />
            <button type="submit">Send</button>
          </form>
        `)}
      `, () => {throw TypeError('You must provide a valid magic publishable API key via the magic-pub-key attribute.')}
      )}
    `
  }

}
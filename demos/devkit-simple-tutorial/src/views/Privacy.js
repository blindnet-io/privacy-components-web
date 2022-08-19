import { LitElement, html, css } from 'lit';

import '@blindnet/prci';

export class AppPrivacy extends LitElement {
  static get styles() {
    return css``;
  }

  render() {
    return html`<bldn-priv-request></bldn-priv-request>`;
  }
}

customElements.define('app-privacy', AppPrivacy);

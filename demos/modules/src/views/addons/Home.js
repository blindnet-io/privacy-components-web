/* eslint-disable lit-a11y/click-events-have-key-events */
import { Router } from '@vaadin/router';
import { LitElement, html, css } from 'lit';

const logo = new URL('../../../assets/blindnet-logo.png', import.meta.url).href;

export class AppHome extends LitElement {
  static get properties() {
    return {
      title: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        font-size: calc(10px + 2vmin);
      }
      .logo {
        margin-top: 36px;
      }
      .logo img {
        max-height: 244px;
        max-width: 100%;
      }

      span {
        color: -webkit-link;
        text-decoration: underline;
        cursor: pointer;
      }
    `;
  }

  constructor() {
    super();
    this.title = 'Addons Demo';
  }

  render() {
    return html`
      <div class="logo"><img alt="blindnet logo" src=${logo} /></div>
      <h1>${this.title}</h1>

      <p>
        Check out
        <a
          class="app-link"
          href="https://github.com/blindnet-io/privacy-components-web/tree/main/demos/modules"
          target="_blank"
          rel="noopener noreferrer"
        >
          this project on GitHub
        </a>
        for details and instructions.
      </p>

      <p>
        🚀
        <span
          class="app-link"
          @click=${() =>
            Router.go(`${window.location.origin}/demos/modules/addons/privacy`)}
          >Make a privacy request.</span
        >
      </p>
    `;
  }
}

customElements.define('addons-demo-home', AppHome);

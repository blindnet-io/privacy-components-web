import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import 'carbon-web-components/es/components/ui-shell/index.js';
import './views/Home.js';

export class DevkitSimpleTutorial extends LitElement {
  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
        background-color: var(--devkit-simple-tutorial-background-color);
      }

      bx-header ~ bx-side-nav {
        margin-top: 3.1rem;
        height: calc(100% - 3.1rem);
      }

      main {
        flex-grow: 1;
        margin-top: 3rem;
        padding: 1rem;
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a {
        margin-left: 5px;
      }
    `;
  }

  firstUpdated() {
    const outlet = this.renderRoot.querySelector('#router-outlet');
    const router = new Router(outlet);
    router.setRoutes([
      { path: '/', component: 'app-home' },
      {
        path: '/privacy',
        action: async () => {
          await import('./views/Privacy.js');
        },
        component: 'app-privacy',
      },
      {
        path: '/backoffice',
        action: async () => {
          await import('./views/BackOffice.js');
        },
        component: 'app-backoffice',
      },
      {
        path: '/admin',
        action: async () => {
          await import('./views/DCI.js');
        },
        component: 'app-dci',
      },
      {
        path: '/participate',
        action: async () => {
          await import('./views/Form.js');
        },
        component: 'app-form',
      },
    ]);
  }

  render() {
    return html`
      <bx-header aria-label="blindnet devkit simple tutorial">
        <bx-header-menu-button
          button-label-active="Close menu"
          button-label-inactive="Open menu"
        ></bx-header-menu-button>
        <bx-header-name href="/" prefix="blindnet devkit"
          >tutorial</bx-header-name
        >
        <bx-header-nav menu-bar-label="blindnet devkit tutorial">
          <bx-header-nav-item href="/participate">Prizes</bx-header-nav-item>
          <bx-header-nav-item href="/privacy">Privacy</bx-header-nav-item>
          <bx-header-nav-item href="/backoffice"
            >Back Office</bx-header-nav-item
          >
        </bx-header-nav>
      </bx-header>
      <bx-side-nav aria-label="Side navigation">
        <bx-side-nav-items>
          <bx-side-nav-link href="/">Home</bx-side-nav-link>
          <bx-side-nav-link href="/participate">Prizes</bx-side-nav-link>
          <bx-side-nav-link href="/privacy">Privacy</bx-side-nav-link>
          <bx-side-nav-link href="/backoffice">Back Office</bx-side-nav-link>
        </bx-side-nav-items>
      </bx-side-nav>
      <main>
        <div id="router-outlet"></div>
      </main>

      <p class="app-footer">
        🖤 Made with love by
        <a target="_blank" rel="noopener noreferrer" href="https://blindnet.dev"
          >blindnet</a
        >
        with
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/open-wc"
          >open-wc</a
        >,
        <a target="_blank" rel="noopener noreferrer" href="https://vaadin.com/"
          >Vaadin</a
        >
        and
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/carbon-design-system/carbon-web-components"
          >Carbon Web Components</a
        >.
      </p>
    `;
  }
}

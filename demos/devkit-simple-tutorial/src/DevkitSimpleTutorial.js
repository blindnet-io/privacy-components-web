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
        justify-content: center;
        color: #1f1f1f;
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
        margin-left: 256px;
      }

      .app-footer a {
        margin-left: 5px;
      }

      @media (min-width: 1056px) {
        main {
          margin-left: 16rem;
        }
      }
    `;
  }

  firstUpdated() {
    const outlet = this.renderRoot.querySelector('#router-outlet');
    const router = new Router(outlet);
    router.setRoutes([
      { path: '/', component: 'app-home' },
      {
        path: '/login',
        action: async () => {
          await import('./views/Login.js');
        },
        component: 'app-login',
      },
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
      {
        path: '',
        redirect: '/',
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
        <bx-header-name href="./" prefix="blindnet devkit"
          >tutorial</bx-header-name
        >
        <bx-header-nav menu-bar-label="blindnet devkit tutorial">
          <bx-header-nav-item href="./participate"
            >Submit an entry</bx-header-nav-item
          >
          <bx-header-nav-item href="./privacy"
            >Submit a privacy request</bx-header-nav-item
          >
          <bx-header-nav-item href="./backoffice"
            >Back office management</bx-header-nav-item
          >
        </bx-header-nav>
      </bx-header>
      <bx-side-nav aria-label="Side navigation" collapseMode="fixed">
        <bx-side-nav-items>
          <bx-side-nav-link href="./">Home</bx-side-nav-link>
          <bx-side-nav-link href="./participate"
            >Submit an entry</bx-side-nav-link
          >
          <bx-side-nav-link href="./privacy"
            >Submit a privacy request</bx-side-nav-link
          >
          <bx-side-nav-link href="./backoffice"
            >Back office management</bx-side-nav-link
          >
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

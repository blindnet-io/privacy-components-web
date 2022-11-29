import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import 'carbon-web-components/es/components/ui-shell/index.js';
import { choose } from 'lit/directives/choose.js';

const ModuleDemo = {
  basic: 'basic',
  addons: 'addons',
};

export class ModulesDemo extends LitElement {
  static properties = {
    selectedDemo: {},
  };

  constructor() {
    super();
    this.selectedDemo = ModuleDemo.basic;
  }

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
      {
        path: '/basic',
        action: async () => {
          await import('./views/basic/Home.js');
        },
        component: 'basic-demo-home',
      },
      {
        path: '/basic/login',
        action: async () => {
          await import('./views/basic/Login.js');
        },
        component: 'basic-demo-login',
      },
      {
        path: '/basic/privacy',
        action: async () => {
          await import('./views/basic/Privacy.js');
        },
        component: 'basic-demo-privacy',
      },
      {
        path: '/basic/backoffice',
        action: async () => {
          await import('./views/basic/BackOffice.js');
        },
        component: 'basic-demo-backoffice',
      },
      {
        path: '/basic/admin',
        action: async () => {
          await import('./views/basic/DCI.js');
        },
        component: 'basic-demo-dci',
      },
      {
        path: '/basic/participate',
        action: async () => {
          await import('./views/basic/Form.js');
        },
        component: 'basic-demo-form',
      },
      {
        path: '/addons',
        action: async () => {
          await import('./views/addons/Home.js');
        },
        component: 'addons-demo-home',
      },
      {
        path: '/addons/login',
        action: async () => {
          await import('./views/addons/Login.js');
        },
        component: 'addons-demo-login',
      },
      {
        path: '/addons/privacy',
        action: async () => {
          await import('./views/addons/Privacy.js');
        },
        component: 'addons-demo-privacy',
      },
      {
        path: '/addons/backoffice',
        action: async () => {
          await import('./views/addons/BackOffice.js');
        },
        component: 'addons-demo-backoffice',
      },
      {
        path: '/addons/admin',
        action: async () => {
          await import('./views/addons/DCI.js');
        },
        component: 'addons-demo-dci',
      },
      {
        path: '/addons/participate',
        action: async () => {
          await import('./views/addons/Form.js');
        },
        component: 'addons-demo-form',
      },
      {
        path: '',
        redirect: '/',
      },
    ]);
  }

  willUpdate(changedProperties) {
    window.history.replaceState(
      null,
      null,
      `${window.location.origin}/demos/modules/${this.selectedDemo}`
    );
    Router.go(`${window.location.origin}/demos/modules/${this.selectedDemo}`);
  }

  render() {
    return html`
      <bx-header aria-label="Demos">
        <bx-header-menu menu-label='Choose a Demo' trigger-content="Choose a Demo">
          <bx-header-menu-item title="Basic" @click=${() => {
            this.selectedDemo = ModuleDemo.basic;
          }}></bx-header-menu-item>
          <bx-header-menu-item title="Addons" @click=${() => {
            this.selectedDemo = ModuleDemo.addons;
          }}></bx-header-menu-item>
        </bx-header-menu>
          ${choose(this.selectedDemo, [
            [
              ModuleDemo.basic,
              () => html`
                <bx-header-nav-item href="./basic/participate"
                  >Submit an entry</bx-header-nav-item
                >
                <bx-header-nav-item href="./basic/privacy"
                  >Submit a privacy request</bx-header-nav-item
                >
                <bx-header-nav-item href="./basic/backoffice"
                  >Back office management</bx-header-nav-item
                >
              `,
            ],
            [
              ModuleDemo.addons,
              () => html`
                <bx-header-nav-item href="./addons/participate"
                  >Submit an entry</bx-header-nav-item
                >
                <bx-header-nav-item href="./addons/privacy"
                  >Submit a privacy request</bx-header-nav-item
                >
                <bx-header-nav-item href="./addons/backoffice"
                  >Back office management</bx-header-nav-item
                >
              `,
            ],
          ])}
        </bx-header-nav>
      </bx-header>
      
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

customElements.define('modules-demo', ModulesDemo);

import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';

export class AppBackOffice extends LitElement {
  static get properties() {
    return {
      _username: { state: true },
      _password: { state: true },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 40vw;
        padding: 50px 100px;
        background: white;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.34),
          0px 0.500862px 1.50259px rgba(0, 0, 0, 0.17);
        border-radius: 20px;
      }

      h1 {
        margin-top: 0;
      }
    `;
  }

  showDCI() {
    // Vaadin Router doesn't handle baseUrl propertly here
    // TODO: report issue to Vaadin
    // alternatively, we could use a popstate event
    const baseURL = document.querySelector('base')?.href || '/';
    const routed = Router.go(`${baseURL}admin`);
    if (!routed) {
      // eslint-disable-next-line no-console
      console.error('admin route not found');
    }
  }

  /**
   * Get an blindnet admin token given a username and password
   */
  async getBlindnetAdminToken(username, password) {
    return fetch(
      'https://blindnet-connector-demo-staging.azurewebsites.net/auth/admin/token',
      {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
      }
    ).then(response => response.json());
  }

  handleLoginClick() {
    this.getBlindnetAdminToken(this._username, this._password).then(
      adminToken => {
        localStorage.setItem('dci_admin_token', adminToken);
        // console.log(response)
        this.showDCI();
      }
    );
  }

  /**
   *
   * @param {Event} e
   */
  handleUsernameChange(e) {
    // @ts-ignore
    this._username = e.target.value;
  }

  /**
   *
   * @param {Event} e
   */
  handlePasswordChange(e) {
    // @ts-ignore
    this._password = e.target.value;
  }

  connectedCallback() {
    super.connectedCallback();
    localStorage.removeItem('dci_admin_token');
  }

  render() {
    return html`
      <h1>Back Office</h1>
      <input
        @change=${this.handleUsernameChange}
        type="text"
        placeholder="username"
      />
      <input
        @change=${this.handlePasswordChange}
        type="password"
        placeholder="password"
      />
      <button @click=${this.handleLoginClick}>Login</button>
    `;
  }
}

customElements.define('basic-demo-backoffice', AppBackOffice);

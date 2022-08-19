import { LitElement, html, css } from 'lit';
import 'carbon-web-components/es/components/form/index.js';
import 'carbon-web-components/es/components/input/index.js';
import 'carbon-web-components/es/components/button/button.js';
import 'carbon-web-components/es/components/file-uploader/index.js';
import 'carbon-web-components/es/components/notification/inline-notification.js';

export class AppParticipateForm extends LitElement {
  static get properties() {
    return {
      pristine: { type: Boolean, state: true },
    };
  }

  // TODO: way too much getters, use states instead

  /** @type {HTMLFormElement} */
  get _form() {
    // @ts-ignore
    return this.renderRoot?.querySelector('#form-participate') ?? null;
  }

  /** @type {HTMLButtonElement} */
  get _btnSubmit() {
    // @ts-ignore
    return this.renderRoot?.querySelector('#btn-submit') ?? null;
  }

  /** @type {HTMLButtonElement} */
  get _btnReset() {
    // @ts-ignore
    return this.renderRoot?.querySelector('#btn-reset') ?? null;
  }

  /** @type {any} */
  get _inputFirstName() {
    return this.renderRoot?.querySelector('#input-firstname') ?? null;
  }

  /** @type {any} */
  get _inputLastName() {
    return this.renderRoot?.querySelector('#input-lastname') ?? null;
  }

  /** @type {any} */
  get _inputEmail() {
    return this.renderRoot?.querySelector('#input-email') ?? null;
  }

  /** @type {any} */
  get _inputFileUpload() {
    return this.renderRoot?.querySelector('#input-file-upload') ?? null;
  }

  /** @type {any} */
  get _notificationError() {
    return this.renderRoot?.querySelector('#notification-error') ?? null;
  }

  /** @type {any} */
  get _notificationSuccess() {
    return this.renderRoot?.querySelector('#notification-success') ?? null;
  }

  constructor() {
    super();
    this.pristine = true;
  }

  firstUpdated() {
    this._notificationError.open = false;
    this._notificationSuccess.open = false;
  }

  static get styles() {
    return css`
      form {
        width: 640px;
        padding: 2rem;
      }

      bx-btn + bx-btn {
        margin: 0 1rem;
      }

      bx-form-item,
      bx-inline-notification {
        margin-bottom: 2rem;
        align-items: center;
      }

      .btn-container {
        display: flex;
        align-items: center;
      }
    `;
  }

  /**
   * @param {FormData} formData
   */
  async saveDataToServer(formData) {
    // Simulates server latency
    // TODO: POST to the demo storage service instead, and manage errors via handleServerErrors
    // `await fetch('https://your.server/path/to/the/endpoint', { method: 'POST', body: formData })`
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(formData);
      }, 500)
    );
    this.handleServerErrors();
  }

  handleServerErrors() {
    // Example of error handling:

    // const username = formData.get('username');
    //
    // if (!username) {
    //   throw Object.assign(new Error('Login failed'), {
    //     errors: {
    //       username: 'User does not exist',
    //     },
    //   });
    // } else if (!['john', 'anne'].includes(username)) {
    //   throw Object.assign(new Error('Login failed'), {
    //     errors: {
    //       username: 'Wrong user name (Has to be john or anne)',
    //     },
    //   });
    // } else if (formData.get('password') !== 'form') {
    //   throw Object.assign(new Error('Login failed'), {
    //     errors: {
    //       password: 'Wrong password (Has to be the name of the parent directory of this example directory)',
    //     },
    //   });
    // } else {
    this._notificationSuccess.open = true;
    // }
  }

  /**
   * @param {boolean} value
   */
  setPristine(value) {
    this.pristine = value;
    // @ts-ignore
    this._btnReset.disabled = Boolean(this.pristine);
  }

  /**
   * @param {boolean} value
   */
  setSubmitting(value) {
    if (
      !this._inputFirstName ||
      !this._inputLastName ||
      !this._inputEmail ||
      !this._inputFileUpload
    ) {
      throw new Error('web component incorrectly initialized');
    }
    this._inputFirstName.disabled = value;
    this._inputLastName.disabled = value;
    this._inputEmail.disabled = value;
    this._inputFileUpload.disabled = value;
    this._btnSubmit.disabled = value;
    // @ts-ignore
    this._btnReset.disabled = value || this.pristine;
  }

  /**
   *
   * @param {*} errors
   */
  setValidity(errors = {}) {
    this._notificationError.open = 'email' in errors || 'password' in errors;
    this._inputFirstName.invalid = 'firstname' in errors;
    this._inputLastName.validityMessage = errors.username;
    this._inputEmail.invalid = 'email' in errors;
  }

  async submit() {
    if (!this._form) {
      throw new Error('web component incorrectly initialized');
    }
    const formData = new FormData(this._form);

    try {
      await this.saveDataToServer(formData);
      this.setSubmitting(true);
      this.setValidity();
    } catch ({ errors }) {
      this.setValidity(errors);
    } finally {
      this.setSubmitting(false);
    }
  }

  reset() {
    [this._notificationError.open, this._notificationSuccess.open].forEach(
      el => {
        // eslint-disable-next-line no-param-reassign
        el.open = false;
      }
    );

    [this._inputFirstName, this._inputLastName, this._inputEmail].forEach(
      input => {
        /* eslint-disable no-param-reassign */
        input.invalid = false;
        input.value = '';
        /* eslint-enable no-param-reassign */
      }
    );
    this.setPristine(true);
  }

  render() {
    return html`
      <h1>Take part in our prize draw!</h1>

      <form id="form-participate">
        <bx-inline-notification
          id="notification-error"
          kind="error"
          hide-close-button
          title="Submition failed"
          subtitle="Please correct below errors."
        ></bx-inline-notification>

        <bx-inline-notification
          id="notification-success"
          kind="success"
          title="Participation recorded!"
        ></bx-inline-notification>

        <bx-form-item>
          <bx-input
            id="input-firstname"
            @input=${() => {
              this.setPristine(false);
            }}
          >
            <span slot="label-text">First Name</span>
            <span slot="validity-message">Something isn't right</span>
          </bx-input>
          <bx-input
            id="input-lastname"
            @input=${() => {
              this.setPristine(false);
            }}
          >
            <span slot="label-text">Last Name</span>
            <span slot="validity-message">Something isn't right</span>
          </bx-input>
        </bx-form-item>
        <bx-form-item>
          <bx-input
            type="email"
            id="input-email"
            @input=${() => {
              this.setPristine(false);
            }}
          >
            <span slot="label-text">Email</span>
            <span slot="validity-message">Something isn't right</span>
          </bx-input>
        </bx-form-item>
        <bx-form-item>
          <bx-file-uploader
            helper-text="Only .jpg, .png or .pdf files."
            label-text="Proof of purchase"
            id="input-file-upload"
            @input=${() => {
              this.setPristine(false);
            }}
          >
            <bx-file-drop-container
              accept="image/jpeg image/png application/pdf"
              ?multiple=${false}
            >
              Drag and drop a file here or click to upload
            </bx-file-drop-container>
          </bx-file-uploader>
        </bx-form-item>
        <div className="btn-container">
          <bx-btn id="btn-submit" @click=${this.submit}>Submit</bx-btn>
          <bx-btn id="btn-reset" kind="secondary" @click=${this.reset}
            >Clear Values</bx-btn
          >
        </div>
      </form>
    `;
  }
}

customElements.define('app-form', AppParticipateForm);

import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

let BldnAdditionalMessage = class BldnAdditionalMessage extends LitElement {
    handleMessageChange(e) {
        const { value } = e.target;
        this.dispatchEvent(new CustomEvent('bldn-additional-message:message-change', {
            bubbles: true,
            composed: true,
            detail: { message: value },
        }));
    }
    render() {
        return html `
      <p class="">${msg('My additional message:')}</p>
      <p>
        <i>
          ${msg('Please note that adding a personalized message might lead to the demand taking longer to be processed')}
        </i>
      </p>
      <textarea
        id="additional-msg"
        class="std-txt-area"
        name="paragraph_text"
        cols="50"
        rows="10"
        @input=${this.handleMessageChange}
      >
${this.message}</textarea
      >
    `;
    }
};
BldnAdditionalMessage.styles = css `
    :host {
      display: block;
      text-align: left;
    }

    textarea {
      /* Change to border-box so text area doesn't overflow the component */
      box-sizing: border-box;
      width: 100%;
      border: 1px solid
        var(--bldn-additional-message-textarea-border-color, var(--color-light));
      background: rgba(var(--color-light-rgb), 0.2);
      border-radius: 10px;
    }
  `;
__decorate([
    property({ type: String })
], BldnAdditionalMessage.prototype, "message", void 0);
BldnAdditionalMessage = __decorate([
    customElement('bldn-additional-message')
], BldnAdditionalMessage);

export { BldnAdditionalMessage };
//# sourceMappingURL=bldn-additional-message.js.map

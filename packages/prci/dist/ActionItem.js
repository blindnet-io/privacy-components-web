import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { localized } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

let ActionItem = class ActionItem extends LitElement {
    constructor() {
        super(...arguments);
        // Name of the action, displayed in bold
        this.actionName = '';
        // Description of the action, displayed after the actionName
        this.actionDescription = '';
        // Boolean mapping to the disabled attribute of the HTMLButtonElement
        this.disabled = false;
    }
    handleClick() {
        const event = new CustomEvent('demand-action-menu-click', {
            bubbles: true,
            composed: true,
            detail: {
                actionName: this.actionName,
            },
        });
        this.dispatchEvent(event);
    }
    render() {
        return html `
      <button
        class="action-button draw-border"
        @click="${this.handleClick}"
        ?disabled=${this.disabled}
      >
        <strong>${this.actionName}:</strong> ${this.actionDescription}
      </button>
    `;
    }
};
ActionItem.styles = css `
    :host button {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      /* font-size: 16px; */
      font-size: 1rem;
    }

    .action-button:not([disabled]):hover {
      border: 2px solid #18a0fb;
      overflow: visible;
    }

    .action-button {
      border-radius: 15px;
      background-color: #fafafa;
      padding: 10px 40px;
      height: 120px;
      /* max-height: 120px; */
      width: 100%;
      max-width: 400px;
      text-align: left;
      transition: 0.5s;
      -webkit-transition: 0.5s;

      overflow: hidden;
      /* white-space: nowrap; */
      /* display: block; */
      text-overflow: ellipsis;
    }

    .btn-txt {
      /* text-overflow: ellipsis; */
      overflow: hidden;
    }

    .bolder {
      font-weight: 700;
    }
  `;
__decorate([
    property({ type: String, attribute: 'action-name' })
], ActionItem.prototype, "actionName", void 0);
__decorate([
    property({ type: String, attribute: 'action-description' })
], ActionItem.prototype, "actionDescription", void 0);
__decorate([
    property({ type: Boolean })
], ActionItem.prototype, "disabled", void 0);
ActionItem = __decorate([
    customElement('action-item')
    /**
     * Button element representing a single demand action. Used in the action menu.
     */
    ,
    localized()
], ActionItem);

export { ActionItem };
//# sourceMappingURL=ActionItem.js.map

import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { localized } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { ACTION } from './models/priv-terms.js';
import { buttonStyles } from './styles.js';
import { ACTION_TITLES, ACTION_DESCRIPTIONS } from './utils/dictionary.js';
import { ComponentState } from './utils/states.js';

let ActionItem = class ActionItem extends LitElement {
    constructor() {
        super(...arguments);
        this.action = ACTION.ACCESS;
        // Boolean mapping to the disabled attribute of the HTMLButtonElement
        this.disabled = false;
    }
    handleClick() {
        const event = new CustomEvent('component-state-change', {
            bubbles: true,
            composed: true,
            detail: {
                newState: ComponentState.EDIT,
                newAction: this.action,
            },
        });
        this.dispatchEvent(event);
    }
    render() {
        return html `
      <button
        class="action-button animated-btn"
        @click="${this.handleClick}"
        ?disabled=${this.disabled}
      >
        <strong>${ACTION_TITLES[this.action]()}:</strong> ${ACTION_DESCRIPTIONS[this.action]()}
      </button>
    `;
    }
};
ActionItem.styles = [
    buttonStyles,
    css `
      :host button {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 16px;
      }

      .action-button {
        border-radius: 15px;
        border: 0.5px solid #5b5b5b;
        background-color: #fafafa;
        padding: 10px 40px;
        height: 120px;
        width: 100%;
        max-width: 400px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .btn-txt {
        /* text-overflow: ellipsis; */
        overflow: hidden;
      }

      .bolder {
        font-weight: 700;
      }
    `,
];
__decorate([
    property({ attribute: false })
], ActionItem.prototype, "action", void 0);
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

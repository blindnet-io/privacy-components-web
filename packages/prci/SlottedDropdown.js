import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { containerStyles, buttonStyles, textStyles, imgStyles } from './styles.js';
import { FormComponentState } from './utils/states.js';

/**
 * Collapsable element with slots for children
 */
let SlottedDropdown = class SlottedDropdown extends LitElement {
    constructor() {
        super(...arguments);
        this.header = '';
        this.includeButtons = false;
        // Boolean indicating if the choices should be displayed initially
        this.dropdownState = FormComponentState.CLOSED;
    }
    /**
     * Decide the next state when dropdown button is clicked
     */
    handleButtonClick() {
        if (this.dropdownState === FormComponentState.CLOSED ||
            this.dropdownState === FormComponentState.PARTIAL) {
            this.dropdownState = FormComponentState.OPEN;
        }
        else {
            this.dropdownState = FormComponentState.CLOSED;
        }
    }
    render() {
        return html `
      ${when(this.header, () => html `
          <button class="header link-btn" @click=${this.handleButtonClick}>
            <span class="medium-font underline">${this.header}</span>
            <simple-icon
              icon="expand-${this.dropdownState === FormComponentState.OPEN
            ? 'less'
            : 'more'}"
            >
            </simple-icon>
          </button>
        `)}
      <div class="light-border dropdown">
        <div class="content-ctr">
          <slot name="prompt"></slot>
          <slot></slot>
        </div>
        <!-- Display button top open/close if in partial/open -->
        ${when(this.includeButtons, () => html `
            <div class="close-btn-ctr">
              <simple-icon-button
                @click=${this.handleButtonClick}
                icon="expand-${this.dropdownState === FormComponentState.PARTIAL
            ? 'more'
            : 'less'}"
              ></simple-icon-button>
            </div>
          `)}
      </div>
    `;
    }
};
SlottedDropdown.styles = [
    containerStyles,
    buttonStyles,
    textStyles,
    imgStyles,
    css `
      .content-ctr {
        display: none;
      }

      :host([dropdown-state='2']) .content-ctr {
        display: grid;
        row-gap: 50px;
      }

      .dropdown {
        padding: 40px 40px 20px 40px;
      }

      :host([dropdown-state='0']) .dropdown {
        display: none;
      }

      :host([dropdown-state='2']) .header {
        margin: 0px 0px 20px 0px;
      }

      :host([dropdown-state='2']) .dropdown-btn-img {
        src: 'packages/prci/src/assets/icons/close_container_arrow.svg';
      }

      .close-btn-ctr {
        margin: 20px 0px 0px 0px;
        text-align: center;
      }
    `,
];
__decorate([
    property({ type: String })
], SlottedDropdown.prototype, "header", void 0);
__decorate([
    property({ type: Boolean, attribute: 'include-buttons' })
], SlottedDropdown.prototype, "includeButtons", void 0);
__decorate([
    property({ type: Number, reflect: true, attribute: 'dropdown-state' })
], SlottedDropdown.prototype, "dropdownState", void 0);
SlottedDropdown = __decorate([
    customElement('slotted-dropdown')
], SlottedDropdown);

export { SlottedDropdown };
//# sourceMappingURL=SlottedDropdown.js.map

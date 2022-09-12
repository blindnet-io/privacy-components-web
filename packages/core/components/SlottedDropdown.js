import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { bldnStyles } from './blindnet-wc-styles.js';

const closeContainerArrowSvg = new URL(new URL('../assets/close-container-arrow.svg', import.meta.url).href, import.meta.url).href;
const openContainerArrowSvg = new URL(new URL('../assets/open-container-arrow.svg', import.meta.url).href, import.meta.url).href;
/**
 * Collapsable element with slots for children
 */
let SlottedDropdown = class SlottedDropdown extends LitElement {
    constructor() {
        super(...arguments);
        // Text to display outside the dropdown
        this.header = 'Expand';
        // Boolean indicating if dropdown is open or closed
        this.open = false;
        // Boolean indicating if close button should be included
        this.includeButtons = false;
    }
    render() {
        return html `
      ${when(this.header, () => html `
          <button
            class="header link-btn"
            @click=${() => {
            this.open = !this.open;
        }}
          >
            <span class="medium-font underline">${this.header}</span>
            ${when(this.open, () => html `<img src=${closeContainerArrowSvg} alt="close arrow" />`, () => html `<img src=${openContainerArrowSvg} alt="open arrow" />`)}
            <simple-icon
              icon="expand-${this.open ? 'less' : 'more'}"
            ></simple-icon>
          </button>
        `)}
      <div id="dropdown">
        <div id="content-ctr">
          <slot name="prompt"></slot>
          <slot></slot>
        </div>
        <!-- Display button top open/close if in partial/open -->
        ${when(this.includeButtons, () => html `
            <div id="close-btn-ctr">
              <button
                class="svg-btn"
                @click=${() => {
            this.open = !this.open;
        }}
              >
                <img src=${closeContainerArrowSvg} alt="close arrow" />
              </button>
            </div>
          `)}
      </div>
    `;
    }
};
SlottedDropdown.styles = [
    bldnStyles,
    css `
      #content-ctr {
        display: grid;
        row-gap: 50px;
      }

      #dropdown {
        display: none;
        border: var(--bldn-thin-border-width, 1px) solid
          var(--bldn-light-border-color, #c4c4c4);
        border-radius: 10px;
        padding: 40px 40px 20px 40px;
        margin: 20px 0px 0px 0px;
      }

      :host([open]) #dropdown {
        display: block;
      }

      .header {
        margin: 0px 0px 0px 0px;
      }

      #close-btn-ctr {
        margin: 20px 0px 0px 0px;
        text-align: center;
      }

      .svg-btn {
        border: none;
        padding: 0px;
        margin: 0px;
        background: none;
      }

      .link-btn {
        color: #5b5b5b;
        text-decoration: underline;

        display: grid;
        grid-auto-flow: column;
        font-size: 16px;
        column-gap: 7.5px;
        background: none;
        border: none;
        width: fit-content;
        align-items: center;
        padding: 0px;
      }
    `,
];
__decorate([
    property({ type: String })
], SlottedDropdown.prototype, "header", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SlottedDropdown.prototype, "open", void 0);
__decorate([
    property({ type: Boolean, attribute: 'include-buttons' })
], SlottedDropdown.prototype, "includeButtons", void 0);
SlottedDropdown = __decorate([
    customElement('slotted-dropdown')
], SlottedDropdown);

export { SlottedDropdown };
//# sourceMappingURL=SlottedDropdown.js.map

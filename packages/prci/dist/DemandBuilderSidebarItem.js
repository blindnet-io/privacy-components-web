import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { ACTION } from './models/priv-terms.js';

/**
 * A single item on the DemandBuilder sidebar.
 */
let DemandBuilderSidebarItem = class DemandBuilderSidebarItem extends LitElement {
    constructor() {
        super(...arguments);
        // Checked attribute mapping to the checked attribute of the HTMLInputElement
        // for this sidebar item
        this.checked = false;
        // Disabled attribute mapping to the disabled attribute of the HTMLButtonElement and
        // HTMLInputElement for this sidebar item
        this.disabled = false;
        // Unique identifier for this sidebar item
        this.id = ACTION.ACCESS;
        // Title string for this sidebar item
        this.title = '';
        // Description string for this sidebar item
        this.description = '';
    }
    handleClick() {
        const event = new CustomEvent('sidebar-click', {
            bubbles: true,
            composed: true,
            detail: {
                id: this.id,
            },
        });
        this.dispatchEvent(event);
    }
    render() {
        return html `
      <button class="sidebar-btn" ?disabled=${this.disabled} @click=${this.handleClick}>
        <input type="radio" ?disabled=${this.disabled} ?checked=${this.checked}></input>
        <span class="sidebar-txt"><b>${this.title}:</b> ${this.description}</span>
      </button>
    `;
    }
};
DemandBuilderSidebarItem.styles = css `
    :host {
      min-height: 100px;
    }

    :host button {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 16px;
      background-color: white;
    }

    :host([checked]) .sidebar-btn {
      border: 2px solid #000;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      border-right: 2px solid white;
    }

    :host([checked]) {
      z-index: 1;
      margin-right: -2px;
    }

    .sidebar-btn {
      display: grid;
      align-items: center;
      grid-template-columns: 1fr 4fr;
      height: 100%;
      width: 100%;
      border: none;
      /* background-color: #fafafa; */
      text-align: left;
    }

    .sidebar-txt {
      padding: 0px 10px 0px 0px;
    }
  `;
__decorate([
    property({ type: Boolean })
], DemandBuilderSidebarItem.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean })
], DemandBuilderSidebarItem.prototype, "disabled", void 0);
__decorate([
    property({})
], DemandBuilderSidebarItem.prototype, "id", void 0);
__decorate([
    property({ type: String })
], DemandBuilderSidebarItem.prototype, "title", void 0);
__decorate([
    property({ type: String })
], DemandBuilderSidebarItem.prototype, "description", void 0);
DemandBuilderSidebarItem = __decorate([
    customElement('demand-builder-sidebar-item')
], DemandBuilderSidebarItem);

export { DemandBuilderSidebarItem };
//# sourceMappingURL=DemandBuilderSidebarItem.js.map

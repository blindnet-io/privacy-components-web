import { __decorate } from "tslib";
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * Collapsable element displaying a prompt and list of choices, each with a checkbox.
 */
let DemandBuilderDropdownElement = class DemandBuilderDropdownElement extends LitElement {
    constructor() {
        super(...arguments);
        // String displayed at the top of the element, in both open and closed state
        this.prompt = 'I want to know:';
        // List of choices to be displayed with a unique identifier, description string (displayed),
        // and checked boolean indicating if the option should be checked initially
        this.choices = [];
        // Boolean indicating if the choices should be displayed initially
        this.open = true;
        this._selectedChoices = new Set();
    }
    handleCheckboxClick(e) {
        const { id, checked } = e.target;
        if (checked) {
            this._selectedChoices.add(id);
            // Fire add event
            const event = new CustomEvent('dropdown-element-add', {
                bubbles: true,
                composed: true,
                detail: {
                    id,
                    'first-selection': this._selectedChoices.size === 1,
                },
            });
            this.dispatchEvent(event);
        }
        else {
            this._selectedChoices.delete(id);
            // Fire delete event
            const event = new CustomEvent('dropdown-element-delete', {
                bubbles: true,
                composed: true,
                detail: {
                    id,
                    'none-selected': this._selectedChoices.size === 0,
                },
            });
            this.dispatchEvent(event);
        }
    }
    render() {
        return html `
      <p id="prompt">${this.prompt}</p>
      <button
        id="drpdwn-collapse-btn"
        @click=${() => {
            this.open = !this.open;
        }}
      ></button>
      <div id="choices-list">
        ${this.choices.map(c => html `
            <div id="choice-ctr">
              <input
                id=${c.id}
                type="checkbox"
                @click=${this.handleCheckboxClick}
                ?checked=${c.checked}
                ?disabled=${c.disabled}
              />
              <label>${c.description}</label>
            </div>
          `)}
      </div>
    `;
    }
};
DemandBuilderDropdownElement.styles = css `
    :host {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      border: 2px solid #000;
      border-radius: 10px;
      padding: 20px 40px 20px 40px;
    }

    :host([open]) {
      padding: 20px 40px 40px 40px;
    }

    :host([open]) #choices-list {
      display: grid;
    }

    :host([open]) #drpdwn-collapse-btn {
      background: url('/src/assets/icons/close_container_arrow.svg');
    }

    #prompt {
      display: flex;
      grid-column: 1/8;
      align-items: center;
    }

    #drpdwn-collapse-btn {
      grid-column: 8/9;
      height: 24px;
      background: url('/src/assets/icons/open_container_arrow.svg');
      width: 24px;
      border: none;
      justify-self: right;
    }

    #choices-list {
      display: none;
      overflow: hidden;
      grid-column: 1/9;
      grid-template-columns: 1fr;
      row-gap: 35px;
      padding: 25px 0px 0px 0px;
    }

    #choice-ctr {
      padding: 0px 30px;
    }

    p {
      margin: 0px;
    }
  `;
__decorate([
    property({ type: String })
], DemandBuilderDropdownElement.prototype, "prompt", void 0);
__decorate([
    property({ type: Array })
], DemandBuilderDropdownElement.prototype, "choices", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DemandBuilderDropdownElement.prototype, "open", void 0);
DemandBuilderDropdownElement = __decorate([
    customElement('demand-builder-dropdown-element')
], DemandBuilderDropdownElement);
export { DemandBuilderDropdownElement };
//# sourceMappingURL=DemandBuilderDropdownElement.js.map
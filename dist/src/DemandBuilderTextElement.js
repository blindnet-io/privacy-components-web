import { __decorate } from "tslib";
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * Collapsable element displaying a prompt and text input field.
 */
let DemandBuilderTextElement = class DemandBuilderTextElement extends LitElement {
    constructor() {
        super(...arguments);
        this.prompt = 'Additional Message (optional)';
        this.open = false;
    }
    handleInput(e) {
        const event = new CustomEvent('text-element-change', {
            bubbles: true,
            composed: true,
            detail: {
                text: e.target.value,
            },
        });
        this.dispatchEvent(event);
    }
    render() {
        return html `
      <p id="element-prompt">${this.prompt}</p>
      <button
        id="text-element-write-button"
        @click=${() => {
            this.open = !this.open;
        }}
      ></button>
      <textarea
        id="text-input"
        name="paragraph_text"
        cols="50"
        rows="5"
        @input=${this.handleInput}
      ></textarea>
    `;
    }
};
DemandBuilderTextElement.styles = css `
    :host {
      display: grid;
      grid-template-columns: 7fr 1fr;
      border: 2px solid #000;
      border-radius: 10px;
      padding: 20px 40px 20px 40px;
    }

    :host([open]) #text-input {
      display: grid;
    }

    #element-prompt {
      display: flex;
      align-items: center;
    }

    #text-element-write-button {
      height: 30px;
      background: url('/src/assets/icons/edit_fill.svg');
      height: 24px;
      width: 24px;
      border: none;
      justify-self: right;
    }

    #text-input {
      display: none;
      overflow: hidden;
      grid-column: 1/3;
      margin: 25px 0px 0px 0px;
    }

    p {
      margin: 0px;
    }
  `;
__decorate([
    property({ type: String })
], DemandBuilderTextElement.prototype, "prompt", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DemandBuilderTextElement.prototype, "open", void 0);
DemandBuilderTextElement = __decorate([
    customElement('demand-builder-text-element')
], DemandBuilderTextElement);
export { DemandBuilderTextElement };
//# sourceMappingURL=DemandBuilderTextElement.js.map
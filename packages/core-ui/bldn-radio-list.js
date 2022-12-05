import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

/**
 * Radio list with optional prompt.
 *
 * @event {CustomEvent} bldn-radio-list:choice-change - Fired when the list choice changess
 */
let BldnRadioList = class BldnRadioList extends LitElement {
    constructor() {
        super(...arguments);
        /** @prop */
        this.choices = [];
    }
    handleChoiceChange(e) {
        const { id } = e.target;
        this.dispatchEvent(new CustomEvent('bldn-radio-list:choice-change', {
            bubbles: true,
            composed: true,
            detail: {
                value: id,
            },
        }));
    }
    render() {
        return html `
      <slot name="prompt"></slot>
      <fieldset class="provenance-restriction">
        ${this.choices.map(choice => html `
            <input
              id=${choice.value}
              name='radio-list-choice'
              type='radio'
              ?checked=${choice.checked}
              @click=${this.handleChoiceChange}>
            </input>
            <label for=${choice.value}>${choice.display}</label><br/>
          `)}
      </fieldset>
    `;
    }
};
BldnRadioList.styles = css `
    :host {
      display: block;
      text-align: left;
      color: var(--bldn-radio-list-font-color, var(--color-dark));
    }

    fieldset {
      border: none;
      margin: 0;
      padding: 0em;
      text-align: left;
    }

    input {
      /* Ensures wrapped label text doesn't go under input */
      float: left;
      margin-top: 2px;
    }

    label {
      /* Ensures wrapped label text doesn't go under input */
      margin-left: 24px;
      display: block;
    }
  `;
__decorate([
    property({ type: Array })
], BldnRadioList.prototype, "choices", void 0);
BldnRadioList = __decorate([
    customElement('bldn-radio-list')
], BldnRadioList);

export { BldnRadioList };
//# sourceMappingURL=bldn-radio-list.js.map

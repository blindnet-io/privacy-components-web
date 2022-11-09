import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { bldnStyles } from './bldn-styles.js';

let BldnInput = class BldnInput extends LitElement {
    constructor() {
        super(...arguments);
        this.mode = 'default';
        this.type = 'text';
        this.value = '';
        this.placeholder = '';
    }
    handleChange(e) {
        const { value } = e.target;
        this.dispatchEvent(new CustomEvent('bldn-input:input', { detail: value }));
    }
    render() {
        const inputClasses = {
            confirmed: this.mode === 'confirmed',
            error: this.mode === 'error',
        };
        return html `
      <input
        class=${classMap(inputClasses)}
        type=${this.type}
        .value=${this.value}
        placeholder=${this.placeholder}
        @change=${this.handleChange}
      />
    `;
    }
};
BldnInput.styles = [
    bldnStyles,
    css `
      input {
        padding: 10px 10px 10px 0px;
        text-indent: 10px;
        border-radius: 5px;
        border: 2px solid var(--color-light);
      }

      :host([mode='default']) input:focus,
      input:active {
        outline: none;
        border-color: var(--color-primary);
      }

      :host([mode='error']) input:focus,
      input:active {
        outline: none;
        border-color: var(--color-negative);
      }

      ::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: var(--color-light);
        opacity: 1; /* Firefox */
      }

      :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: var(--color-light);
      }

      ::-ms-input-placeholder {
        /* Microsoft Edge */
        color: var(--color-light);
      }

      .confirmed {
        border-color: var(--color-positive);
      }

      .error {
        border-color: var(--color-negative);
      }
    `,
];
__decorate([
    property({ type: String, reflect: true })
], BldnInput.prototype, "mode", void 0);
__decorate([
    property({ type: String })
], BldnInput.prototype, "type", void 0);
__decorate([
    property({ type: String })
], BldnInput.prototype, "value", void 0);
__decorate([
    property({ type: String })
], BldnInput.prototype, "placeholder", void 0);
BldnInput = __decorate([
    customElement('bldn-input')
], BldnInput);

export { BldnInput };
//# sourceMappingURL=bldn-input.js.map

import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { bldnStyles } from './bldn-styles.js';

let ToggleButton = class ToggleButton extends LitElement {
    constructor() {
        super(...arguments);
        this.left = '';
        this.right = '';
        this.selected = 'left';
    }
    handleClick(side) {
        this.dispatchEvent(new CustomEvent(`bldn-toggle-button-change`, {
            detail: { newValue: side === 'left' ? this.left : this.right },
        }));
        this.selected = side;
    }
    render() {
        return html `
      <button
        id="toggle-button-half__left"
        class="${this.selected === 'left'
            ? 'toggle-button-half__selected'
            : ''}"
        @click=${() => this.handleClick('left')}
      >
        ${this.left}
      </button>
      <button
        id="toggle-button-half__right"
        class="${this.selected === 'right'
            ? 'toggle-button-half__selected'
            : ''}"
        @click=${() => this.handleClick('right')}
      >
        ${this.right}
      </button>
    `;
    }
};
ToggleButton.styles = [
    bldnStyles,
    css `
      :host {
        /* Grid ensures both buttons have same width, dictated by whichever has larger text */
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }

      button {
        color: var(--color-dark);
        border: 1px solid var(--color-light);
        padding: 10px 20px;
        /* font-size: 0.6vw; */
        font-size: 16px;
      }

      #toggle-button-half__left {
        border-radius: 7.5px 0px 0px 7.5px;
        border-right-width: 1px;
        border-right-color: var(--color-primary);
      }

      #toggle-button-half__right {
        border-radius: 0px 7.5px 7.5px 0px;
        border-left-width: 0px;
        border-left-color: var(--color-primary);
      }

      .toggle-button-half__selected {
        border-color: var(--color-primary);
        background: linear-gradient(
            0deg,
            rgba(var(--color-primary-rgb), 0.1),
            rgba(var(--color-primary-rgb), 0.1)
          ),
          #ffffff;
        color: var(--color-primary);
      }
    `,
];
__decorate([
    property({ type: String, attribute: 'left' })
], ToggleButton.prototype, "left", void 0);
__decorate([
    property({ type: String, attribute: 'right' })
], ToggleButton.prototype, "right", void 0);
__decorate([
    property({ type: String, attribute: 'selected' })
], ToggleButton.prototype, "selected", void 0);
ToggleButton = __decorate([
    customElement('bldn-toggle-button')
], ToggleButton);

export { ToggleButton };
//# sourceMappingURL=bldn-toggle-button.js.map

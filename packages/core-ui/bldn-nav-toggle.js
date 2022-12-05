import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { css, LitElement, html } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';

let BldnNavToggle = class BldnNavToggle extends LitElement {
    constructor() {
        super(...arguments);
        this.left = {
            label: 'Option 1',
            value: 'option_1',
        };
        this.right = {
            label: 'Option 2',
            value: 'option_2',
        };
        this._selected = 'left';
    }
    handleClick(side) {
        const clickedOption = side === 'left' ? this.left : this.right;
        this._selected = side;
        this.dispatchEvent(new CustomEvent('bldn-nav-toggle:click', {
            detail: { value: clickedOption.value },
        }));
    }
    willUpdate(_changedProperties) {
        if (_changedProperties.has('left')) {
            if (this.left.checked) {
                this._selected = 'left';
            }
            else {
                this._selected = 'right';
            }
        }
    }
    render() {
        // The HTML comment between the two buttoms remove the space that browsers will insert
        return html `
      <div>
        <button
          class=${this._selected === 'left' ? 'selected' : ''}
          @click=${() => this.handleClick('left')}
        >
          <strong>${this.left.label}</strong></button
        ><!--
  --><button
          class=${this._selected === 'right' ? 'selected' : ''}
          @click=${() => this.handleClick('right')}
        >
          <strong>${this.right.label}</strong>
        </button>
      </div>
    `;
    }
};
BldnNavToggle.styles = css `
    :host {
      display: block;
      text-align: center;
    }

    button {
      border: none;
      font-family: var(--bldn-nav-toggle-font-family, var(--font-family));
      font-size: var(--bldn-nav-toggle-font-size, var(--font-size-large));
      color: var(--bldn-nav-toggle-color-deselected, var(--color-medium));
      background: var(--bldn-nav-toggle-background, var(--background));
    }

    button:first-child {
      border-right: 1px solid
        var(--bldn-nav-toggle-color-selected, var(--color-darkest));
      padding-right: 0.75em;
    }

    button:last-child {
      border-left: 1px solid
        var(--bldn-nav-toggle-color-selected, var(--color-darkest));
      padding-left: 0.75em;
    }

    .selected {
      color: var(--bldn-nav-toggle-color-selected, var(--color-darkest));
    }
  `;
__decorate([
    property({ type: Array })
], BldnNavToggle.prototype, "left", void 0);
__decorate([
    property({ type: Object })
], BldnNavToggle.prototype, "right", void 0);
__decorate([
    state()
], BldnNavToggle.prototype, "_selected", void 0);
BldnNavToggle = __decorate([
    customElement('bldn-nav-toggle')
], BldnNavToggle);

export { BldnNavToggle };
//# sourceMappingURL=bldn-nav-toggle.js.map

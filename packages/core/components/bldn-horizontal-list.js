import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { css, LitElement, html } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { bldnStyles } from './bldn-styles.js';

let HorizontalList = class HorizontalList extends LitElement {
    constructor() {
        super(...arguments);
        this.choices = [];
        this._selected = 0;
    }
    handleChoiceClick(e) {
        const { id } = e.target;
        this._selected = this.choices.findIndex(c => c.value === id);
        this.dispatchEvent(new CustomEvent('bldn-horizontal-list:choice-change', {
            detail: {
                value: id,
            },
        }));
    }
    render() {
        return html `
      <div>
        ${map(this.choices, (choice, i) => html `
            <button
              id=${choice.value}
              class="choice ${i === this._selected ? 'choice--selected' : ''}"
              @click=${this.handleChoiceClick}
            >
              ${choice.display}
            </button>
          `)}
      </div>
    `;
    }
    willUpdate(_changedProperties) {
        if (_changedProperties.has('choices') &&
            _changedProperties.get('choices') === undefined) {
            this._selected = this.choices.findIndex(c => c.selected);
            if (this._selected < 0) {
                this._selected = 0;
            }
        }
    }
};
HorizontalList.styles = [
    bldnStyles,
    css `
      :host {
        display: block;
      }

      div {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1fr;
      }

      .choice {
        padding: 5px 20px;
        border: none;
        border-bottom: 1px solid var(--color-medium);
      }

      .choice--selected {
        color: var(--color-primary);
        border-bottom: 2px solid var(--color-primary);
      }

      button {
        color: var(--color-dark);
        font-size: var(
          --bldn-horizontal-list-font-size,
          var(--font-size-medium)
        );
        background: var(
          --bldn-horizontal-list-background-color,
          var(--background)
        );
      }
    `,
];
__decorate([
    property({ type: Array })
], HorizontalList.prototype, "choices", void 0);
__decorate([
    state()
], HorizontalList.prototype, "_selected", void 0);
HorizontalList = __decorate([
    customElement('bldn-horizontal-list')
], HorizontalList);

export { HorizontalList };
//# sourceMappingURL=bldn-horizontal-list.js.map

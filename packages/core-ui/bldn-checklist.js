import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';

/**
 * Simple checklist component
 *
 * @event {CustomEvent} bldn-checklist:choice-select
 * @event {CustomEvent} bldn-checklist:choice-deselect
 */
let BldnChecklist = class BldnChecklist extends LitElement {
    constructor() {
        super(...arguments);
        this.choices = [];
    }
    handleChoiceClick(e) {
        const { id, checked } = e.target;
        this.dispatchEvent(new CustomEvent(`bldn-checklist:choice-${checked ? 'select' : 'deselect'}`, {
            bubbles: true,
            composed: true,
            detail: {
                value: id,
            },
        }));
    }
    render() {
        return html `
      ${map(this.choices, c => html `
          <input
            id=${c.value}
            type="checkbox"
            ?checked=${c.checked}
            @change=${this.handleChoiceClick}
          />
          <label>${c.display}</label>
        `)}
    `;
    }
};
BldnChecklist.styles = css `
    :host {
      display: block;
    }
  `;
__decorate([
    property({ type: Array })
], BldnChecklist.prototype, "choices", void 0);
BldnChecklist = __decorate([
    customElement('bldn-checklist')
], BldnChecklist);

export { BldnChecklist };
//# sourceMappingURL=bldn-checklist.js.map

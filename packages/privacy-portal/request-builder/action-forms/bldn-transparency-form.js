import { __decorate } from '../../node_modules/tslib/tslib.es6.js';
import { PrivacyRequestDemand, ProvenanceRestriction } from '@blindnet/core';
import { css, html } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { msg } from '@lit/localize';
import { ActionForm } from './bldn-action-form.js';
import '@blindnet/core-ui';
import { TRANSPARENCY_ACTION_DESCRIPTIONS } from '../../utils/dictionary.js';

/**
 * Action form for the TRANSPARENCY PRIV Action
 */
let BldnTransparencyForm = class BldnTransparencyForm extends ActionForm {
    constructor() {
        super(...arguments);
        /** @prop */
        this.transparencyActions = [];
        this._restrictions = {};
        this.action = PrivacyRequestDemand.action.TRANSPARENCY;
    }
    validateActionInput() {
        return undefined;
    }
    validateOptionsInput() {
        return undefined;
    }
    getFormTemplate() {
        return html `
      <p>${msg('I want to know:')}</p>
      <bldn-all-checklist
        .choices=${this.transparencyActions.map(action => ({
            value: action,
            display: TRANSPARENCY_ACTION_DESCRIPTIONS[action](),
            checked: this.demands.findIndex(demand => demand.action === action) !== -1,
            allChoice: action === PrivacyRequestDemand.action.TRANSPARENCY,
        }))}
      ></bldn-all-checklist>
    `;
    }
    getOptionsTemplate() {
        var _a, _b, _c, _d, _e, _f;
        return html `
      <bldn-dropdown>
        <span slot="heading"><strong>${msg('Date Restriction')}</strong></span>
        <bldn-date-restriction
          start=${ifDefined((_b = (_a = this.demands[0].restrictions) === null || _a === void 0 ? void 0 : _a.date_range) === null || _b === void 0 ? void 0 : _b.from)}
          end=${ifDefined((_d = (_c = this.demands[0].restrictions) === null || _c === void 0 ? void 0 : _c.date_range) === null || _d === void 0 ? void 0 : _d.to)}
        ></bldn-date-restriction>
      </bldn-dropdown>
      <bldn-dropdown>
        <span slot="heading"
          ><strong>${msg('Provenance Restriction')}</strong></span
        >
        <bldn-provenance-restriction
          term=${ifDefined((_f = (_e = this.demands[0].restrictions) === null || _e === void 0 ? void 0 : _e.provenance) === null || _f === void 0 ? void 0 : _f.term)}
        ></bldn-provenance-restriction>
      </bldn-dropdown>
      <bldn-dropdown>
        <span slot="heading"
          ><strong>${msg('Additional Message')}</strong></span
        >
        <bldn-additional-message
          message=${ifDefined(this.demands[0].message)}
        ></bldn-additional-message>
      </bldn-dropdown>
    `;
    }
    getDefaultDemands() {
        return [
            {
                id: '',
                action: PrivacyRequestDemand.action.TRANSPARENCY,
                restrictions: {
                    provenance: {
                        term: ProvenanceRestriction.term._,
                    },
                    date_range: {},
                },
            },
        ];
    }
    // Listener Functions
    /**
     * Add a new demand to this demand group for the selected transparency action
     * @param e {CustomEvent} Event containing the transparency action to add
     */
    addTransparencyAction(e) {
        const { value } = e.detail;
        const newDemand = {
            id: '',
            action: value,
            restrictions: this._restrictions,
        };
        if (this._message) {
            newDemand.message = this._message;
        }
        this.demands.push(newDemand);
    }
    /**
     * Remove a demand from this demand group for the deselected transparency action
     * @param e {CustomEvent} Event containing the transparency action to remove
     */
    removeTransparencyAction(e) {
        const { value } = e.detail;
        const removeIndex = this.demands.findIndex(demand => demand.action === value);
        if (removeIndex > -1) {
            this.demands.splice(removeIndex, 1);
        }
    }
    /**
     * Update the date restriction start for this demand
     * @param e {CustomEvent} Event containing the new start date
     */
    changeDateRestrictionStart(e) {
        e.stopPropagation();
        const { date } = e.detail;
        this._restrictions.date_range.from = date;
        // Update the date restriction start of each demand
        this.demands.forEach(demand => {
            demand.restrictions.date_range.from = date;
        });
    }
    /**
     * Update the date restriction end for this demand
     * @param e {CustomEvent} Event containing the new end date
     */
    changeDateRestrictionEnd(e) {
        e.stopPropagation();
        const { date } = e.detail;
        this._restrictions.date_range.to = date;
        // Update the date restriction end of each demand
        this.demands.forEach(demand => {
            demand.restrictions.date_range.to = date;
        });
    }
    /**
     * Update the provenance restriction term for this demand
     * @param e {CustomEvent} Event containing the new provenance restriction term
     */
    changeProvenanceRestrictionTerm(e) {
        e.stopPropagation();
        const { term } = e.detail;
        this._restrictions.provenance.term = term;
        // Update the provenance restriction term of each demand
        this.demands.forEach(demand => {
            demand.restrictions.provenance.term = term;
        });
    }
    /**
     * Update the message for this demand
     * @param e {CustomEvent} Event containing the data category string to add
     */
    changeMessage(e) {
        e.stopPropagation();
        const { message } = e.detail;
        this._message = message;
        // Update message of each demand
        this.demands.forEach(demand => {
            demand.message = this._message;
        });
    }
    /**
     * Add listeners for elements of this ActionForm
     */
    connectedCallback() {
        // eslint-disable-next-line wc/guard-super-call
        super.connectedCallback();
        // Data category listeners
        this.addEventListener('bldn-all-checklist:choice-select', this.addTransparencyAction);
        this.addEventListener('bldn-all-checklist:choice-deselect', this.removeTransparencyAction);
        // Date restriction listeners
        this.addEventListener('bldn-date-restriction:start-date-change', this.changeDateRestrictionStart);
        this.addEventListener('bldn-date-restriction:end-date-change', this.changeDateRestrictionEnd);
        // Provenance restriction listener
        this.addEventListener('bldn-provenance-restriction:term-change', this.changeProvenanceRestrictionTerm);
        // Message listener
        this.addEventListener('bldn-additional-message:message-change', this.changeMessage);
    }
    /**
     * Remove all listeners
     */
    disconnectedCallback() {
        this.removeEventListener('bldn-all-checklist:choice-select', this.addTransparencyAction);
        this.removeEventListener('bldn-all-checklist:choice-deselect', this.removeTransparencyAction);
        this.removeEventListener('bldn-date-restriction:start-date-change', this.changeDateRestrictionStart);
        this.removeEventListener('bldn-date-restriction:end-date-change', this.changeDateRestrictionEnd);
        this.removeEventListener('bldn-provenance-restriction:term-change', this.changeProvenanceRestrictionTerm);
        this.removeEventListener('bldn-additional-message:message-change', this.changeMessage);
    }
    /**
     * Set the restrictions and message states initially
     */
    handleDemandsChange() {
        if (this.demands.length > 0) {
            if (this.demands[0].restrictions) {
                this._restrictions = this.demands[0].restrictions;
            }
            if (this.demands[0].message) {
                this._message = this.demands[0].message;
            }
        }
    }
    willUpdate(_changedProperties) {
        if (_changedProperties.has('demands'))
            this.handleDemandsChange();
    }
};
BldnTransparencyForm.styles = [
    ActionForm.styles,
    css `
      :host {
        text-align: left;
        color: var(--bldn-transparency-form-font-color, var(--color-dark));
      }

      p {
        margin: 2em 0em;
      }

      p + bldn-all-checklist {
        margin-top: 1em;
        padding-left: 1em;
      }
    `,
];
__decorate([
    property({ type: Array, attribute: 'transparency-actions' })
], BldnTransparencyForm.prototype, "transparencyActions", void 0);
__decorate([
    state()
], BldnTransparencyForm.prototype, "_restrictions", void 0);
__decorate([
    state()
], BldnTransparencyForm.prototype, "_message", void 0);
BldnTransparencyForm = __decorate([
    customElement('bldn-transparency-form')
], BldnTransparencyForm);

export { BldnTransparencyForm };
//# sourceMappingURL=bldn-transparency-form.js.map

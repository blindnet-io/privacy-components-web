import { __decorate } from '../../node_modules/tslib/tslib.es6.js';
import { PrivacyRequestDemand, PrivacyScopeRestriction, ProvenanceRestriction } from '@blindnet/core';
import { msg } from '@lit/localize';
import { css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ActionForm } from './bldn-action-form.js';
import '../bldn-privacy-scope-picker.js';
import { DATA_CATEGORY_DESCRIPTIONS, DATA_CATEGORY_TITLES, PROCESSING_CATEGORY_DESCRIPTIONS, PROCESSING_CATEGORIES, PURPOSE_DESCRIPTIONS, PURPOSES } from '../../utils/dictionary.js';

/**
 * Action form for the OBJECT PRIV Action
 */
let BldnObjectForm = class BldnObjectForm extends ActionForm {
    constructor() {
        super(...arguments);
        /** @prop List of allowed data categories */
        this.dataCategories = [];
        /** @prop List of allowed processing categories */
        this.processingCategories = [];
        /** @prop List of allowed purposes of processing */
        this.purposes = [];
        this.action = PrivacyRequestDemand.action.OBJECT;
    }
    validateActionInput() {
        return undefined;
    }
    validateOptionsInput() {
        return undefined;
    }
    getFormTemplate() {
        return html `
      <blnd-privacy-scope-picker
        mode="object"
        .privacyScope=${this.demands[0].restrictions.privacy_scope}
        .dataCategories=${this.dataCategories.map(dc => ({
            value: dc,
            display: dc === '*'
                ? html `${DATA_CATEGORY_DESCRIPTIONS[dc]()}`
                : html `<b>${DATA_CATEGORY_TITLES[dc]()}:</b>
                  ${DATA_CATEGORY_DESCRIPTIONS[dc]()}`,
            allChoice: dc === '*',
        }))}
        .processingCategories=${this.processingCategories.map(pc => ({
            value: pc,
            display: pc === '*'
                ? html `${PROCESSING_CATEGORY_DESCRIPTIONS[pc]()}`
                : html `<b>${PROCESSING_CATEGORIES[pc]()}:</b>
                  ${PROCESSING_CATEGORY_DESCRIPTIONS[pc]()}`,
            allChoice: pc === '*',
        }))}
        .purposes=${this.purposes.map(pp => ({
            value: pp,
            display: pp === '*'
                ? html `${PURPOSE_DESCRIPTIONS[pp]()}`
                : html `<b>${PURPOSES[pp]()}:</b> ${PURPOSE_DESCRIPTIONS[pp]()}`,
            allChoice: pp === '*',
        }))}
      ></blnd-privacy-scope-picker>
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
                action: PrivacyRequestDemand.action.OBJECT,
                restrictions: {
                    privacy_scope: [
                        {
                            dc: '*',
                            pc: PrivacyScopeRestriction.pc._,
                            pp: PrivacyScopeRestriction.pp._,
                        },
                    ],
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
     * Update the privacy scope restriction for this demand
     * @param e {CustomEvent} Event containing the new privacy scope restriction
     */
    changePrivacyScopeRestriction(e) {
        e.stopPropagation();
        const { privacyScope } = e.detail;
        this.demands[0].restrictions.privacy_scope = privacyScope;
    }
    /**
     * Update the date restriction start for this demand
     * @param e {CustomEvent} Event containing the new start date
     */
    changeDateRestrictionStart(e) {
        e.stopPropagation();
        const { date } = e.detail;
        this.demands[0].restrictions.date_range.from = date;
    }
    /**
     * Update the date restriction end for this demand
     * @param e {CustomEvent} Event containing the new end date
     */
    changeDateRestrictionEnd(e) {
        e.stopPropagation();
        const { date } = e.detail;
        this.demands[0].restrictions.date_range.to = date;
    }
    /**
     * Update the provenance restriction term for this demand
     * @param e {CustomEvent} Event containing the new provenance restriction term
     */
    changeProvenanceRestrictionTerm(e) {
        e.stopPropagation();
        const { term } = e.detail;
        this.demands[0].restrictions.provenance.term = term;
    }
    /**
     * Update the message for this demand
     * @param e {CustomEvent} Event containing the data category string to add
     */
    changeMessage(e) {
        e.stopPropagation();
        const { message } = e.detail;
        this.demands[0].message = message;
    }
    /**
     * Add listeners for elements of this ActionForm
     */
    connectedCallback() {
        // eslint-disable-next-line wc/guard-super-call
        super.connectedCallback();
        // Privacy scope restriction listener
        this.addEventListener('bldn-privacy-scope-picker:scope-change', this.changePrivacyScopeRestriction);
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
        this.removeEventListener('bldn-privacy-scope-picker:scope-change', this.changePrivacyScopeRestriction);
        this.removeEventListener('bldn-date-restriction:start-date-change', this.changeDateRestrictionStart);
        this.removeEventListener('bldn-date-restriction:end-date-change', this.changeDateRestrictionEnd);
        this.removeEventListener('bldn-provenance-restriction:term-change', this.changeProvenanceRestrictionTerm);
        this.removeEventListener('bldn-additional-message:message-change', this.changeMessage);
    }
};
BldnObjectForm.styles = [ActionForm.styles, css ``];
__decorate([
    property({ type: Array, attribute: 'data-categories' })
], BldnObjectForm.prototype, "dataCategories", void 0);
__decorate([
    property({ type: Array, attribute: 'processing-categories' })
], BldnObjectForm.prototype, "processingCategories", void 0);
__decorate([
    property({ type: Array, attribute: 'purposes' })
], BldnObjectForm.prototype, "purposes", void 0);
BldnObjectForm = __decorate([
    customElement('bldn-object-form')
], BldnObjectForm);

export { BldnObjectForm };
//# sourceMappingURL=bldn-object-form.js.map

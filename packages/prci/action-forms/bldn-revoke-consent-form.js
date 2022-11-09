import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { PrivacyRequestDemand, ComputationAPI } from '@blindnet/core';
import { msg } from '@lit/localize';
import { css, html } from 'lit';
import { state, customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import { ActionForm } from './bldn-action-form.js';
import '../bldn-radio-list.js';
import '../bldn-checklist.js';

/**
 * Action form for the REVOKE-CONSENT PRIV Action
 */
let BldnRevokeConsentForm = class BldnRevokeConsentForm extends ActionForm {
    constructor() {
        super();
        this._consents = [];
        this._showEach = false;
        this.action = PrivacyRequestDemand.action.REVOKE_CONSENT;
        if (ComputationAPI.getInstance().apiTokenSet()) {
            ComputationAPI.getInstance()
                .getUserConsents()
                .then(consents => {
                this._consents = consents;
                // Set state based off demands passed in
                if (this.demands.length === 1 && !this.demands[0].restrictions) {
                    // Default case, select all consent IDs and add a demand for each
                    this.demands = [];
                    this._consents.forEach(c => {
                        this.demands.push({
                            id: '',
                            action: PrivacyRequestDemand.action.REVOKE_CONSENT,
                            restrictions: {
                                consent: {
                                    id: c.id,
                                },
                            },
                            message: this._message,
                        });
                    });
                }
                else {
                    // Otherwise show the list of consents
                    this._showEach = true;
                }
            });
        }
        else {
            // TODO: Set some error message here that is the same for all forms
            // eslint-disable-next-line no-console
            console.log('User must be authenticated for this demand type!');
        }
    }
    validateActionInput() {
        return undefined;
    }
    validateOptionsInput() {
        return undefined;
    }
    getFormTemplate() {
        return html `
      <p>${msg('I want to:')}</p>
      <bldn-radio-list
        .choices=${[
            {
                value: 'all',
                display: msg(html `Revoke <b>all</b> consents`),
                checked: !this._showEach,
            },
            {
                value: 'some',
                display: msg(html `Revoke <b>specific</b> consents (select those you wish to
                <b>revoke</b>)`),
                checked: this._showEach,
            },
        ]}
        @bldn-radio-list:choice-change=${this.handleRevokeTypeChange}
      ></bldn-radio-list>
      ${when(this._showEach, () => html `
          <bldn-checklist
            .choices=${this._consents.map(c => ({
            value: c.id,
            display: html `${c.name} -
                <i
                  >${msg(html `Given on ${new Date(c.date).toLocaleString()}`)}</i
                >`,
            checked: this.demands.findIndex(d => d.restrictions.consent.id === c.id) > -1,
        }))}
            @bldn-checklist:choice-select=${this.addConsent}
            @bldn-checklist:choice-deselect=${this.removeConsent}
          ></bldn-checklist>
        `)}
    `;
    }
    getOptionsTemplate() {
        return html `
      <bldn-dropdown>
        <span slot="heading"
          ><strong>${msg('Additional Message')}</strong></span
        >
        <bldn-additional-message
          message=${ifDefined(this.demands.length > 0 ? this.demands[0].message : undefined)}
        ></bldn-additional-message>
      </bldn-dropdown>
    `;
    }
    getDefaultDemands() {
        return [
            {
                id: '',
                action: PrivacyRequestDemand.action.REVOKE_CONSENT,
            },
        ];
    }
    // Listener Functions
    /**
     * Hide or show the consents list based on radio selection
     * @param e Event with value of radio button clicked
     */
    handleRevokeTypeChange(e) {
        e.stopPropagation();
        const { value } = e.detail;
        this._showEach = value === 'some';
        this.demands = [];
        if (value === 'all') {
            // Add a demand for each consent
            this._consents.forEach(c => {
                this.demands.push({
                    id: '',
                    action: PrivacyRequestDemand.action.REVOKE_CONSENT,
                    restrictions: {
                        consent: {
                            id: c.id,
                        },
                    },
                    message: this._message,
                });
            });
        }
    }
    addConsent(e) {
        e.stopPropagation();
        const { value } = e.detail;
        // Add a new demand for this consent
        this.demands.push({
            id: '',
            action: PrivacyRequestDemand.action.REVOKE_CONSENT,
            restrictions: {
                consent: {
                    id: value,
                },
            },
            message: this._message,
        });
    }
    removeConsent(e) {
        e.stopPropagation();
        const { value } = e.detail;
        // Remove the demand with this consent ID
        const removeIndex = this.demands.findIndex(d => d.restrictions.consent.id === value);
        if (removeIndex > -1) {
            this.demands.splice(removeIndex, 1);
        }
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
        // Message listener
        this.addEventListener('bldn-additional-message:message-change', this.changeMessage);
    }
    /**
     * Remove all listeners
     */
    disconnectedCallback() {
        this.removeEventListener('bldn-additional-message:message-change', this.changeMessage);
    }
};
BldnRevokeConsentForm.styles = [
    ActionForm.styles,
    css `
      :host {
        text-align: left;
        color: var(--bldn-revoke-consent-form-font-color, var(--color-dark));
      }

      bldn-checklist {
        margin-left: 1.5em;
        /* padding-bottom: 1em; */
        margin-bottom: 1em;
      }
    `,
];
__decorate([
    state()
], BldnRevokeConsentForm.prototype, "_consents", void 0);
__decorate([
    state()
], BldnRevokeConsentForm.prototype, "_message", void 0);
__decorate([
    state()
], BldnRevokeConsentForm.prototype, "_showEach", void 0);
BldnRevokeConsentForm = __decorate([
    customElement('bldn-revoke-consent-form')
], BldnRevokeConsentForm);

export { BldnRevokeConsentForm };
//# sourceMappingURL=bldn-revoke-consent-form.js.map

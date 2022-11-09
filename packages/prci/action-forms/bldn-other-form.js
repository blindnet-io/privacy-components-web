import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { PrivacyRequestDemand } from '@blindnet/core';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ActionForm } from './bldn-action-form.js';

/**
 * Action form for the OTHER PRIV Action
 */
let BldnOtherForm = class BldnOtherForm extends ActionForm {
    constructor() {
        super(...arguments);
        this.action = PrivacyRequestDemand.action.OTHER;
        // Remove other options dropdown for this form
        this.includeOptions = false;
    }
    validateActionInput() {
        return undefined;
    }
    validateOptionsInput() {
        return undefined;
    }
    getFormTemplate() {
        return html `
      <bldn-additional-message
        message=${ifDefined(this.demands[0].message)}
      ></bldn-additional-message>
    `;
    }
    getOptionsTemplate() {
        return html ``;
    }
    getDefaultDemands() {
        return [
            {
                id: '',
                action: PrivacyRequestDemand.action.OTHER,
            },
        ];
    }
    // Listener Functions
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
BldnOtherForm.styles = [
    ActionForm.styles,
    css `
      bldn-additional-message {
        margin: 2em 0;
      }
    `,
];
BldnOtherForm = __decorate([
    customElement('bldn-other-form')
], BldnOtherForm);

export { BldnOtherForm };
//# sourceMappingURL=bldn-other-form.js.map

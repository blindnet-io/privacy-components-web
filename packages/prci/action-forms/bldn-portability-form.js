import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { PrivacyRequestDemand } from '@blindnet/core';
import { css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ActionForm } from './bldn-action-form.js';

/**
 * Action form for the PORTABILITY PRIV Action
 */
let BldnPortabilityForm = class BldnPortabilityForm extends ActionForm {
    constructor() {
        super(...arguments);
        this.action = PrivacyRequestDemand.action.PORTABILITY;
    }
    validateActionInput() {
        throw new Error('Method not implemented.');
    }
    validateOptionsInput() {
        throw new Error('Method not implemented.');
    }
    getFormTemplate() {
        throw new Error('Method not implemented.');
    }
    getOptionsTemplate() {
        throw new Error('Method not implemented.');
    }
    getDefaultDemands() {
        throw new Error('Method not implemented.');
    }
    // Listener Functions
    /**
     * Add listeners for elements of this ActionForm
     */
    connectedCallback() {
        // eslint-disable-next-line wc/guard-super-call
        super.connectedCallback();
    }
    /**
     * Remove all listeners
     */
    disconnectedCallback() { }
};
BldnPortabilityForm.styles = [ActionForm.styles, css ``];
BldnPortabilityForm = __decorate([
    customElement('bldn-portability-form')
], BldnPortabilityForm);

export { BldnPortabilityForm };
//# sourceMappingURL=bldn-portability-form.js.map

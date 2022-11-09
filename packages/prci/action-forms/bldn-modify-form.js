import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { PrivacyRequestDemand } from '@blindnet/core';
import { css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ActionForm } from './bldn-action-form.js';

/**
 * Action form for the Modify PRIV Action
 */
let BldnModifyForm = class BldnModifyForm extends ActionForm {
    constructor() {
        super(...arguments);
        this.action = PrivacyRequestDemand.action.MODIFY;
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
BldnModifyForm.styles = [ActionForm.styles, css ``];
BldnModifyForm = __decorate([
    customElement('bldn-modify-form')
], BldnModifyForm);

export { BldnModifyForm };
//# sourceMappingURL=bldn-modify-form.js.map

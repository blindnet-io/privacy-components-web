import { PrivacyRequestDemand } from '@blindnet/core';
import { TemplateResult } from 'lit';
import { ActionForm } from './bldn-action-form.js';
/**
 * Action form for the Modify PRIV Action
 */
export declare class BldnModifyForm extends ActionForm {
    action: PrivacyRequestDemand.action;
    includeOptions: boolean;
    validateActionInput(): string[] | undefined;
    validateOptionsInput(): string[] | undefined;
    getFormTemplate(): TemplateResult<1 | 2>;
    getOptionsTemplate(): TemplateResult<1 | 2>;
    getDefaultDemands(): PrivacyRequestDemand[];
    /**
     * Update the message for this demand
     * @param e {CustomEvent} Event containing the data category string to add
     */
    changeMessage(e: Event): void;
    /**
     * Add listeners for elements of this ActionForm
     */
    connectedCallback(): void;
    /**
     * Remove all listeners
     */
    disconnectedCallback(): void;
    static styles: (import("lit").CSSResult | import("lit").CSSResultGroup[])[];
}

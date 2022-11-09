import { GivenConsentsPayload, PrivacyRequestDemand } from '@blindnet/core';
import { TemplateResult } from 'lit';
import { ActionForm } from './bldn-action-form.js';
import '../bldn-radio-list.js';
import '../bldn-checklist.js';
/**
 * Action form for the REVOKE-CONSENT PRIV Action
 */
export declare class BldnRevokeConsentForm extends ActionForm {
    _consents: GivenConsentsPayload[];
    _message: string | undefined;
    _showEach: boolean;
    action: PrivacyRequestDemand.action;
    constructor();
    validateActionInput(): string[] | undefined;
    validateOptionsInput(): string[] | undefined;
    getFormTemplate(): TemplateResult<1 | 2>;
    getOptionsTemplate(): TemplateResult<1 | 2>;
    getDefaultDemands(): PrivacyRequestDemand[];
    /**
     * Hide or show the consents list based on radio selection
     * @param e Event with value of radio button clicked
     */
    handleRevokeTypeChange(e: Event): void;
    addConsent(e: Event): void;
    removeConsent(e: Event): void;
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

import { PrivacyRequestDemand, PrivacyScopeRestriction } from '@blindnet/core';
import { TemplateResult } from 'lit';
import { ActionForm } from './bldn-action-form.js';
import '../bldn-privacy-scope-picker.js';
/**
 * Action form for the OBJECT PRIV Action
 */
export declare class BldnObjectForm extends ActionForm {
    /** @prop List of allowed data categories */
    dataCategories: string[];
    /** @prop List of allowed processing categories */
    processingCategories: PrivacyScopeRestriction.pc[];
    /** @prop List of allowed purposes of processing */
    purposes: PrivacyScopeRestriction.pp[];
    action: PrivacyRequestDemand.action;
    validateActionInput(): string[] | undefined;
    validateOptionsInput(): string[] | undefined;
    getFormTemplate(): TemplateResult<1 | 2>;
    getOptionsTemplate(): TemplateResult<1 | 2>;
    getDefaultDemands(): PrivacyRequestDemand[];
    /**
     * Update the privacy scope restriction for this demand
     * @param e {CustomEvent} Event containing the new privacy scope restriction
     */
    changePrivacyScopeRestriction(e: Event): void;
    /**
     * Update the date restriction start for this demand
     * @param e {CustomEvent} Event containing the new start date
     */
    changeDateRestrictionStart(e: Event): void;
    /**
     * Update the date restriction end for this demand
     * @param e {CustomEvent} Event containing the new end date
     */
    changeDateRestrictionEnd(e: Event): void;
    /**
     * Update the provenance restriction term for this demand
     * @param e {CustomEvent} Event containing the new provenance restriction term
     */
    changeProvenanceRestrictionTerm(e: Event): void;
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

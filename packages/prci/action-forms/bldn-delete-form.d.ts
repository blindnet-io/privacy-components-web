import { PrivacyRequestDemand } from '@blindnet/core';
import { TemplateResult } from 'lit';
import { ActionForm } from './bldn-action-form.js';
/**
 * Action form for the DELETE PRIV Action
 */
export declare class BldnDeleteForm extends ActionForm {
    /** @prop */
    dataCategories: string[];
    action: PrivacyRequestDemand.action;
    validateActionInput(): string[] | undefined;
    validateOptionsInput(): string[] | undefined;
    getFormTemplate(): TemplateResult<1 | 2>;
    getOptionsTemplate(): TemplateResult<1 | 2>;
    getDefaultDemands(): PrivacyRequestDemand[];
    /**
     * Add a privacy scope restriction to this demand for the selected data category
     * @param e {CustomEvent} Event containing the data category string to add
     */
    addDataCategory(e: Event): void;
    /**
     * Remove a privacy scope restriction to this demand for the deselected data category
     * @param e {CustomEvent} Event containing the data category string to remove
     */
    removeDataCategory(e: Event): void;
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

import { TemplateResult } from 'lit';
import { PrivacyRequestDemand } from '@blindnet/core';
import { ActionForm } from './bldn-action-form.js';
import '@blindnet/core-ui';
import '../bldn-date-restriction.js';
import '../bldn-provenance-restriction.js';
import '../bldn-additional-message.js';
/**
 * ActionForm for the Access PRIV action. Includes a dropdown and text element.
 */
export declare class BldnAccessForm extends ActionForm {
    /** @prop */
    dataCategories: string[];
    action: PrivacyRequestDemand.action;
    validateActionInput(): string[] | undefined;
    validateOptionsInput(): string[] | undefined;
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
    connectedCallback(): void;
    disconnectedCallback(): void;
    getFormTemplate(): TemplateResult<1 | 2>;
    getOptionsTemplate(): TemplateResult<1 | 2>;
    static styles: (import("lit").CSSResult | import("lit").CSSResultGroup[])[];
}

import { PrivacyRequestDemand, Restrictions } from '@blindnet/core';
import { PropertyValueMap, TemplateResult } from 'lit';
import { ActionForm } from './bldn-action-form.js';
import '../bldn-all-checklist.js';
/**
 * Action form for the TRANSPARENCY PRIV Action
 */
export declare class BldnTransparencyForm extends ActionForm {
    /** @prop */
    transparencyActions: PrivacyRequestDemand.action[];
    _restrictions: Restrictions;
    _message: string | undefined;
    action: PrivacyRequestDemand.action;
    validateActionInput(): string[] | undefined;
    validateOptionsInput(): string[] | undefined;
    getFormTemplate(): TemplateResult<1 | 2>;
    getOptionsTemplate(): TemplateResult<1 | 2>;
    getDefaultDemands(): PrivacyRequestDemand[];
    /**
     * Add a new demand to this demand group for the selected transparency action
     * @param e {CustomEvent} Event containing the transparency action to add
     */
    addTransparencyAction(e: Event): void;
    /**
     * Remove a demand from this demand group for the deselected transparency action
     * @param e {CustomEvent} Event containing the transparency action to remove
     */
    removeTransparencyAction(e: Event): void;
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
    /**
     * Set the restrictions and message states initially
     */
    handleDemandsChange(): void;
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    static styles: (import("lit").CSSResult | import("lit").CSSResultGroup[])[];
}

import { PrivacyRequestDemand } from '@blindnet/core';
import { TemplateResult } from 'lit';
import { ActionForm } from './bldn-action-form.js';
/**
 * Action form for the PORTABILITY PRIV Action
 */
export declare class BldnPortabilityForm extends ActionForm {
    action: PrivacyRequestDemand.action;
    validateActionInput(): string[] | undefined;
    validateOptionsInput(): string[] | undefined;
    getFormTemplate(): TemplateResult<1 | 2>;
    getOptionsTemplate(): TemplateResult<1 | 2>;
    getDefaultDemands(): PrivacyRequestDemand[];
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

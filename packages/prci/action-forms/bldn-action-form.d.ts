import { CSSResultGroup, LitElement, TemplateResult } from 'lit';
import { PrivacyRequestDemand } from '@blindnet/core';
import '../bldn-nav-wrapper.js';
import '../bldn-dropdown.js';
/**
 * Abstract class for a form that allows the user to create or edit a demand.
 */
export declare abstract class ActionForm extends LitElement {
    /** @prop */
    demandGroupIndex: undefined | number;
    /** @prop */
    demands: PrivacyRequestDemand[];
    /** Indicates that there is an error in the form input */
    hasError: boolean;
    /** Error message for input in the main form section, set by the validateActionInput function defined for each form. */
    mainInputErrorMessage: undefined | string[];
    /** Error message for input in the other options section, set by validateOptionsInput function defined for each form */
    optionsInputErrorMessage: undefined | string[];
    /** PRIV Action of this form */
    abstract readonly action: PrivacyRequestDemand.action;
    readonly includeOptions: boolean;
    /**
     * Send a demand group up to the request builder
     * @param demandGroupIndex index of the demand group to replace. If undefined,
     * will be treated as a new group of demands.
     * @param demand demands to add
     */
    addToPrivacyRequest(demandGroupIndex: undefined | number, demands: PrivacyRequestDemand[]): void;
    handleBackClick(): void;
    /**
     * Validate and add demand to request when add clicked
     */
    handleAddClick(): void;
    /**
     * Validate data entered and provide error message
     * @return Boolean indicating if the input is valid and if it is not valid, an error message.
     */
    validate(): boolean;
    /**
     * This method should return a list of error messages if the main content section of the
     * form is not valid. Otherwise, it should return undefined.
     */
    abstract validateActionInput(): undefined | string[];
    /**
     * This method should return a list of error messages if the other options section of the
     * form is not valid. Otherwise, it should return undefined.
     */
    abstract validateOptionsInput(): undefined | string[];
    /**
     * Get the main details section for this action form
     * @returns HTML template for the main details section
     */
    abstract getFormTemplate(): TemplateResult;
    /**
     * Get the additional other options section for this action form
     * @returns HTML template for the other options section
     */
    abstract getOptionsTemplate(): TemplateResult;
    abstract getDefaultDemands(): PrivacyRequestDemand[];
    render(): TemplateResult<1 | 2>;
    static styles: CSSResultGroup[];
}

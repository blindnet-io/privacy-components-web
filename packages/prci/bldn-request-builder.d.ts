import { LitElement, PropertyValueMap, TemplateResult } from 'lit';
import { PrivacyRequestDemand } from '@blindnet/core';
import './bldn-tile-menu.js';
import './bldn-request-review.js';
import './action-forms/bldn-access-form.js';
import './action-forms/bldn-delete-form.js';
import './action-forms/bldn-object-form.js';
import './action-forms/bldn-restrict-form.js';
import './action-forms/bldn-revoke-consent-form.js';
import './action-forms/bldn-transparency-form.js';
import './action-forms/bldn-other-form.js';
declare enum RequestBuilderUIState {
    menu = 0,
    edit = 1,
    review = 2
}
declare const BldnRequestBuilder_base: typeof LitElement & (new (...args: any[]) => import("@blindnet/core").CoreConfigurationMixinInterface);
export declare class BldnRequestBuilder extends BldnRequestBuilder_base {
    /** @prop */
    actions: PrivacyRequestDemand.action[];
    /** @prop */
    dataCategories: string[];
    _uiState: RequestBuilderUIState;
    _action: undefined | PrivacyRequestDemand.action;
    _demandGroupIndex: undefined | number;
    _demandGroups: PrivacyRequestDemand[][];
    _allowedActions: PrivacyRequestDemand.action[];
    _allowedDataCategories: string[];
    /**
     * Factory method to get the action form for a specific action
     * @param action Action of the form to return
     * @returns Template with an action form
     */
    private getActionForm;
    /**
     * Go to request builder after an action is clicked
     * @param e CustomEvent containing the clicked action
     */
    private selectAction;
    /**
     * Add a new demand group or update an existing one
     * @param e CustomEvent containing demands info
     */
    private setDemands;
    /**
     * Delete an existing demand group
     * @param e Event containing the index of the demand group to delete
     */
    private deleteDemands;
    private editDemands;
    private handleCancelRequest;
    private handleSubmitRequest;
    private handleBackClick;
    private handleReviewClick;
    private updateDataCategories;
    /**
     * Filter our list of actions based on those passed in
     */
    private handleActionsChange;
    private handleTokenChange;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export {};

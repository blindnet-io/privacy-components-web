import { LitElement, PropertyValueMap, TemplateResult } from 'lit';
import { PrivacyRequestDemand } from '@blindnet/core';
import '@blindnet/core-ui';
import './bldn-request-review.js';
import './action-forms/index.js';
declare enum RequestBuilderUIState {
    preModules = 0,
    menu = 1,
    edit = 2,
    postModules = 3,
    review = 4
}
declare const BldnRequestBuilder_base: typeof LitElement & (new (...args: any[]) => import("@blindnet/core").CoreConfigurationMixinInterface);
/**
 * Interface for building privacy requests
 *
 * @event {CustomEvent} bldn-request-builder:request-created Event containing request object in details
 * @event {CustomEvent} bldn-request-builder:request-sent Event containing request ID in details.
 *     Only emitted if using with PCE.
 */
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
    _preAddons: Element[];
    _postAddons: Element[];
    _currentPreAddon: number;
    _currentPostAddon: number;
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
    private handleReviewBack;
    private handleSubmitRequest;
    private handleBackClick;
    private handleReviewClick;
    private handleModuleBack;
    private handleModuleNext;
    private updateDataCategories;
    /**
     * Filter our list of actions based on those passed in
     */
    private handleActionsChange;
    private handleTokenChange;
    handlePreAddonSlotChange(e: Event): void;
    handlePostAddonSlotChange(e: Event): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export {};

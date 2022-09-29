import { LitElement, PropertyValueMap, TemplateResult } from 'lit';
import { DATA_CATEGORY, Demand, PrivacyRequest, ACTION } from '@blindnet/core';
import { ComponentState } from './utils/states.js';
import './FrequentRequestsMenu.js';
import './ReviewView.js';
import './ActionMenuView.js';
import './RequestsView.js';
import './StatusView.js';
import './demand-forms/TransparencyForm.js';
import './demand-forms/AccessForm.js';
import './demand-forms/DeleteForm.js';
import './demand-forms/RevokeConsentForm.js';
declare const BldnPrivRequest_base: typeof LitElement & (new (...args: any[]) => import("@blindnet/core").CoreConfigurationMixinInterface);
/**
 * Top level component encapsulating a single PrivacyRequest. Contains one or
 * more DemandBuilder elements, each for a single demand action type.
 *
 */
export declare class BldnPrivRequest extends BldnPrivRequest_base {
    static styles: import("lit").CSSResult[];
    /** JSON list of allowed actions */
    actions: string;
    /** JSON list of allowed data categories */
    dataCategories: string;
    /** @prop {string} requestId - a request ID. If provided, the initial PRCI view will be the status page for the provided request ID */
    requestId: string;
    _includedActions: ACTION[];
    _includedDataCategories: DATA_CATEGORY[];
    _currentRequestId: string;
    _currentDemandGroupId: string;
    _currentAction: ACTION;
    _privacyRequest: PrivacyRequest;
    _demands: Map<string, Demand[]>;
    _config: {
        'access-allowed-data-categories': DATA_CATEGORY[];
        'delete-allowed-data-categories': DATA_CATEGORY[];
    };
    _componentState: ComponentState;
    constructor();
    private setMultipleDemands;
    private setDemand;
    private deleteDemand;
    private changeRequestTarget;
    private submitRequest;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * Reset most states
     * // TODO: Remove this and use something like getDefaultDemand() from the forms
     */
    handleRestartClick(): void;
    /**
     * Return a form based on action type with either default or prepopulated demand data
     * @param action PRIV action for which to return a form
     * @returns
     */
    actionFormFactory(action: ACTION): TemplateResult<1>;
    getHeadingString(componentState: ComponentState): TemplateResult<1 | 2>;
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): TemplateResult<1>;
}
export {};

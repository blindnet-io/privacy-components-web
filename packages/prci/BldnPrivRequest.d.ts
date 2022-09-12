import { LitElement, PropertyValueMap, TemplateResult } from 'lit';
import '@blindnet/core';
import './FrequentRequestsMenu.js';
import './ReviewView.js';
import './ActionMenu.js';
import './RequestsView.js';
import './StatusView.js';
import './demand-forms/TransparencyForm.js';
import './demand-forms/AccessForm.js';
import './demand-forms/DeleteForm.js';
import './demand-forms/RevokeConsentForm.js';
import { ACTION } from './models/priv-terms.js';
import { PrivacyRequest } from './models/privacy-request.js';
import { ComponentState } from './utils/states.js';
import { Demand } from './models/demand.js';
/**
 * Top level component encapsulating a single PrivacyRequest. Contains one or
 * more DemandBuilder elements, each for a single demand action type.
 */
export declare class BldnPrivRequest extends LitElement {
    static styles: import("lit").CSSResult[];
    actions: string;
    _includedActions: ACTION[];
    _componentState: ComponentState;
    _selectedAction: ACTION;
    _privacyRequest: PrivacyRequest;
    _demands: Map<string, Demand[]>;
    _currentDemandGroupId: string;
    _currentRequestId: string;
    _config: {
        'access-allowed-data-categories': import("./models/priv-terms.js").DATA_CATEGORY[];
        'delete-allowed-data-categories': import("./models/priv-terms.js").DATA_CATEGORY[];
    };
    constructor();
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

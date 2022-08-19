import { LitElement, PropertyValueMap } from 'lit';
import './FrequentRequestsMenu.js';
import './ResponseView.js';
import './ReviewView.js';
import './ActionMenu.js';
import './demand-forms/TransparencyForm.js';
import { ACTION } from './models/priv-terms.js';
import { PrivacyRequest } from './models/privacy-request.js';
import { ComponentState } from './utils/states.js';
import { Demand } from './models/demand.js';
/**
 * Top level component encapsulating a single PrivacyRequest. Contains one or
 * more DemandBuilder elements, each for a single demand action type.
 */
export declare class BldnPrivRequest extends LitElement {
    actions: string;
    _includedActions: ACTION[];
    _componentState: ComponentState;
    _selectedAction: ACTION;
    _privacyRequest: PrivacyRequest;
    _demands: Map<string, Demand[]>;
    _currentDemandGroupId: string;
    constructor();
    static styles: import("lit").CSSResult[];
    handleSubmitClick(): void;
    /**
     * Reset most states
     */
    handleRestartClick(): void;
    actionFormFactory(action: ACTION): import("lit").TemplateResult<1>;
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): import("lit").TemplateResult<1>;
}

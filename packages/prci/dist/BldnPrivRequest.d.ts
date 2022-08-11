import { LitElement, PropertyValueMap } from 'lit';
import './DemandBuilder.js';
import './RequestProgressIndicator.js';
import './FrequentRequestsMenu.js';
import './ResponseView.js';
import { ACTION } from './models/priv-terms.js';
import { PrivacyRequest } from './models/privacy-request.js';
import { PrivacyResponse } from './models/privacy-response.js';
import { RequestState } from './utils/states.js';
import { Demand } from './models/demand.js';
/**
 * Top level component encapsulating a single PrivacyRequest. Contains one or
 * more DemandBuilder elements, each for a single demand action type.
 */
export declare class BldnPrivRequest extends LitElement {
    actions: string;
    _includedActions: ACTION[];
    _requestState: RequestState;
    _privacyRequest: PrivacyRequest;
    _demands: Map<string, Demand>;
    _demandBuilders: Map<string, boolean>;
    _showButtons: boolean;
    _buttonsClickable: boolean;
    _privacyResponse: PrivacyResponse;
    constructor();
    static styles: import("lit").CSSResult;
    handleSubmitClick(): void;
    /**
     * Switch request to the review state, causing all demand builders to switch
     */
    handleReviewClick(): void;
    /**
     * Reset most states
     */
    handleRestartClick(): void;
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): import("lit").TemplateResult<1>;
}

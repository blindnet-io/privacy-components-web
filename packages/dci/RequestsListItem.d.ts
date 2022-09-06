import { LitElement, PropertyValueMap } from 'lit';
import { PendingDemandResponse } from './models/pending-demand-response.js';
import { PendingRequestsResponse } from './models/pending-requests-response.js';
declare enum REQ_ITEM_UI_STATE {
    PENDING_DECISION = 0,
    APPROVED = 1,
    DENIED = 2
}
/**
 * A single item in the pending requests list
 */
export declare class RequestsListItem extends LitElement {
    static styles: import("lit").CSSResult[];
    demand: PendingRequestsResponse;
    _open: boolean;
    _demandDetails: PendingDemandResponse | undefined;
    _uiState: REQ_ITEM_UI_STATE;
    _message: string;
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    handleApproveDemandClick(): void;
    handleDenyDemandClick(): void;
    handleMessageInput(e: Event): void;
    render(): import("lit-html").TemplateResult<1>;
}
export {};

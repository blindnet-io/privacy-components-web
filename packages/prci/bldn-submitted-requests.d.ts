import { PrItem } from '@blindnet/core';
import { LitElement, PropertyValueMap } from 'lit';
import './bldn-submitted-requests-list.js';
import './bldn-request-status.js';
declare enum RequestsUIState {
    requestsList = 0,
    requestStatus = 1
}
declare const BldnSubmittedRequests_base: typeof LitElement & (new (...args: any[]) => import("@blindnet/core").CoreConfigurationMixinInterface);
export declare class BldnSubmittedRequests extends BldnSubmittedRequests_base {
    requestId: string | undefined;
    _requests: PrItem[] | undefined;
    _requestFilter: 'all' | 'pending' | 'answered' | 'canceled';
    _uiState: RequestsUIState;
    _selectedRequest: string | undefined;
    handleRequestsCategoryChange(e: Event): void;
    handleRequestClick(e: Event): void;
    handleBackClick(): void;
    /**
     * Get submitted requests once we have a token
     */
    getRequests(): void;
    getRequestsToDisplay(): PrItem[] | undefined;
    goToStatus(): void;
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export {};

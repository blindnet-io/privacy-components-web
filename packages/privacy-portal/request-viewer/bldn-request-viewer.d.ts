import { PrItem } from '@blindnet/core';
import { LitElement, PropertyValueMap } from 'lit';
import './bldn-submitted-requests-list.js';
import './bldn-request-status.js';
declare enum RequestViewerUIState {
    requestsList = 0,
    requestStatus = 1
}
declare const BldnRequestViewer_base: typeof LitElement & (new (...args: any[]) => import("@blindnet/core").CoreConfigurationMixinInterface);
export declare class BldnRequestViewer extends BldnRequestViewer_base {
    requestId: string | undefined;
    _requests: PrItem[] | undefined;
    _requestFilter: 'all' | 'pending' | 'answered' | 'canceled';
    _uiState: RequestViewerUIState;
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

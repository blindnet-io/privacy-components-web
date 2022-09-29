import { LitElement, PropertyValueMap } from 'lit';
import { PrivacyResponseItem } from '@blindnet/core';
import './StatusViewItem.js';
/**
 * View the status of a Privacy Request
 */
export declare class StatusView extends LitElement {
    static styles: import("lit").CSSResult[];
    requestId: string;
    newRequest: boolean;
    _requestDate: Date;
    _completedDemands: PrivacyResponseItem[];
    _processingDemands: PrivacyResponseItem[];
    _cancelledDemands: PrivacyResponseItem[];
    _intervalId: any;
    reloadRequest(): void;
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    handleCopyIdClick(): void;
    handleCopyLinkClick(): void;
    handleBackClick(): void;
    handleNewRequestClick(): void;
    render(): import("lit-html").TemplateResult<1>;
}

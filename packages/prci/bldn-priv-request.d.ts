import { PrivacyRequestDemand } from '@blindnet/core';
import { LitElement, PropertyValueMap } from 'lit';
import './bldn-request-builder.js';
import './bldn-submitted-requests.js';
declare enum PRCIUIState {
    createRequest = 0,
    submittedRequests = 1
}
declare const BldnPrivRequest_base: typeof LitElement & (new (...args: any[]) => import("@blindnet/core").CoreConfigurationMixinInterface);
export declare class BldnPrivRequest extends BldnPrivRequest_base {
    /** @prop */
    actions: PrivacyRequestDemand.action[];
    /** @prop */
    dataCategories: string[];
    /** @prop */
    requestId: undefined | string;
    _uiState: PRCIUIState;
    constructor();
    handleRequestIdChange(): void;
    handleRequestSent(e: Event): void;
    handleNavClick(e: Event): void;
    /**
     * Set the apiToken property when component catches the set event
     * @param e CustomEvent containing the token in the details object
     */
    handleApiTokenEvent(e: Event): void;
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
export {};

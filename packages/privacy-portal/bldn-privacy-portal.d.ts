import { PrivacyRequestDemand } from '@blindnet/core';
import { LitElement, PropertyValueMap } from 'lit';
import './request-builder/bldn-request-builder.js';
import './request-viewer/bldn-request-viewer.js';
declare enum PrivacyPortalUIState {
    createRequest = 0,
    submittedRequests = 1
}
declare const BldnPrivacyPortal_base: typeof LitElement & (new (...args: any[]) => import("@blindnet/core").CoreConfigurationMixinInterface);
export declare class BldnPrivacyPortal extends BldnPrivacyPortal_base {
    /** @prop */
    actions: PrivacyRequestDemand.action[];
    /** @prop */
    dataCategories: string[];
    /** @prop */
    requestId: undefined | string;
    _uiState: PrivacyPortalUIState;
    _preAddons: Element[];
    _postAddons: Element[];
    constructor();
    handleRequestIdChange(): void;
    handleRequestSent(e: Event): void;
    handleNavClick(e: Event): void;
    /**
     * Set the apiToken property when component catches the set event
     * @param e CustomEvent containing the token in the details object
     */
    handleApiTokenEvent(e: Event): void;
    handlePreAddonSlotChange(e: Event): void;
    handlePostAddonSlotChange(e: Event): void;
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
export {};

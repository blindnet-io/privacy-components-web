import { LitElement, PropertyValueMap } from 'lit';
import '@blindnet/core-ui';
import './bldn-bridge-requests.js';
import './bldn-bridge-alerts.js';
import { PendingDemandPayload } from '@blindnet/core';
declare enum BridgeUIState {
    requests = 0,
    alerts = 1
}
declare const BldnBridge_base: typeof LitElement & (new (...args: any[]) => import("@blindnet/core").CoreConfigurationMixinInterface);
export declare class BldnBridge extends BldnBridge_base {
    _uiState: BridgeUIState;
    _demands: PendingDemandPayload[];
    constructor();
    handleViewToggleChange(e: CustomEvent): void;
    connectedCallback(): void;
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export {};

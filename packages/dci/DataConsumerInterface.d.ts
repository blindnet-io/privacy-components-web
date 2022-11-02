import { LitElement, PropertyValueMap } from 'lit';
import { PendingDemandPayload } from '@blindnet/core';
declare enum DCIUIState {
    requests = 0,
    alerts = 1
}
declare const DataConsumerInterface_base: typeof LitElement & (new (...args: any[]) => import("@blindnet/core").CoreConfigurationMixinInterface);
export declare class DataConsumerInterface extends DataConsumerInterface_base {
    _uiState: DCIUIState;
    _demands: PendingDemandPayload[];
    handleViewToggleChange(e: CustomEvent): void;
    connectedCallback(): void;
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export {};

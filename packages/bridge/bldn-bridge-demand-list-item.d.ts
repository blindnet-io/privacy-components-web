import { LitElement, PropertyValueMap } from 'lit';
import { PendingDemandDetailsPayload, PendingDemandPayload, Recommendation } from '@blindnet/core';
declare enum DropdownUIState {
    Respond = 0,
    History = 1,
    Responded = 2
}
export declare class BldnBridgeDemandListItem extends LitElement {
    demand: PendingDemandPayload | undefined;
    _demandDetails: PendingDemandDetailsPayload | undefined;
    _open: boolean;
    _dropdownUiState: DropdownUIState;
    _selectedResponseType: Recommendation.status | undefined;
    _message: string;
    isRecommended(): boolean;
    handleDropdownToggleChange(e: CustomEvent): void;
    handleMessageInput(e: Event): void;
    handleSubmitClick(): void;
    getRadioSVG(selected: boolean): import("lit-html").TemplateResult<1>;
    getArrowSVG(type: 'open' | 'close'): import("lit-html").TemplateResult<1>;
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
export {};

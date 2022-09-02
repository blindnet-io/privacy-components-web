import { LitElement } from 'lit';
import './ProcessRequestsView.js';
import './RequestHistoryView.js';
import './SettingsView.js';
declare enum DCI_UI_STATE {
    PROCESS_REQUESTS = 0,
    REQUEST_HISTORY = 1,
    SETTINGS = 2
}
export declare class DataConsumerInterface extends LitElement {
    static styles: import("lit").CSSResult[];
    _uiState: DCI_UI_STATE;
    render(): import("lit-html").TemplateResult<1>;
}
export {};

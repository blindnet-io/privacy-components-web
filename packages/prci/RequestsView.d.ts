import { LitElement } from 'lit';
import { RequestHistoryItem } from './models/history-response.js';
export declare class RequestsView extends LitElement {
    _requests: RequestHistoryItem[];
    constructor();
    static styles: import("lit").CSSResult[];
    handleRequestClick(e: Event): void;
    handleNewRequestClick(): void;
    render(): import("lit").TemplateResult<1>;
}

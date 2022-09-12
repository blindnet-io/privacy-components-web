import { LitElement } from 'lit';
import { RequestHistoryItem } from './models/history-response.js';
export declare class RequestsView extends LitElement {
    static styles: import("lit").CSSResult[];
    _requests: RequestHistoryItem[];
    constructor();
    handleRequestClick(e: Event): void;
    handleNewRequestClick(): void;
    render(): import("lit-html").TemplateResult<1>;
}

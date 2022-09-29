import { LitElement } from 'lit';
import { RequestHistoryItem } from '@blindnet/core';
export declare class RequestsView extends LitElement {
    static styles: import("lit").CSSResult[];
    _requests: RequestHistoryItem[];
    connectedCallback(): void;
    handleRequestClick(e: Event): void;
    handleNewRequestClick(): void;
    render(): import("lit-html").TemplateResult<1>;
}

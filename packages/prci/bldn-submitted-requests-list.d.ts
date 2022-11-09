import { PrItem } from '@blindnet/core';
import { LitElement } from 'lit';
export declare class BldnSubmittedRequestsList extends LitElement {
    requests: PrItem[] | undefined;
    handleItemClick(id: string): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}

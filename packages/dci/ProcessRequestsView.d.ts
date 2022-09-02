import { LitElement } from 'lit';
import { PendingRequestsResponse } from './models/pending-requests-response.js';
import './RequestsListItem.js';
export declare class ProcessRequestsView extends LitElement {
    static styles: import("lit").CSSResult[];
    constructor();
    _demands: PendingRequestsResponse[];
    _intervalId: any;
    reloadRequests(): void;
    render(): import("lit-html").TemplateResult<1>;
}

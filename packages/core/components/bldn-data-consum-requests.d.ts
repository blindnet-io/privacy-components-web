import { LitElement } from 'lit';
import { PendingDemandPayload } from '../models/generated-models/index.js';
export declare class DataConsumerRequests extends LitElement {
    demands: PendingDemandPayload[];
    constructor();
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}

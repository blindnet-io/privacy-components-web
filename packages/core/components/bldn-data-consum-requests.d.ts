import { LitElement } from 'lit';
import { PendingDemandPayload } from '../computation/generated-models/index.js';
export declare class DataConsumerRequests extends LitElement {
    demands: PendingDemandPayload[];
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}

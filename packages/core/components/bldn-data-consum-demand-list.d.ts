import { LitElement } from 'lit';
import './bldn-data-consum-demand-list-item.js';
import { PendingDemandPayload } from '../models/generated-models/index.js';
export declare class DataConsumerDemandList extends LitElement {
    demands: PendingDemandPayload[];
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}

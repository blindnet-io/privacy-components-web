import { LitElement } from 'lit';
import { PendingDemandPayload } from '@blindnet/core';
import './bldn-bridge-demand-list-item.js';
export declare class BldnBridgeDemandList extends LitElement {
    demands: PendingDemandPayload[];
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}

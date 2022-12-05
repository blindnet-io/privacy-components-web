import { LitElement } from 'lit';
import { PendingDemandPayload } from '@blindnet/core';
import '@blindnet/core-ui';
import './bldn-bridge-demand-list.js';
export declare class BldnBridgeRequests extends LitElement {
    demands: PendingDemandPayload[];
    constructor();
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}

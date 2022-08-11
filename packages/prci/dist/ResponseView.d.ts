import { LitElement, TemplateResult } from 'lit';
import { DemandResponse, PrivacyResponse } from './models/privacy-response.js';
/**
 * View the response to a privacy request.
 */
export declare class ResponseView extends LitElement {
    response: PrivacyResponse;
    static styles: import("lit").CSSResult;
    accessTemplate(demand: DemandResponse): TemplateResult;
    deleteTemplate(demand: DemandResponse): TemplateResult;
    modifyTemplate(demand: DemandResponse): TemplateResult;
    objectTemplate(demand: DemandResponse): TemplateResult;
    revokeTemplate(demand: DemandResponse): TemplateResult;
    restrictTemplate(demand: DemandResponse): TemplateResult;
    portabilityTemplate(demand: DemandResponse): TemplateResult;
    transparencyStandardTemplate(demand: DemandResponse): TemplateResult<1>;
    transparencyAllTemplate(demand: DemandResponse): TemplateResult;
    transparencyDataCatTemplate(demand: DemandResponse): TemplateResult;
    transparencyDpoTemplate(demand: DemandResponse): TemplateResult<1>;
    transparencyKnownTemplate(demand: DemandResponse): TemplateResult;
    transparencyLegalTemplate(demand: DemandResponse): TemplateResult;
    transparencyOrgTemplate(demand: DemandResponse): TemplateResult;
    transparencyPolicyTemplate(demand: DemandResponse): TemplateResult;
    transparencyProcessTemplate(demand: DemandResponse): TemplateResult;
    transparencyProvTemplate(demand: DemandResponse): TemplateResult;
    transparencyPurposeTemplate(demand: DemandResponse): TemplateResult;
    transparencyRetentionTemplate(demand: DemandResponse): TemplateResult;
    transparencyWhoTemplate(demand: DemandResponse): TemplateResult;
    transparencyWhereTemplate(demand: DemandResponse): TemplateResult;
    otherDemandTemplate(demand: DemandResponse): TemplateResult;
    render(): TemplateResult<1>;
}

import { LitElement, TemplateResult } from 'lit';
import { PrivacyResponse } from './models/privacy-response.js';
/**
 * View the response to a privacy request.
 */
export declare class ResponseView extends LitElement {
    response: PrivacyResponse[];
    static styles: import("lit").CSSResult;
    accessTemplate(response: PrivacyResponse): TemplateResult;
    deleteTemplate(response: PrivacyResponse): TemplateResult;
    modifyTemplate(response: PrivacyResponse): TemplateResult;
    objectTemplate(response: PrivacyResponse): TemplateResult;
    revokeTemplate(response: PrivacyResponse): TemplateResult;
    restrictTemplate(response: PrivacyResponse): TemplateResult;
    portabilityTemplate(response: PrivacyResponse): TemplateResult;
    transparencyStandardTemplate(response: PrivacyResponse): TemplateResult<1>;
    transparencyAllTemplate(response: PrivacyResponse): TemplateResult;
    transparencyDataCatTemplate(response: PrivacyResponse): TemplateResult;
    transparencyDpoTemplate(response: PrivacyResponse): TemplateResult<1>;
    transparencyKnownTemplate(response: PrivacyResponse): TemplateResult;
    transparencyLegalTemplate(response: PrivacyResponse): TemplateResult;
    transparencyOrgTemplate(response: PrivacyResponse): TemplateResult;
    transparencyPolicyTemplate(response: PrivacyResponse): TemplateResult;
    transparencyProcessTemplate(response: PrivacyResponse): TemplateResult;
    transparencyProvTemplate(response: PrivacyResponse): TemplateResult;
    transparencyPurposeTemplate(response: PrivacyResponse): TemplateResult;
    transparencyRetentionTemplate(response: PrivacyResponse): TemplateResult;
    transparencyWhoTemplate(response: PrivacyResponse): TemplateResult;
    transparencyWhereTemplate(response: PrivacyResponse): TemplateResult;
    otherDemandTemplate(response: PrivacyResponse): TemplateResult;
    render(): TemplateResult<1>;
}

import { LitElement } from 'lit';
import { PrivacyResponseItem } from './models/privacy-response.js';
/**
 * Status for a single demand in a Privacy Request
 */
export declare class StatusViewItem extends LitElement {
    static styles: import("lit").CSSResult[];
    demand: PrivacyResponseItem;
    demands: PrivacyResponseItem[];
    open: boolean;
    accessResponseTemplate(demand: PrivacyResponseItem): import("lit-html").TemplateResult<1>;
    deleteResponseTemplate(): import("lit-html").TemplateResult<1>;
    transparencyResponseTemplate(demand: PrivacyResponseItem): import("lit-html").TemplateResult<1>;
    transparencyDcTemplate(demand: PrivacyResponseItem): import("lit-html").TemplateResult<1>;
    transparencyDpoTemplate(demand: PrivacyResponseItem): import("lit-html").TemplateResult<1>;
    transparencyKnownTemplate(demand: PrivacyResponseItem): import("lit-html").TemplateResult<1>;
    transparencyLbTemplate(demand: PrivacyResponseItem): import("lit-html").TemplateResult<1>;
    transparencyOrgTemplate(demand: PrivacyResponseItem): import("lit-html").TemplateResult<1>;
    transparencyPolicyTemplate(demand: PrivacyResponseItem): import("lit-html").TemplateResult<1>;
    transparencyPcTemplate(demand: PrivacyResponseItem): import("lit-html").TemplateResult<1>;
    transparencyProvTemplate(demand: PrivacyResponseItem): import("lit-html").TemplateResult<1>;
    transparencyPurposeTemplate(demand: PrivacyResponseItem): import("lit-html").TemplateResult<1>;
    transparencyRetTemplate(demand: PrivacyResponseItem): import("lit-html").TemplateResult<1>;
    transparencyWhereTemplate(demand: PrivacyResponseItem): import("lit-html").TemplateResult<1>;
    transparencyWhoTemplate(demand: PrivacyResponseItem): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
}

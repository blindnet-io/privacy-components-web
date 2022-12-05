import { PrivacyResponsePayload, RetentionPolicy } from '@blindnet/core';
import { LitElement, PropertyValueMap } from 'lit';
import '@blindnet/core-ui';
/**
 * Get a user friendly string for a retention policy
 * @param dataCategory Data category the policy pertains to
 * @param policy Type of the policy
 * @param duration String quantifying the duration, e.g. 10 months
 * @param after Point after which the data is kept
 * @returns String combining the provided information to represent a retention policy
 */
export declare function getRetentionPolicyString(dataCategory: string, policyType: RetentionPolicy.policy_type, duration: string, after: RetentionPolicy.after): import("lit-html").TemplateResult<1>;
/**
 * Get a link to the status page for the request denoted by requestId
 * @param requestId ID of the privacy request
 * @returns
 */
export declare function getRequestLink(requestId: string): URL;
declare const BldnRequestStatus_base: typeof LitElement & (new (...args: any[]) => import("@blindnet/core").CoreConfigurationMixinInterface);
export declare class BldnRequestStatus extends BldnRequestStatus_base {
    requestId: string | undefined;
    _requestDetails: PrivacyResponsePayload[];
    _error: boolean;
    getRequestDetails(): void;
    handleCopyLinkClick(): void;
    handleDownloadClick(demand: PrivacyResponsePayload): void;
    handleCancelClick(demand: PrivacyResponsePayload): void;
    handleRefreshClick(): void;
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
    getStatusTemplate(demand: PrivacyResponsePayload): import("lit-html").TemplateResult<1>;
    getGrantedResponseTemplate(demand: PrivacyResponsePayload): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export {};

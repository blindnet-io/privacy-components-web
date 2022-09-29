import { Demand, ACTION, AFTER, DATA_CATEGORY, POLICY_TYPE } from '@blindnet/core';
export declare function getDefaultActions(): ACTION[];
export declare function getDefaultDataCategories(): DATA_CATEGORY[];
export declare function getDefaultDemand(action: ACTION): Demand;
export declare function getDefaultDemands(action: ACTION): Demand[];
/**
 * Get a user friendly string for a retention policy
 * @param dataCategory Data category the policy pertains to
 * @param policy Type of the policy
 * @param duration String quantifying the duration, e.g. 10 months
 * @param after Point after which the data is kept
 * @returns String combining the provided information to represent a retention policy
 */
export declare function getRetentionPolicyString(dataCategory: DATA_CATEGORY, policyType: POLICY_TYPE, duration: string, after: AFTER): import("lit-html").TemplateResult<1>;
/**
 * Get a link to the status page for the request denoted by requestId
 * @param requestId ID of the privacy request
 * @returns
 */
export declare function getRequestLink(requestId: string): URL;
/**
 * Remove a query parameter from current window URL without reloading the page
 * @param param string denoting the query parameter
 */
export declare function removeQueryParam(param: string): void;

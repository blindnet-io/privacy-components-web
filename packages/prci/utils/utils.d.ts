import { Demand } from '../models/demand.js';
import { ACTION, AFTER, DATA_CATEGORY, POLICY_TYPE } from '../models/priv-terms.js';
export declare function getDefaultActions(): ACTION[];
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
export declare function getRetentionPolicyString(dataCategory: DATA_CATEGORY, policyType: POLICY_TYPE, duration: string, after: AFTER): import("lit").TemplateResult<1>;

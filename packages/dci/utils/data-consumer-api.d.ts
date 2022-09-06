import { MOTIVE } from '@blindnet/prci/dist/models/priv-terms.js';
import { PendingDemandResponse } from '../models/pending-demand-response.js';
import { PendingRequestsResponse } from '../models/pending-requests-response.js';
/**
 * Gets a list of all demands which are pending a response
 * @returns {PendingRequestsResponse[]}
 */
export declare function getPendingDemands(): Promise<PendingRequestsResponse[]>;
/**
 * Get the info and recomendation for a specific demand
 * @param {string} id uuid of the demand
 * @returns {PendingDemandResponse}
 */
export declare function getPendingDemand(id: string): Promise<PendingDemandResponse>;
/**
 * Approve a demand
 * @param id uuid of the demand to approve
 * @param msg optional message explaining the approval
 * @param lang language of the message
 * @returns
 */
export declare function approveDemand(id: string, msg: string, lang?: string): Promise<void>;
/**
 * Deny a demand
 * @param id uuid of the demand to deny
 * @param msg optional message explaining the denial
 * @param motive motive for the denial. for the DCI, we are in the situation where demands
 * are being manually processed, so we assume the motive will be explained in msg and default to
 * 'OTHER-MOTIVE'.
 * @param lang language of the message
 * @returns
 */
export declare function denyDemand(id: string, msg: string, motive?: MOTIVE, lang?: string): Promise<void>;

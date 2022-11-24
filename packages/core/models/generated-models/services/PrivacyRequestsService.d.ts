import type { CancelDemandPayload } from '../models/CancelDemandPayload.js';
import type { CreatePrivacyRequestPayload } from '../models/CreatePrivacyRequestPayload.js';
import type { PrivacyRequestCreatedPayload } from '../models/PrivacyRequestCreatedPayload.js';
import type { PrivacyResponsePayload } from '../models/PrivacyResponsePayload.js';
import type { RequestHistoryPayload } from '../models/RequestHistoryPayload.js';
import type { CancelablePromise } from '../core/CancelablePromise.js';
export declare class PrivacyRequestsService {
    /**
     * Create a privacy request
     * @param requestBody
     * @returns PrivacyRequestCreatedPayload
     * @throws ApiError
     */
    static postV0PrivacyRequest(requestBody: CreatePrivacyRequestPayload): CancelablePromise<PrivacyRequestCreatedPayload>;
    /**
     * Get history of privacy requests
     * @param authorization
     * @returns RequestHistoryPayload
     * @throws ApiError
     */
    static getV0PrivacyRequestHistory(authorization: string): CancelablePromise<RequestHistoryPayload>;
    /**
     * Get privacy request status
     * @param requestId
     * @param authorization
     * @returns PrivacyResponsePayload
     * @throws ApiError
     */
    static getV0PrivacyRequestRequestid(requestId: string, authorization: string): CancelablePromise<Array<PrivacyResponsePayload>>;
    /**
     * Cancel a pending demand
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postV0PrivacyRequestCancel(authorization: string, requestBody: CancelDemandPayload): CancelablePromise<any>;
}

import type { ApproveDemandPayload } from '../models/ApproveDemandPayload.js';
import type { DenyDemandPayload } from '../models/DenyDemandPayload.js';
import type { PendingDemandDetailsPayload } from '../models/PendingDemandDetailsPayload.js';
import type { PendingDemandPayload } from '../models/PendingDemandPayload.js';
import type { CancelablePromise } from '../core/CancelablePromise.js';
export declare class DataConsumerInterfaceService {
    /**
     * Get the list of pending privacy request demands
     * @returns PendingDemandPayload
     * @throws ApiError
     */
    static getV0ConsumerInterfacePendingRequests(): CancelablePromise<Array<PendingDemandPayload>>;
    /**
     * Get details of a pending privacy request
     * @param demandId
     * @returns PendingDemandDetailsPayload
     * @throws ApiError
     */
    static getV0ConsumerInterfacePendingRequestsDemandid(demandId: string): CancelablePromise<PendingDemandDetailsPayload>;
    /**
     * Approve privacy request
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postV0ConsumerInterfacePendingRequestsApprove(requestBody: ApproveDemandPayload): CancelablePromise<any>;
    /**
     * Deny privacy request
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postV0ConsumerInterfacePendingRequestsDeny(requestBody: DenyDemandPayload): CancelablePromise<any>;
}

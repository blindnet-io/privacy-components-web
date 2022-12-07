import { OpenAPI } from '../core/OpenAPI.js';
import { request } from '../core/request.js';

class DataConsumerInterfaceService {
    /**
     * Get the list of pending privacy request demands
     * @returns PendingDemandPayload
     * @throws ApiError
     */
    static getV0ConsumerInterfacePendingRequests() {
        return request(OpenAPI, {
            method: 'GET',
            url: '/v0/bridge/pending-requests',
        });
    }
    /**
     * Get details of a pending privacy request
     * @param demandId
     * @returns PendingDemandDetailsPayload
     * @throws ApiError
     */
    static getV0ConsumerInterfacePendingRequestsDemandid(demandId) {
        return request(OpenAPI, {
            method: 'GET',
            url: '/v0/bridge/pending-requests/{demandId}',
            path: {
                demandId: demandId,
            },
            errors: {
                400: `Invalid value for: path parameter demandId`,
            },
        });
    }
    /**
     * Approve privacy request
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postV0ConsumerInterfacePendingRequestsApprove(requestBody) {
        return request(OpenAPI, {
            method: 'POST',
            url: '/v0/bridge/pending-requests/approve',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Deny privacy request
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postV0ConsumerInterfacePendingRequestsDeny(requestBody) {
        return request(OpenAPI, {
            method: 'POST',
            url: '/v0/bridge/pending-requests/deny',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}

export { DataConsumerInterfaceService };
//# sourceMappingURL=DataConsumerInterfaceService.js.map

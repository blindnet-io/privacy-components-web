import { OpenAPI } from '../core/OpenAPI.js';
import { request } from '../core/request.js';

class PrivacyRequestsService {
    /**
     * Create a privacy request
     * @param requestBody
     * @returns PrivacyRequestCreatedPayload
     * @throws ApiError
     */
    static postV0PrivacyRequest(requestBody) {
        return request(OpenAPI, {
            method: 'POST',
            url: '/v0/privacy-request',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid value for: body`,
            },
        });
    }
    /**
     * Get history of privacy requests
     * @param authorization
     * @returns RequestHistoryPayload
     * @throws ApiError
     */
    static getV0PrivacyRequestHistory(authorization) {
        return request(OpenAPI, {
            method: 'GET',
            url: '/v0/privacy-request/history',
            headers: {
                Authorization: authorization,
            },
            errors: {
                400: `Invalid value for: header Authorization`,
            },
        });
    }
    /**
     * Get privacy request status
     * @param requestId
     * @param authorization
     * @returns PrivacyResponsePayload
     * @throws ApiError
     */
    static getV0PrivacyRequestRequestid(requestId, authorization) {
        return request(OpenAPI, {
            method: 'GET',
            url: '/v0/privacy-request/{requestId}',
            path: {
                requestId: requestId,
            },
            headers: {
                Authorization: authorization,
            },
            errors: {
                400: `Invalid value for: path parameter requestId, Invalid value for: header Authorization`,
            },
        });
    }
    /**
     * Cancel a pending demand
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postV0PrivacyRequestCancel(authorization, requestBody) {
        return request(OpenAPI, {
            method: 'POST',
            url: '/v0/privacy-request/cancel',
            headers: {
                Authorization: authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid value for: header Authorization, Invalid value for: body`,
            },
        });
    }
}

export { PrivacyRequestsService };
//# sourceMappingURL=PrivacyRequestsService.js.map

import { OpenAPI } from '../core/OpenAPI.js';
import { request } from '../core/request.js';

class CallbacksService {
    /**
     * Link to access data in the storage created
     * @param callbackId
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postV0CallbackCallbackid(callbackId, requestBody) {
        return request(OpenAPI, {
            method: 'POST',
            url: '/v0/callback/{callbackId}',
            path: {
                callbackId: callbackId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid value for: path parameter callbackId, Invalid value for: body`,
            },
        });
    }
}

export { CallbacksService };
//# sourceMappingURL=CallbacksService.js.map

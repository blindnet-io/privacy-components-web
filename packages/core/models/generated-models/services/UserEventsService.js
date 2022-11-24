import { OpenAPI } from '../core/OpenAPI.js';
import { request } from '../core/request.js';

class UserEventsService {
    /**
     * Add consent for a user
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postV0UserEventsConsent(requestBody) {
        return request(OpenAPI, {
            method: 'POST',
            url: '/v0/user-events/consent',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid value for: body`,
            },
        });
    }
    /**
     * Start service contract for a user
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postV0UserEventsContractStart(requestBody) {
        return request(OpenAPI, {
            method: 'POST',
            url: '/v0/user-events/contract/start',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid value for: body`,
            },
        });
    }
    /**
     * End service contract for a user
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postV0UserEventsContractEnd(requestBody) {
        return request(OpenAPI, {
            method: 'POST',
            url: '/v0/user-events/contract/end',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid value for: body`,
            },
        });
    }
    /**
     * Start legitimate interest for a user
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postV0UserEventsLegitimateInterestStart(requestBody) {
        return request(OpenAPI, {
            method: 'POST',
            url: '/v0/user-events/legitimate-interest/start',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid value for: body`,
            },
        });
    }
    /**
     * End legitimate interest for a user
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postV0UserEventsLegitimateInterestEnd(requestBody) {
        return request(OpenAPI, {
            method: 'POST',
            url: '/v0/user-events/legitimate-interest/end',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid value for: body`,
            },
        });
    }
}

export { UserEventsService };
//# sourceMappingURL=UserEventsService.js.map

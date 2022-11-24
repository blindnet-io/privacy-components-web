import { OpenAPI } from '../core/OpenAPI.js';
import { request } from '../core/request.js';

class UserInfoService {
    /**
     * Get a list of consents user has given
     * @param authorization
     * @returns GivenConsentsPayload
     * @throws ApiError
     */
    static getV0UserConsents(authorization) {
        return request(OpenAPI, {
            method: 'GET',
            url: '/v0/user/consents',
            headers: {
                Authorization: authorization,
            },
            errors: {
                400: `Invalid value for: header Authorization`,
            },
        });
    }
}

export { UserInfoService };
//# sourceMappingURL=UserInfoService.js.map

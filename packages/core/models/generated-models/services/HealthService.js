import { OpenAPI } from '../core/OpenAPI.js';
import { request } from '../core/request.js';

class HealthService {
    /**
     * Is the app running?
     * @returns any
     * @throws ApiError
     */
    static getV0Health() {
        return request(OpenAPI, {
            method: 'GET',
            url: '/v0/health',
        });
    }
}

export { HealthService };
//# sourceMappingURL=HealthService.js.map

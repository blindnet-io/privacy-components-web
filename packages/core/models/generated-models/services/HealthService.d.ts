import type { CancelablePromise } from '../core/CancelablePromise.js';
export declare class HealthService {
    /**
     * Is the app running?
     * @returns any
     * @throws ApiError
     */
    static getV0Health(): CancelablePromise<any>;
}

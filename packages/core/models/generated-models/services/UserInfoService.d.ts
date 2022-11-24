import type { GivenConsentsPayload } from '../models/GivenConsentsPayload.js';
import type { CancelablePromise } from '../core/CancelablePromise.js';
export declare class UserInfoService {
    /**
     * Get a list of consents user has given
     * @param authorization
     * @returns GivenConsentsPayload
     * @throws ApiError
     */
    static getV0UserConsents(authorization: string): CancelablePromise<Array<GivenConsentsPayload>>;
}

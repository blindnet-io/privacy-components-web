import type { DataCallbackPayload } from '../models/DataCallbackPayload.js';
import type { CancelablePromise } from '../core/CancelablePromise.js';
export declare class CallbacksService {
    /**
     * Link to access data in the storage created
     * @param callbackId
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postV0CallbackCallbackid(callbackId: string, requestBody: DataCallbackPayload): CancelablePromise<any>;
}

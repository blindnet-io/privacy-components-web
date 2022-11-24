import type { EndContractPayload } from '../models/EndContractPayload.js';
import type { EndLegitimateInterestPayload } from '../models/EndLegitimateInterestPayload.js';
import type { GiveConsentPayload } from '../models/GiveConsentPayload.js';
import type { StartContractPayload } from '../models/StartContractPayload.js';
import type { StartLegitimateInterestPayload } from '../models/StartLegitimateInterestPayload.js';
import type { CancelablePromise } from '../core/CancelablePromise.js';
export declare class UserEventsService {
    /**
     * Add consent for a user
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postV0UserEventsConsent(requestBody: GiveConsentPayload): CancelablePromise<any>;
    /**
     * Start service contract for a user
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postV0UserEventsContractStart(requestBody: StartContractPayload): CancelablePromise<any>;
    /**
     * End service contract for a user
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postV0UserEventsContractEnd(requestBody: EndContractPayload): CancelablePromise<any>;
    /**
     * Start legitimate interest for a user
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postV0UserEventsLegitimateInterestStart(requestBody: StartLegitimateInterestPayload): CancelablePromise<any>;
    /**
     * End legitimate interest for a user
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postV0UserEventsLegitimateInterestEnd(requestBody: EndLegitimateInterestPayload): CancelablePromise<any>;
}

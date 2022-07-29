import { PrivacyRequest } from '../models/privacy-request.js';
import { PrivacyResponse } from '../models/privacy-response.js';
/**
 * Send a PrivacyRequest to the privacy-request API
 * @param {PrivacyRequest} request Request body to send
 * @param {boolean} mock Flag indicating if the mock endpoint should be used
 * @returns
 */
export declare function sendPrivacyRequest(request: PrivacyRequest, mock?: boolean): Promise<PrivacyResponse>;

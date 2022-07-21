import { PrivacyRequest } from '../models/privacy-request.js';
import { PrivacyResponse } from '../models/privacy-response.js';

/**
 * Send a PrivacyRequest to the privacy-request API
 * @param {PrivacyRequest} request Request body to send
 * @param {boolean} mock Flag indicating if the mock endpoint should be used
 * @returns
 */
export async function sendPrivacyRequest(
  request: PrivacyRequest,
  mock: boolean = true
): Promise<PrivacyResponse> {
  const url = mock
    ? 'https://stoplight.io/mocks/blindnet/product-management:open-api/74767654/privacy-request'
    : '';

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<PrivacyResponse>;
  });
}

import { PrivacyRequest } from '../models/privacy-request.js';
import { PrivacyResponse } from '../models/privacy-response.js';

/**
 * Determine the correct mock header for a PrivacyRequest
 * @param request PrivacyRequest to get mock header for
 * @returns String to be used in the "prefer" header
 */
function getMockHeader(request: PrivacyRequest): string {
  // If more than 1 demand, send the default multi demand response
  if (request.demands.length > 1) {
    return 'code=200, example=TRANSPARENCY Multi-Response';
  }

  // Select the mock response corresponding to this action
  if (request.demands.length === 1) {
    const { action } = request.demands[0];
    return `code=200, example=${action} Response`;
  }

  // If no demands get bad request response
  return 'code=400';
}

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
    : 'https://devkit-pce-staging.azurewebsites.net/v0/privacy-request';
  const headers: any = mock
    ? {
        'Content-Type': 'application/json',
        Prefer: getMockHeader(request),
      }
    : {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };

  console.log(JSON.stringify(request));

  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(request),
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<PrivacyResponse>;
  });
}

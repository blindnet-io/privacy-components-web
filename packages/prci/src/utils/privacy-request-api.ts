/* eslint-disable camelcase */
import { HistoryResponse } from '../models/history-response.js';
import { DATA_CATEGORY } from '../models/priv-terms.js';
import { PrivacyRequest } from '../models/privacy-request.js';
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

function preProcessRequest(request: PrivacyRequest): PrivacyRequest {
  // If all privacy scopes provided, this is the same as no restriction
  const allDataCategories = Object.values(DATA_CATEGORY).filter(
    dc => dc !== DATA_CATEGORY.ALL && !dc.includes('.')
  );
  request.demands.forEach(d => {
    if (d.restrictions && d.restrictions.privacy_scope) {
      const demandDcs = d.restrictions.privacy_scope!.map(psr => psr.dc);
      if (allDataCategories.every(dc => demandDcs.includes(dc))) {
        const demand = d;
        delete demand.restrictions!.privacy_scope;
      }
    }
  });

  return request;
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
): Promise<{ request_id: string }> {
  const preparedRequest = preProcessRequest(request);
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
  console.log(JSON.stringify(preparedRequest));
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(preparedRequest),
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<{ request_id: string }>;
  });
}

export async function getRequestHistory() {
  return fetch(
    'https://devkit-pce-staging.azurewebsites.net/v0/privacy-request/history',
    {
      method: 'GET',
      headers: { accept: 'application/json' },
    }
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<HistoryResponse>;
  });
}

import { PrivacyRequest } from '../models/privacy-request.js';
import { PrivacyResponse } from '../models/privacy-response.js';

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
  // .then(response => response.json())
  // .then(data => {
  //   console.log('Success:', data);
  // })
  // .catch((error) => {
  //   console.error('Error:', error);
  // });
}

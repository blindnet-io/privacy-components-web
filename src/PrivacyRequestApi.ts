import { PrivacyRequest } from './priv.js';

export function sendPrivacyRequest(
  request: PrivacyRequest,
  mock: boolean = true
) {
  const url = mock
    ? 'https://stoplight.io/mocks/blindnet/product-management:open-api/74767654/privacy-request'
    : '';

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  // .then(response => response.json())
  // .then(data => {
  //   console.log('Success:', data);
  // })
  // .catch((error) => {
  //   console.error('Error:', error);
  // });
}

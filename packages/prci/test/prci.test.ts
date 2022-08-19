import { expect } from '@open-wc/testing';
import '../src/index.js';
import { TARGET } from '../src/models/priv-terms.js';
import { PrivacyRequest } from '../src/models/privacy-request.js';
import { sendPrivacyRequest } from '../src/utils/privacy-request-api.js';

describe('Mock API Tests', () => {
  it('test single demand', async () => {
    const request: PrivacyRequest = {
      demands: [],
      data_subject: [
        {
          // FIXME: For now we hardcode this, but will come from token once auth added
          id: 'fdfc95a6-8fd8-4581-91f7-b3d236a6a10e',
          schema: 'dsid',
        },
      ],
      email: '',
      target: TARGET.ORGANIZATION,
    };

    sendPrivacyRequest(request, false).then(privacyResponse => {
      console.log(privacyResponse);
    });
  });
});

describe('BldnPrivRequest', () => {
  xit('needs tests', () => {
    expect(false).to.equal(true);
  });
});

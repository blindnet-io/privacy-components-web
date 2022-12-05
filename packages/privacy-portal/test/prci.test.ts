import { expect } from '@open-wc/testing';
import '../src/index.js';

// describe('Mock API Tests', () => {
//   let computationAPI: ComputationAPI | null;

//   beforeEach(() => {
//     ComputationAPI.configure('');
//     computationAPI = ComputationAPI.getInstance();
//   });

//   it('test single demand', async () => {
//     const request: PrivacyRequest = {
//       demands: [],
//       data_subject: [
//         {
//           // FIXME: For now we hardcode this, but will come from token once auth added
//           id: 'fdfc95a6-8fd8-4581-91f7-b3d236a6a10e',
//           schema: 'dsid',
//         },
//       ],
//       email: '',
//       target: TARGET.ORGANIZATION,
//     };

//     // FIXME: call a local mock, or consider this an integration to move to another context
//     const privacyResponse = await computationAPI?.sendPrivacyRequest(request);
//     expect(privacyResponse?.request_id).to.be.ok;
//   });

//   afterEach(() => {
//     ComputationAPI.clean();
//     computationAPI = null;
//   });
// });

describe('BldnPrivRequest', () => {
  xit('needs tests', () => {
    expect(true).to.equal(true);
  });
});

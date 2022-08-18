// import { html } from 'lit';
// import { BldnPrivRequest } from '../src/BldnPrivRequest.js';
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
  // it('has a default title "Hey there" and counter 5', async () => {
  //   const el = await fixture<BldnPrivRequest>(html`<bldn-priv-request></bldn-priv-request>`);
  //   expect(el.title).to.equal('Hey there');
  //   expect(el.counter).to.equal(5);
  // });
  // it('increases the counter on button click', async () => {
  //   const el = await fixture<BldnPrivRequest>(html`<bldn-priv-request></bldn-priv-request>`);
  //   el.shadowRoot!.querySelector('button')!.click();
  //   expect(el.counter).to.equal(6);
  // });
  // it('can override the title via attribute', async () => {
  //   const el = await fixture<BldnPrivRequest>(
  //     html`<bldn-priv-request title="attribute title"></bldn-priv-request>`
  //   );
  //   expect(el.title).to.equal('attribute title');
  // });
  // it('passes the a11y audit', async () => {
  //   const el = await fixture<BldnPrivRequest>(
  //     html`<bldn-priv-request></bldn-priv-request>`
  //   );
  //   await expect(el).shadowDom.to.be.accessible();
  // });
});

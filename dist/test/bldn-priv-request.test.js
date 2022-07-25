// import { html } from 'lit';
import { expect } from '@open-wc/testing';
// import { BldnPrivRequest } from '../src/BldnPrivRequest.js';
import '../src/bldn-priv-request.js';
import { ACTION } from '../src/models/priv-terms.js';
import { sendPrivacyRequest } from '../src/utils/PrivacyRequestApi.js';
describe('Mock API Tests', () => {
    it('test single demand', async () => {
        const request = {
            demands: [{ action: ACTION.TRANSPARENCY_DPO }],
        };
        sendPrivacyRequest(request).then(privacyResponse => expect(privacyResponse.data).to.equal({}));
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
//# sourceMappingURL=bldn-priv-request.test.js.map
import { html } from 'lit';
import { fixture, expect, elementUpdated } from '@open-wc/testing';

import '../src/ModulesDemo.js';

describe('ModulesDemo', () => {
  /** @type {NonNullable<Element>} */
  let element;
  beforeEach(async () => {
    element = await fixture(
      html`<devkit-simple-tutorial></devkit-simple-tutorial>`
    );
  });

  it('renders the home route', async () => {
    const routerOutlet = element.shadowRoot?.querySelector('#router-outlet');
    let h1;
    if (routerOutlet) {
      await elementUpdated(routerOutlet);
      const appHome = routerOutlet?.querySelector('app-home');
      if (appHome) {
        await elementUpdated(appHome);
        h1 = appHome?.shadowRoot?.querySelector('h1');
      }
    }
    expect(h1).to.exist;
    expect(h1?.textContent).to.equal('devkit simple tutorial');
  });

  it('passes the a11y audit', () => {
    expect(element).shadowDom.to.be.accessible();
  });
});

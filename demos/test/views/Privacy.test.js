import { html } from 'lit';
import { fixture, expect, elementUpdated } from '@open-wc/testing';

import '../../src/views/Privacy.js';

describe('AppHome', () => {
  /** @type {NonNullable<Element>} */
  let element;
  beforeEach(async () => {
    element = await fixture(html`<app-privacy></app-privacy>`);
  });

  it('renders the PRCI', async () => {
    const prciEl = element.shadowRoot?.querySelector('bldn-privacy-portal');
    expect(prciEl).to.exist;
    if (prciEl) {
      await elementUpdated(prciEl);
    }
    expect(prciEl?.shadowRoot).to.exist;
  });

  it('passes the a11y audit', () => {
    expect(element).shadowDom.to.be.accessible();
  });
});

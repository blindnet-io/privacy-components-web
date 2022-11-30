import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../../src/views/basic/Home.js';

describe('AppHome', () => {
  /** @type {NonNullable<Element>} */
  let element;
  beforeEach(async () => {
    element = await fixture(html`<basic-demo-home></basic-demo-home>`);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot?.querySelector('h1');
    expect(h1).to.exist;
    expect(h1?.textContent).to.equal('Basic Demo');
  });

  it('passes the a11y audit', () => {
    expect(element).shadowDom.to.be.accessible();
  });
});

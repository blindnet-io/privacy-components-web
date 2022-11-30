import { html } from 'lit';
import { fixture, expect, elementUpdated } from '@open-wc/testing';

import '../src/ModulesDemo.js';

describe('ModulesDemo', () => {
  /** @type {NonNullable<Element>} */
  let element;
  beforeEach(async () => {
    element = await fixture(html`<modules-demo></modules-demo>`);
  });

  it('passes the a11y audit', () => {
    expect(element).shadowDom.to.be.accessible();
  });
});

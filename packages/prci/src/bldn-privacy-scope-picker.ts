import { msg } from '@lit/localize';
import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';

import { PrivacyScopeRestriction } from '@blindnet/core';

import './bldn-dropdown.js';
import './bldn-all-checklist.js';

interface Choice {
  value: string;
  display: TemplateResult<1 | 2>;
  checked: boolean;
  allChoice?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-unused-vars
const cartesian = (...a) =>
  a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

@customElement('blnd-privacy-scope-picker')
export class BldnPrivacyScopePicker extends LitElement {
  @property({ type: String }) mode: 'select' | 'object' | 'restrict' = 'select';

  @property({ type: Object }) privacyScope: PrivacyScopeRestriction[] = [
    {
      dc: '*',
      pc: PrivacyScopeRestriction.pc._,
      pp: PrivacyScopeRestriction.pp._,
    },
  ];

  @property({ type: Array }) dataCategories: string[] = [];

  @property({ type: Array }) processingCategories: Choice[] = [];

  @property({ type: Array }) purposes: Choice[] = [];

  @state() _dataCategories: Set<string> = new Set<string>();

  @state() _processingCategories: Set<PrivacyScopeRestriction.pc> =
    new Set<PrivacyScopeRestriction.pc>();

  @state() _purposes: Set<PrivacyScopeRestriction.pp> =
    new Set<PrivacyScopeRestriction.pp>();

  getModeTemplate() {
    return html`
      ${choose(this.mode, [
        [
          'select',
          () => html`
            ${msg('I select the following')}
            <bldn-button id="scope-tooltip-button" mode="link"
              >${msg('privacy scope')}</bldn-button
            >
          `,
        ],
        [
          'object',
          () => html`
            ${msg('I object to the processing of my data within the following')}
            <bldn-button id="scope-tooltip-button" mode="link"
              >${msg('privacy scope')}</bldn-button
            >
          `,
        ],
        [
          'restrict',
          () => html`
            ${msg('I restrict the processing of my data to the following')}
            <bldn-button id="scope-tooltip-button" mode="link"
              >${msg('privacy scope')}</bldn-button
            >
          `,
        ],
      ])}
    `;
  }

  setPrivacyScope() {
    // const triples = cartesian([1, 2], [10, 20], [100, 200, 300])
  }

  addDataCategory(e: Event) {
    const { value } = (e as CustomEvent).detail;
    this._dataCategories.add(value);
    this.setPrivacyScope();
  }

  removeDataCategory(e: Event) {
    const { value } = (e as CustomEvent).detail;
    this._dataCategories.delete(value);
  }

  addProcessingCategory(e: Event) {
    const { value } = (e as CustomEvent).detail;
    this._processingCategories.add(value);
  }

  removeProcessingCategory(e: Event) {
    const { value } = (e as CustomEvent).detail;
    this._processingCategories.delete(value);
  }

  addPurpose(e: Event) {
    const { value } = (e as CustomEvent).detail;
    this._purposes.add(value);
  }

  removePurpose(e: Event) {
    const { value } = (e as CustomEvent).detail;
    this._purposes.delete(value);
  }

  render() {
    return html`
      <p><b>${this.getModeTemplate()}</b></p>
      <p>
        ${msg('Data from _ categories, processed in _ ways, for _ purposes')}
      </p>
      <p>${msg('Expand a dropdown to customise your scope')}</p>
      <bldn-dropdown>
        <span slot="heading"><strong>${msg('Data Categories')}</strong></span>
        <bldn-all-checklist
          .choices=${this.dataCategories}
          @bldn-all-checklist:choice-select=${this.addDataCategory}
          @bldn-all-checklist:choice-deselect=${this.removeDataCategory}
        ></bldn-all-checklist>
      </bldn-dropdown>
      <bldn-dropdown>
        <span slot="heading"
          ><strong>${msg('Processing Categories')}</strong></span
        >
        <bldn-all-checklist
          .choices=${this.processingCategories}
          @bldn-all-checklist:choice-select=${this.addProcessingCategory}
          @bldn-all-checklist:choice-deselect=${this.removeProcessingCategory}
        ></bldn-all-checklist>
      </bldn-dropdown>
      <bldn-dropdown>
        <span slot="heading"
          ><strong>${msg('Purposes of Processing')}</strong></span
        >
        <bldn-all-checklist
          .choices=${this.purposes}
          @bldn-all-checklist:choice-select=${this.addPurpose}
          @bldn-all-checklist:choice-deselect=${this.removePurpose}
        ></bldn-all-checklist>
      </bldn-dropdown>
    `;
  }

  static styles = css``;
}

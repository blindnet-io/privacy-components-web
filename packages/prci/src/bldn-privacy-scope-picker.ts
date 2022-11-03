/* eslint-disable no-console */
import { msg } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';

import { PrivacyScopeRestriction } from '@blindnet/core';

import './bldn-dropdown.js';
import './bldn-all-checklist.js';
import {
  DATA_CATEGORY_DESCRIPTIONS,
  PROCESSING_CATEGORY_DESCRIPTIONS,
  PURPOSE_DESCRIPTIONS,
} from './utils/dictionary.js';

// interface Choice {
//   value: string;
//   display: TemplateResult<1 | 2>;
//   checked: boolean;
//   allChoice?: boolean;
// }

const cartesian = (...a) =>
  // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-unused-vars
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

  @property({ type: Array })
  processingCategories: PrivacyScopeRestriction.pc[] = [];

  @property({ type: Array }) purposes: PrivacyScopeRestriction.pp[] = [];

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
              >${msg(html`<b>privacy scope</b>`)}</bldn-button
            >
          `,
        ],
        [
          'object',
          () => html`
            ${msg('I object to the processing of my data within the following')}
            <bldn-button id="scope-tooltip-button" mode="link"
              >${msg(html`<b>privacy scope</b>`)}</bldn-button
            >
          `,
        ],
        [
          'restrict',
          () => html`
            ${msg('I restrict the processing of my data to the following')}
            <bldn-button id="scope-tooltip-button" mode="link"
              >${msg(html`<b>privacy scope</b>`)}</bldn-button
            >
          `,
        ],
      ])}
    `;
  }

  setPrivacyScope() {
    const triples = cartesian(
      this._dataCategories,
      this.processingCategories,
      this.purposes
    );
    console.log(triples);
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
    const triples = cartesian(
      Array.from(this._dataCategories.values()),
      Array.from(this._processingCategories.values()),
      Array.from(this._purposes.values())
    );
    console.log(triples);
    return html`
      <p><b>${this.getModeTemplate()}</b></p>
      <p>
        ${msg('Data from _ categories, processed in _ ways, for _ purposes')}
      </p>
      <p>${msg('Expand a dropdown to customise your scope')}</p>
      <bldn-dropdown>
        <span slot="heading"><strong>${msg('Data Categories')}</strong></span>
        <bldn-all-checklist
          .choices=${this.dataCategories.map(dc => ({
            value: dc,
            display: DATA_CATEGORY_DESCRIPTIONS[dc](),
            checked: this._dataCategories.has(dc),
            allChoice: dc === '*',
          }))}
          @bldn-all-checklist:choice-select=${this.addDataCategory}
          @bldn-all-checklist:choice-deselect=${this.removeDataCategory}
        ></bldn-all-checklist>
      </bldn-dropdown>
      <bldn-dropdown>
        <span slot="heading"
          ><strong>${msg('Processing Categories')}</strong></span
        >
        <bldn-all-checklist
          .choices=${this.processingCategories.map(pc => ({
            value: pc,
            display: PROCESSING_CATEGORY_DESCRIPTIONS[pc](),
            checked: this._processingCategories.has(pc),
            allChoice: pc === PrivacyScopeRestriction.pc._,
          }))}
          @bldn-all-checklist:choice-select=${this.addProcessingCategory}
          @bldn-all-checklist:choice-deselect=${this.removeProcessingCategory}
        ></bldn-all-checklist>
      </bldn-dropdown>
      <bldn-dropdown>
        <span slot="heading"
          ><strong>${msg('Purposes of Processing')}</strong></span
        >
        <bldn-all-checklist
          .choices=${this.purposes.map(pp => ({
            value: pp,
            display: PURPOSE_DESCRIPTIONS[pp](),
            checked: this._purposes.has(pp),
            allChoice: pp === PrivacyScopeRestriction.pp._,
          }))}
          @bldn-all-checklist:choice-select=${this.addPurpose}
          @bldn-all-checklist:choice-deselect=${this.removePurpose}
        ></bldn-all-checklist>
      </bldn-dropdown>
    `;
  }

  static styles = css`
    :host {
      color: var(--bldn-privacy-scope-picker-font-color, var(--color-dark));
      text-align: left;
    }

    bldn-dropdown:not(:last-child) {
      border-bottom: 2px solid
        var(
          --bldn-privacy-scope-picker-dropdown-divider-color,
          var(--color-lightest)
        );
    }
  `;
}

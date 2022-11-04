/* eslint-disable no-param-reassign */
import { msg } from '@lit/localize';
import { css, html, LitElement, PropertyValueMap, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';

import { PrivacyScopeRestriction } from '@blindnet/core';

import './bldn-dropdown.js';
import './bldn-all-checklist.js';
import { when } from 'lit/directives/when.js';

const tooltipIcon = new URL(
  './assets/icons/akar-icons_info.svg',
  import.meta.url
).href;

interface Choice<T> {
  value: T;
  display: TemplateResult<1 | 2>;
  allChoice?: boolean;
  checked?: boolean;
}

function cartesianProduct<T>(...allEntries: T[][]): T[][] {
  return allEntries.reduce<T[][]>(
    (results, entries) =>
      results
        .map(result => entries.map(entry => [...result, entry]))
        .reduce((subResults, result) => [...subResults, ...result], []),
    [[]]
  );
}

@customElement('blnd-privacy-scope-picker')
export class BldnPrivacyScopePicker extends LitElement {
  @property({ type: String }) mode: 'select' | 'object' | 'restrict' = 'select';

  @property({ type: Array, attribute: 'privacy-scope' })
  privacyScope: PrivacyScopeRestriction[] = [
    {
      dc: '*',
      pc: PrivacyScopeRestriction.pc._,
      pp: PrivacyScopeRestriction.pp._,
    },
  ];

  @property({ type: Array }) dataCategories: Choice<string>[] = [];

  @property({ type: Array })
  processingCategories: Choice<PrivacyScopeRestriction.pc>[] = [];

  @property({ type: Array }) purposes: Choice<PrivacyScopeRestriction.pp>[] =
    [];

  @state() _dataCategories: Set<string> = new Set<string>();

  @state() _processingCategories: Set<PrivacyScopeRestriction.pc> =
    new Set<PrivacyScopeRestriction.pc>();

  @state() _purposes: Set<PrivacyScopeRestriction.pp> =
    new Set<PrivacyScopeRestriction.pp>();

  @state() _showTooltip: boolean = false;

  getModeTemplate() {
    return html`
      ${choose(this.mode, [
        [
          'select',
          () => html`
            ${msg('I select the following')}
            <bldn-button
              id="scope-tooltip-button"
              mode="link"
              underline-mode="dotted"
              @click=${() => {
                this._showTooltip = !this._showTooltip;
              }}
              >${msg(html`<b>privacy scope</b>`)}</bldn-button
            >
          `,
        ],
        [
          'object',
          () => html`
            ${msg('I object to the processing of my data within the following')}
            <bldn-button
              id="scope-tooltip-button"
              mode="link"
              underline-mode="dotted"
              @click=${() => {
                this._showTooltip = !this._showTooltip;
              }}
              >${msg(html`<b>privacy scope</b>`)}</bldn-button
            >
          `,
        ],
        [
          'restrict',
          () => html`
            ${msg('I restrict the processing of my data to the following')}
            <bldn-button
              id="scope-tooltip-button"
              mode="link"
              underline-mode="dotted"
              @click=${() => {
                this._showTooltip = !this._showTooltip;
              }}
              >${msg(html`<b>privacy scope</b>`)}</bldn-button
            >
          `,
        ],
      ])}
    `;
  }

  setPrivacyScope() {
    const triples = cartesianProduct(
      Array.from(this._dataCategories.values()),
      Array.from(this._processingCategories.values()),
      Array.from(this._purposes.values())
    );
    const privacyScope = triples.map(
      (triple): PrivacyScopeRestriction => ({
        dc: triple[0],
        pc: triple[1] as PrivacyScopeRestriction.pc,
        pp: triple[2] as PrivacyScopeRestriction.pp,
      })
    );
    this.dispatchEvent(
      new CustomEvent('bldn-privacy-scope-picker:scope-change', {
        bubbles: true,
        composed: true,
        detail: {
          privacyScope,
        },
      })
    );
  }

  addDataCategory(e: Event) {
    const { value } = (e as CustomEvent).detail;
    this._dataCategories.add(value);
    this.setPrivacyScope();
    this.requestUpdate();
  }

  removeDataCategory(e: Event) {
    const { value } = (e as CustomEvent).detail;
    this._dataCategories.delete(value);
    this.setPrivacyScope();
    this.requestUpdate();
  }

  addProcessingCategory(e: Event) {
    const { value } = (e as CustomEvent).detail;
    this._processingCategories.add(value);
    this.setPrivacyScope();
    this.requestUpdate();
  }

  removeProcessingCategory(e: Event) {
    const { value } = (e as CustomEvent).detail;
    this._processingCategories.delete(value);
    this.setPrivacyScope();
    this.requestUpdate();
  }

  addPurpose(e: Event) {
    const { value } = (e as CustomEvent).detail;
    this._purposes.add(value);
    this.setPrivacyScope();
    this.requestUpdate();
  }

  removePurpose(e: Event) {
    const { value } = (e as CustomEvent).detail;
    this._purposes.delete(value);
    this.setPrivacyScope();
    this.requestUpdate();
  }

  handlePrivacyScopeChange() {
    // Extract dc, pc, and pp from the privacy scope passed in
    this._dataCategories = new Set<string>(
      this.privacyScope.map(triple => triple.dc)
    );
    this._processingCategories = new Set<PrivacyScopeRestriction.pc>(
      this.privacyScope.map(triple => triple.pc)
    );
    this._purposes = new Set<PrivacyScopeRestriction.pp>(
      this.privacyScope.map(triple => triple.pp)
    );
  }

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has('privacyScope')) this.handlePrivacyScopeChange();
  }

  render() {
    return html`
      <p><b>${this.getModeTemplate()}</b></p>
      <p>
        ${msg(html`
          Data from
          <span class="scope-counter"
            ><b
              >${this._dataCategories.size === 1 &&
              this._dataCategories.has('*')
                ? 'all'
                : this._dataCategories.size}</b
            ></span
          >
          categories, processed in
          <span class="scope-counter"
            ><b
              >${this._processingCategories.size === 1 &&
              this._processingCategories.has(PrivacyScopeRestriction.pc._)
                ? 'all'
                : this._processingCategories.size}</b
            ></span
          >
          ways, for
          <span class="scope-counter"
            ><b
              >${this._purposes.size === 1 &&
              this._purposes.has(PrivacyScopeRestriction.pp._)
                ? 'all'
                : this._purposes.size}</b
            ></span
          >
          purposes
        `)}
      </p>
      ${when(
        this._showTooltip,
        () => html`
        <div id='tooltip'>
          <img src=${tooltipIcon} alt='info box'></img>
          <span>${msg(
            html`A <b><i>Privacy Scope</i></b> describes one or more types of
              data (<i>data categories</i>), how it is processed (<i
                >processing categories</i
              >), and why it is processed that way (<i>purposes of processing</i
              >).`
          )}</span>
        </div>
      `
      )}
      <p id="expand-tip">
        <i>${msg('Expand a dropdown to customise your scope')}</i>
      </p>
      <bldn-dropdown>
        <span slot="heading"><strong>${msg('Data Categories')}</strong></span>
        <p>${msg('The types of data in my privacy scope are:')}</p>
        <bldn-all-checklist
          .choices=${this.dataCategories.map(choice => {
            choice.checked = this._dataCategories.has(choice.value);
            return choice;
          })}
          @bldn-all-checklist:choice-select=${this.addDataCategory}
          @bldn-all-checklist:choice-deselect=${this.removeDataCategory}
        ></bldn-all-checklist>
      </bldn-dropdown>
      <bldn-dropdown>
        <span slot="heading"
          ><strong>${msg('Processing Categories')}</strong></span
        >
        <p>${msg('The ways data in my privacy scope is processed:')}</p>
        <bldn-all-checklist
          .choices=${this.processingCategories.map(choice => {
            choice.checked = this._processingCategories.has(choice.value);
            return choice;
          })}
          @bldn-all-checklist:choice-select=${this.addProcessingCategory}
          @bldn-all-checklist:choice-deselect=${this.removeProcessingCategory}
        ></bldn-all-checklist>
      </bldn-dropdown>
      <bldn-dropdown>
        <span slot="heading"
          ><strong>${msg('Purposes of Processing')}</strong></span
        >
        <p>${msg('The reasons for processing data in my privacy scope:')}</p>
        <bldn-all-checklist
          .choices=${this.purposes.map(choice => {
            choice.checked = this._purposes.has(choice.value);
            return choice;
          })}
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

    p {
      margin: 1.5em 0;
    }

    .scope-counter {
      background: var(--color-light);
      padding: 0.3em 0.5em;
      border-radius: 5px;
    }

    #tooltip {
      display: flex;
      padding: 1em;
      gap: 1em;
      background: var(--color-lightest);
      border-radius: 20px;
    }

    #tooltip img {
      align-self: center;
    }

    #expand-tip {
      color: var(--color-medium);
    }
  `;
}

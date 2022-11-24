import { msg } from '@lit/localize';
import { css, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import {
  PrivacyRequestDemand,
  PrivacyScopeRestriction,
  ProvenanceRestriction,
} from '@blindnet/core';
import {
  DATA_CATEGORY_DESCRIPTIONS,
  DATA_CATEGORY_TITLES,
} from '../utils/dictionary.js';
import { ActionForm } from './bldn-action-form.js';

import '../bldn-all-checklist.js';
import '../bldn-dropdown.js';
import '../bldn-date-restriction.js';
import '../bldn-provenance-restriction.js';
import '../bldn-additional-message.js';

/**
 * ActionForm for the Access PRIV action. Includes a dropdown and text element.
 */
@customElement('bldn-access-form')
export class BldnAccessForm extends ActionForm {
  /** @prop */
  @property({ type: Array, attribute: 'data-categories' })
  dataCategories: string[] = [];

  action = PrivacyRequestDemand.action.ACCESS;

  validateActionInput(): string[] | undefined {
    return undefined;
  }

  validateOptionsInput(): string[] | undefined {
    return undefined;
  }

  getDefaultDemands(): PrivacyRequestDemand[] {
    return [
      {
        id: '',
        action: PrivacyRequestDemand.action.ACCESS,
        restrictions: {
          privacy_scope: [
            {
              dc: '*',
              pc: PrivacyScopeRestriction.pc._,
              pp: PrivacyScopeRestriction.pp._,
            },
          ],
          provenance: {
            term: ProvenanceRestriction.term._,
          },
          date_range: {},
        },
      },
    ];
  }

  // Listener Functions

  /**
   * Add a privacy scope restriction to this demand for the selected data category
   * @param e {CustomEvent} Event containing the data category string to add
   */
  addDataCategory(e: Event) {
    e.stopPropagation();
    const { value } = (e as CustomEvent).detail;
    this.demands[0].restrictions!.privacy_scope!.push({
      dc: value,
      pc: PrivacyScopeRestriction.pc._,
      pp: PrivacyScopeRestriction.pp._,
    });
  }

  /**
   * Remove a privacy scope restriction to this demand for the deselected data category
   * @param e {CustomEvent} Event containing the data category string to remove
   */
  removeDataCategory(e: Event) {
    e.stopPropagation();
    const { value } = (e as CustomEvent).detail;
    this.demands[0].restrictions!.privacy_scope!.splice(
      this.demands[0].restrictions!.privacy_scope!.findIndex(
        psr => psr.dc === value
      ),
      1
    );
  }

  /**
   * Update the date restriction start for this demand
   * @param e {CustomEvent} Event containing the new start date
   */
  changeDateRestrictionStart(e: Event) {
    e.stopPropagation();
    const { date } = (e as CustomEvent).detail;
    this.demands[0].restrictions!.date_range!.from = date;
  }

  /**
   * Update the date restriction end for this demand
   * @param e {CustomEvent} Event containing the new end date
   */
  changeDateRestrictionEnd(e: Event) {
    e.stopPropagation();
    const { date } = (e as CustomEvent).detail;
    this.demands[0].restrictions!.date_range!.to = date;
  }

  /**
   * Update the provenance restriction term for this demand
   * @param e {CustomEvent} Event containing the new provenance restriction term
   */
  changeProvenanceRestrictionTerm(e: Event) {
    e.stopPropagation();
    const { term } = (e as CustomEvent).detail;
    this.demands[0].restrictions!.provenance!.term = term;
  }

  /**
   * Update the message for this demand
   * @param e {CustomEvent} Event containing the data category string to add
   */
  changeMessage(e: Event) {
    e.stopPropagation();
    const { message } = (e as CustomEvent).detail;
    this.demands[0].message = message;
  }

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();

    // Data category listeners
    this.addEventListener(
      'bldn-all-checklist:choice-select',
      this.addDataCategory
    );
    this.addEventListener(
      'bldn-all-checklist:choice-deselect',
      this.removeDataCategory
    );

    // Date restriction listeners
    this.addEventListener(
      'bldn-date-restriction:start-date-change',
      this.changeDateRestrictionStart
    );
    this.addEventListener(
      'bldn-date-restriction:end-date-change',
      this.changeDateRestrictionEnd
    );

    // Provenance restriction listener
    this.addEventListener(
      'bldn-provenance-restriction:term-change',
      this.changeProvenanceRestrictionTerm
    );

    // Message listener
    this.addEventListener(
      'bldn-additional-message:message-change',
      this.changeMessage
    );
  }

  disconnectedCallback(): void {
    this.removeEventListener(
      'bldn-all-checklist:choice-select',
      this.addDataCategory
    );
    this.removeEventListener(
      'bldn-all-checklist:choice-deselect',
      this.removeDataCategory
    );
    this.removeEventListener(
      'bldn-date-restriction:start-date-change',
      this.changeDateRestrictionStart
    );
    this.removeEventListener(
      'bldn-date-restriction:end-date-change',
      this.changeDateRestrictionEnd
    );
    this.removeEventListener(
      'bldn-provenance-restriction:term-change',
      this.changeProvenanceRestrictionTerm
    );
    this.removeEventListener(
      'bldn-additional-message:message-change',
      this.changeMessage
    );
  }

  getFormTemplate(): TemplateResult<1 | 2> {
    return html`
      <p>${msg('I want to access data from the following categories:')}</p>
      <bldn-all-checklist
        .choices=${this.dataCategories.map(dc => ({
          value: dc,
          display: html`${dc === '*'
            ? ''
            : html`<b
                >${DATA_CATEGORY_TITLES[dc]()}:
              </b>`}${DATA_CATEGORY_DESCRIPTIONS[dc]()}`,
          checked:
            this.demands![0].restrictions?.privacy_scope?.findIndex(
              psr => psr.dc === dc
            ) !== -1,
          allChoice: dc === '*',
        }))}
      ></bldn-all-checklist>
    `;
  }

  getOptionsTemplate(): TemplateResult<1 | 2> {
    return html`
      <bldn-dropdown>
        <span slot="heading"><strong>${msg('Date Restriction')}</strong></span>
        <bldn-date-restriction
          start=${ifDefined(this.demands[0].restrictions?.date_range?.from)}
          end=${ifDefined(this.demands[0].restrictions?.date_range?.to)}
        ></bldn-date-restriction>
      </bldn-dropdown>
      <bldn-dropdown>
        <span slot="heading"
          ><strong>${msg('Provenance Restriction')}</strong></span
        >
        <bldn-provenance-restriction
          term=${ifDefined(this.demands[0].restrictions?.provenance?.term)}
        ></bldn-provenance-restriction>
      </bldn-dropdown>
      <bldn-dropdown>
        <span slot="heading"
          ><strong>${msg('Additional Message')}</strong></span
        >
        <bldn-additional-message
          message=${ifDefined(this.demands[0].message)}
        ></bldn-additional-message>
      </bldn-dropdown>
    `;
  }

  static styles = [
    ActionForm.styles,
    css`
      :host {
        text-align: left;
        color: var(--bldn-access-form-font-color, var(--color-dark));
      }

      p {
        margin: 2em 0em;
      }

      p + bldn-all-checklist {
        margin-top: 1em;
        padding-left: 1em;
      }
    `,
  ];
}

import {
  PrivacyRequestDemand,
  PrivacyScopeRestriction,
  ProvenanceRestriction,
} from '@blindnet/core';
import { msg } from '@lit/localize';
import { css, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ActionForm } from './bldn-action-form.js';

import '../bldn-privacy-scope-picker.js';

/**
 * Action form for the OBJECT PRIV Action
 */
@customElement('bldn-object-form')
export class BldnObjectForm extends ActionForm {
  /** @prop */
  @property({ type: Array, attribute: 'data-categories' })
  dataCategories: string[] = [];

  /** @prop */
  @property({ type: Array, attribute: 'processing-categories' })
  processingCategories: PrivacyScopeRestriction.pc[] = [];

  /** @prop */
  @property({ type: Array, attribute: 'purposes' })
  purposes: PrivacyScopeRestriction.pp[] = [];

  action: PrivacyRequestDemand.action = PrivacyRequestDemand.action.OBJECT;

  validateActionInput(): string[] | undefined {
    return undefined;
  }

  validateOptionsInput(): string[] | undefined {
    return undefined;
  }

  getFormTemplate(): TemplateResult<1 | 2> {
    return html`
      <blnd-privacy-scope-picker
        .dataCategories=${this.dataCategories}
        .processingCategories=${this.processingCategories}
        .purposes=${this.purposes}
      ></blnd-privacy-scope-picker>
    `;
  }

  getOptionsTemplate(): TemplateResult<1 | 2> {
    return html`
      <bldn-dropdown>
        <span slot="heading"><strong>${msg('Date Restriction')}</strong></span>
        <bldn-date-restriction></bldn-date-restriction>
      </bldn-dropdown>
      <bldn-dropdown>
        <span slot="heading"
          ><strong>${msg('Provenance Restriction')}</strong></span
        >
        <bldn-provenance-restriction></bldn-provenance-restriction>
      </bldn-dropdown>
      <bldn-dropdown>
        <span slot="heading"
          ><strong>${msg('Additional Message')}</strong></span
        >
        <bldn-additional-message></bldn-additional-message>
      </bldn-dropdown>
    `;
  }

  getDefaultDemands(): PrivacyRequestDemand[] {
    return [
      {
        id: '',
        action: PrivacyRequestDemand.action.OBJECT,
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
   * Update the date restriction start for this demand
   * @param e {CustomEvent} Event containing the new start date
   */
  changeDateRestrictionStart(e: Event) {
    const { date } = (e as CustomEvent).detail;
    this.demands[0].restrictions!.date_range!.from = date;
  }

  /**
   * Update the date restriction end for this demand
   * @param e {CustomEvent} Event containing the new end date
   */
  changeDateRestrictionEnd(e: Event) {
    const { date } = (e as CustomEvent).detail;
    this.demands[0].restrictions!.date_range!.to = date;
  }

  /**
   * Update the provenance restriction term for this demand
   * @param e {CustomEvent} Event containing the new provenance restriction term
   */
  changeProvenanceRestrictionTerm(e: Event) {
    const { term } = (e as CustomEvent).detail;
    this.demands[0].restrictions!.provenance!.term = term;
  }

  /**
   * Update the message for this demand
   * @param e {CustomEvent} Event containing the data category string to add
   */
  changeMessage(e: Event) {
    const { message } = (e as CustomEvent).detail;
    this.demands[0].message = message;
  }

  /**
   * Add listeners for elements of this ActionForm
   */
  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();

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

  /**
   * Remove all listeners
   */
  disconnectedCallback(): void {
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

  static styles = [ActionForm.styles, css``];
}

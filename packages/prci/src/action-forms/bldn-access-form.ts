import { msg } from '@lit/localize';
import { css, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  PrivacyRequestDemand, PrivacyScopeRestriction, ProvenanceRestriction
} from '@blindnet/core';
import {
  DATA_CATEGORY_DESCRIPTIONS,
} from '../utils/dictionary.js';
import { ActionForm } from './bldn-action-form.js';

import '../bldn-all-checklist.js';
import '../bldn-dropdown.js'
import '../bldn-date-restriction.js'
import '../bldn-provenance-restriction.js'
import '../bldn-additional-message.js'

/**
 * ActionForm for the Access PRIV action. Includes a dropdown and text element.
 */
@customElement('bldn-access-form')
export class AccessForm extends ActionForm {

  /** @prop */
  @property({ type: Array, attribute: 'data-categories' }) dataCategories: string[] = []

  action = PrivacyRequestDemand.action.ACCESS;

  constructor() {
    super();

    // Access data cauthategory listeners
    this.addEventListener('bldn-all-checklist:choice-select', e => {
      const { value } = (e as CustomEvent).detail;
      this.demands[0].restrictions!.privacy_scope!.push({
        dc: value,
        pc: PrivacyScopeRestriction.pc._,
        pp: PrivacyScopeRestriction.pp._,
      });
    });
    this.addEventListener('bldn-all-checklist:choice-deselect', e => {
      const { value } = (e as CustomEvent).detail;
      this.demands[0].restrictions!.privacy_scope!.splice(
        this.demands[0].restrictions!.privacy_scope!.findIndex(
          psr => psr.dc === value
        ),
        1
      );
    });

    // FIXME: Disabled until we resolve how to handle OTHER-DATA
    // this.addEventListener('access-option-other-click', e => {
    //   const { checked } = (e as CustomEvent).detail;
    //   if (checked) {
    //     this.demand.dataCategory?.add(DATA_CATEGORY['OTHER-DATA']);
    //   } else {
    //     this.demand.dataCategory?.delete(DATA_CATEGORY['OTHER-DATA']);
    //   }
    // });
    // this.addEventListener('access-option-other-input', e => {
    //   const { text } = (e as CustomEvent).detail
    //   // TODO: What demand field to put the other-data category
    // })
  // }

  // handleAdditionalMessageInput(e: Event) {
  //   const { value } = e.target as HTMLTextAreaElement;
  //   this.demand.message = value;
  // }

  // handleProvenanceTermClick(e: Event) {
  //   const { id } = (e as CustomEvent).target as HTMLInputElement;
  //   this.demand.restrictions!.provenance!.term = id as PROVENANCE;
  // }

  // handleProvenanceTargetClick(e: Event) {
  //   const { id } = (e as CustomEvent).target as HTMLInputElement;
  //   this.demand.restrictions!.provenance!.target = id as TARGET;
  // }

  // handleDateRestrictionInput(e: Event) {
  //   const { id, value } = e.target as HTMLInputElement;
  //   if (id === 'date-start') {
  //     if (value) {
  //       this.demand.restrictions!.date_range!.from = new Date(value);
  //     } else {
  //       // Value is false when user hits 'clear' button on date picker
  //       delete this.demand.restrictions?.date_range?.from;
  //     }
  //   } else if (id === 'date-end') {
  //     if (value) {
  //       this.demand.restrictions!.date_range!.to = new Date(value);
  //     } else {
  //       delete this.demand.restrictions?.date_range?.to;
  //     }
  //   }
  }

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
          privacy_scope: [{
            dc: '*',
            pc: PrivacyScopeRestriction.pc._,
            pp: PrivacyScopeRestriction.pp._,
          }],
          provenance: {
            term: ProvenanceRestriction.term._
          },
          date_range: {},
        },
      }
    ];
  }

  addDataCategory(e: Event) {
    const { value } = (e as CustomEvent).detail;
    this.demands[0].restrictions!.privacy_scope!.push({
      dc: value,
      pc: PrivacyScopeRestriction.pc._,
      pp: PrivacyScopeRestriction.pp._,
    });
  }

  removeDataCategory(e: Event) {
    const { value } = (e as CustomEvent).detail;
    this.demands[0].restrictions!.privacy_scope!.splice(
      this.demands[0].restrictions!.privacy_scope!.findIndex(
        psr => psr.dc === value
      ),
      1
    );
  }

  changeDateRestrictionStart(e: Event) {
    const { date } = (e as CustomEvent).detail
    this.demands[0].restrictions!.date_range!.from = date
  }

  changeDateRestrictionEnd(e: Event) {
    const { date } = (e as CustomEvent).detail
    this.demands[0].restrictions!.date_range!.to = date
  }

  changeProvenanceRestrictionTerm(e: Event) {
    const { term } = (e as CustomEvent).detail;
    this.demands[0].restrictions!.provenance!.term = term;
  }

  changeMessage(e: Event) {
    const { message } = (e as CustomEvent).detail;
    this.demands[0].message = message
  }

  connectedCallback(): void {
    
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback()

    // Data category listeners
    this.addEventListener('bldn-all-checklist:choice-select', this.addDataCategory);
    this.addEventListener('bldn-all-checklist:choice-deselect', this.removeDataCategory);

    // Date restriction listeners
    this.addEventListener('bldn-date-restriction:start-date-change', this.changeDateRestrictionStart)
    this.addEventListener('bldn-date-restriction:end-date-change', this.changeDateRestrictionEnd)

    // Provenance restriction listener
    this.addEventListener('bldn-provenance-restriction:term-change', this.changeProvenanceRestrictionTerm)

    // Message listener
    this.addEventListener('bldn-additional-message:message-change', this.changeMessage)
  }

  disconnectedCallback(): void {
    this.removeEventListener('bldn-all-checklist:choice-select', this.addDataCategory);
    this.removeEventListener('bldn-all-checklist:choice-deselect', this.removeDataCategory);
    this.removeEventListener('bldn-date-restriction:start-date-change', this.changeDateRestrictionStart)
    this.removeEventListener('bldn-date-restriction:end-date-change', this.changeDateRestrictionEnd)
    this.removeEventListener('bldn-provenance-restriction:term-change', this.changeProvenanceRestrictionTerm)
    this.removeEventListener('bldn-additional-message:message-change', this.changeMessage)
  }

  getFormTemplate(): TemplateResult<1 | 2> {
    return html`
      <p>${msg('I want to access:')}</p>
      <bldn-all-checklist
        .choices=${this.dataCategories.map(dc => ({
          value: dc,
          display: DATA_CATEGORY_DESCRIPTIONS[dc](),
          checked:
            this.demands![0].restrictions?.privacy_scope?.findIndex(
              psr => psr.dc === dc
            ) !== -1,
        }))}
        .allChoice=${{
          display: DATA_CATEGORY_DESCRIPTIONS['*'](),
          value: '*'
        }}
      ></bldn-all-checklist>
    `
  }

  getOptionsTemplate(): TemplateResult<1 | 2> {
    return html`
      <bldn-dropdown>
        <span slot='heading'><strong>${msg('Date Restriction')}</strong></span>
        <bldn-date-restriction></bldn-date-restriction>
      </bldn-dropdown>
      <bldn-dropdown>
        <span slot='heading'><strong>${msg('Provenance Restriction')}</strong></span>
        <bldn-provenance-restriction></bldn-provenance-restriction>
      </bldn-dropdown>
      <bldn-dropdown>
        <span slot='heading'><strong>${msg('Additional Message')}</strong></span>
        <bldn-additional-message></bldn-additional-message>
      </bldn-dropdown>
    `
  }

  static styles = [
    ActionForm.styles,
    css`

      :host {
        text-align: left;
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

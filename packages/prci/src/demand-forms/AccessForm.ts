import { msg } from '@lit/localize';
import { css, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Demand } from '../models/demand.js';
import { ACTION, DATA_CATEGORY, PROVENANCE } from '../models/priv-terms.js';
import {
  buttonStyles,
  containerStyles,
  imgStyles,
  textStyles,
} from '../styles.js';
import {
  DATA_CATEGORY_DESCRIPTIONS,
  PROVENANCE_DESCRIPTIONS,
} from '../utils/dictionary.js';
import { DemandForm } from './DemandForm.js';
import { FormComponentState } from '../utils/states.js';

import '../SlottedDropdown.js';
import '../AllChecklist.js';
import { Restriction } from '../models/restriction.js';

/**
 * ActionForm for the Transparency PRIV action. Includes a dropdown and text element.
 *
 * The transparency form follows a different pattern than the other actions, as each
 * TRANSPARENCY.* actually represents a completely separate demand, but we display them
 * all in one DemandBuilder element.
 */
@customElement('access-form')
export class TransparencyForm extends DemandForm {
  @property({ type: Array, attribute: false })
  allowedDataCategories: DATA_CATEGORY[] = [];

  static styles = [
    DemandForm.styles,
    containerStyles,
    buttonStyles,
    textStyles,
    imgStyles,
    css`
      :host {
        display: grid;
        row-gap: 35px;
        align-content: flex-start;
        margin: 0px;
      }

      .access-options {
        padding: 40px 40px 20px 40px;
      }

      #dmd-ctr {
        display: grid;
        row-gap: 20px;
      }

      #dmd-ctr ul {
        margin: 0;
      }

      #dmd-ctr li:not(:last-child) {
        margin-bottom: 15px;
      }

      #edit-heading-1 {
        font-weight: bold;
        grid-column: 1/2;
        padding: 0px;
      }

      p {
        margin: 0px;
      }

      .additional-msg-ctr {
        display: grid;
        row-gap: 20px;
        margin: 0px 0px 25px 0px;
      }
    `,
  ];

  constructor() {
    super();

    // Access data category listeners
    this.addEventListener('access-option-select', e => {
      const { id } = (e as CustomEvent).detail;
      this.demand.dataCategory?.add(id);
    });
    this.addEventListener('access-option-deselect', e => {
      const { id } = (e as CustomEvent).detail;
      this.demand.dataCategory?.delete(id);
    });
    this.addEventListener('access-option-other-click', e => {
      const { checked } = (e as CustomEvent).detail;
      if (checked) {
        this.demand.dataCategory?.add(DATA_CATEGORY['OTHER-DATA']);
      } else {
        this.demand.dataCategory?.delete(DATA_CATEGORY['OTHER-DATA']);
      }
    });
    // this.addEventListener('access-option-other-input', e => {
    //   const { text } = (e as CustomEvent).detail
    //   // TODO: What demand field to put the other-data category
    // })

    // Provenance listeners
    this.addEventListener('provenance-select', e => {
      const { id } = (e as CustomEvent).detail;
      this.demand.restrictions?.add(id);
    });
    this.addEventListener('provenance-deselect', e => {
      const { id } = (e as CustomEvent).detail;
      this.demand.restrictions?.delete(id);
    });

    // Additional message listener
    this.addEventListener('text-element-change', e => {
      const { text } = (e as CustomEvent).detail;
      this.demand.message = text;
    });
  }

  handleAdditionalMessageInput(e: Event) {
    const event = new CustomEvent('text-element-change', {
      bubbles: true,
      composed: true,
      detail: {
        text: (e.target as HTMLTextAreaElement).value,
      },
    });
    this.dispatchEvent(event);
  }

  validate(): boolean {
    return true;
  }

  /**
   * The defualt transparency demand contains all transparency actions
   * @returns List of demands with each TRANSPARENCY.* action
   */
  getDefaultDemand(): Demand {
    return {
      action: ACTION.ACCESS,
      // Default is all the non-subcategory access options
      dataCategory: new Set<DATA_CATEGORY>(
        Object.values(DATA_CATEGORY).filter(dc => !dc.includes('.'))
      ),
      // Default is all provenance options
      restrictions: new Set<Restriction>(Object.values(PROVENANCE)),
    };
  }

  getEditTemplate(demand: Demand): TemplateResult<1 | 2> {
    return html`
      <p id="edit-heading-1">
        <b>${msg('Details of my ACCESS Demand')}</b>
      </p>

      <div class="light-border access-options">
        <span slot="prompt"><b>${msg('I want to access:')}</b></span>
        <all-checklist
          .choices=${this.allowedDataCategories
            .filter(dc => dc !== DATA_CATEGORY['OTHER-DATA'])
            .map(dc => ({
              id: dc,
              description: DATA_CATEGORY_DESCRIPTIONS[dc](),
              checked: demand.dataCategory?.has(dc),
              disabled: false,
            }))}
          all-message=${msg(
            'ALL categories of data the organization has data on me'
          )}
          component-mode=${FormComponentState.CLOSED}
          event-prefix="access-option"
          include-buttons
          include-other=${this.allowedDataCategories.includes(
            DATA_CATEGORY['OTHER-DATA']
          )}
        ></all-checklist>
      </div>

      <slotted-dropdown header=${msg('Advanced settings')} include-buttons>
        <span slot="prompt"
          ><b
            >${msg(
              'My demand applies to data from the following provenance:'
            )}</b
          ></span
        >
        <all-checklist
          .choices=${Object.values(PROVENANCE).map(p => ({
            id: p,
            description: PROVENANCE_DESCRIPTIONS[p](),
            checked: demand.restrictions?.has(p),
            disabled: false,
          }))}
          all-message=${msg('All provenances')}
          component-mode=${FormComponentState.OPEN}
          event-prefix="provenance"
        ></all-checklist>
      </slotted-dropdown>
      <slotted-dropdown
        header=${msg('Additional message (optional)')}
        include-buttons
      >
        <div class="additional-msg-ctr">
          <span class="">${msg('My additional message:')}</span>
          <span class="italic"
            >${msg(
              'Please note that adding a personalized message might lead to the demand taking longer to be processed'
            )}</span
          >
          <textarea
            id="additional-msg"
            class="std-txt-area"
            name="paragraph_text"
            cols="50"
            rows="10"
            @input=${this.handleAdditionalMessageInput}
            .value=${demand.message ?? ''}
          ></textarea>
        </div>
      </slotted-dropdown>
    `;
  }
}

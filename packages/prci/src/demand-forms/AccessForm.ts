import { msg } from '@lit/localize';
import { css, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Demand } from '../models/demand.js';
import {
  DATA_CATEGORY,
  PROCESSING_CATEGORY,
  PROVENANCE,
  PURPOSE,
  TARGET,
} from '../models/priv-terms.js';
import {
  buttonStyles,
  containerStyles,
  imgStyles,
  textStyles,
} from '../styles.js';
import {
  DATA_CATEGORY_DESCRIPTIONS,
  PROVENANCE_DESCRIPTIONS,
  TARGET_DESCRIPTIONS,
} from '../utils/dictionary.js';
import { DemandForm } from './DemandForm.js';
import { FormComponentState } from '../utils/states.js';

import '../SlottedDropdown.js';
import '../AllChecklist.js';

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
      this.demand.restrictions!.privacy_scope!.push({
        dc: id as DATA_CATEGORY,
        pc: PROCESSING_CATEGORY.ALL,
        pp: PURPOSE.ALL,
      });
    });
    this.addEventListener('access-option-deselect', e => {
      const { id } = (e as CustomEvent).detail;
      this.demand.restrictions!.privacy_scope!.splice(
        this.demand.restrictions!.privacy_scope!.findIndex(
          psr => psr.dc === (id as DATA_CATEGORY)
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
  }

  handleAdditionalMessageInput(e: Event) {
    const { value } = e.target as HTMLTextAreaElement;
    this.demand.message = value;
  }

  handleProvenanceTermClick(e: Event) {
    const { id } = (e as CustomEvent).target as HTMLInputElement;
    this.demand.restrictions!.provenance!.term = id as PROVENANCE;
  }

  handleProvenanceTargetClick(e: Event) {
    const { id } = (e as CustomEvent).target as HTMLInputElement;
    this.demand.restrictions!.provenance!.target = id as TARGET;
  }

  handleDateRestrictionInput(e: Event) {
    const { id, value } = e.target as HTMLInputElement;
    if (id === 'date-start') {
      if (value) {
        this.demand.restrictions!.date_range!.from = new Date(value);
      } else {
        // Value is false when user hits 'clear' button on date picker
        delete this.demand.restrictions?.date_range?.from;
      }
    } else if (id === 'date-end') {
      if (value) {
        this.demand.restrictions!.date_range!.to = new Date(value);
      } else {
        delete this.demand.restrictions?.date_range?.to;
      }
    }
  }

  validate(): boolean {
    return true;
  }

  getEditTemplate(demand: Demand): TemplateResult<1 | 2> {
    return html`
      <p id="edit-heading-1">
        <b>${msg('Details of my ACCESS Demand')}</b>
      </p>

      <div class="light-border access-options">
        <span slot="prompt">${msg('I want to access:')}</span>
        <all-checklist
          .choices=${this.allowedDataCategories.map(dc => ({
            id: dc,
            description: DATA_CATEGORY_DESCRIPTIONS[dc](),
            checked:
              demand.restrictions?.privacy_scope?.findIndex(
                psr => psr.dc === dc
              ) !== -1,
            disabled: false,
          }))}
          all-message=${msg(
            'ALL categories of data the organization has data on me'
          )}
          component-mode=${FormComponentState.CLOSED}
          event-prefix="access-option"
          include-buttons
        ></all-checklist>
      </div>

      <slotted-dropdown header=${msg('Advanced settings')} include-buttons>
        <div class="date-restriction-ctr">
          <p>
            ${msg(
              'Specify a date range for the selected category(ies) of data:'
            )}
          </p>
          <div>
            <span>${msg('From')}</span>
            <input
              id="date-start"
              type="date"
              .value=${demand.restrictions?.date_range?.from
                ? demand.restrictions?.date_range?.from
                    .toISOString()
                    .split('T')[0]
                : ''}
              @input=${this.handleDateRestrictionInput}
            />
            <span>${msg('to')}</span>
            <input
              id="date-end"
              type="date"
              .value=${demand.restrictions?.date_range?.to
                ? demand.restrictions?.date_range?.to
                    .toISOString()
                    .split('T')[0]
                : ''}
              @input=${this.handleDateRestrictionInput}
            />
          </div>
        </div>
        <div>
          <span>
            ${msg('My demand applies to data from the following provenance:')}
          </span>
          <fieldset class="provenance-restriction">
            ${Object.values(PROVENANCE).map(
              p => html`
                <input
                  id=${p}
                  name='provenance-term'
                  type='radio'
                  ?checked=${demand.restrictions?.provenance?.term === p}
                  @click=${this.handleProvenanceTermClick}>
                </input>
                <label for=${p}>${PROVENANCE_DESCRIPTIONS[p]()}</label><br/>
              `
            )}
          </fieldset>
        </div>
        <div>
          <span> ${msg('I address my demand to:')} </span>
          <fieldset class="provenance-restriction">
            ${Object.values(TARGET)
              .filter(t => t !== TARGET.ALL)
              .map(
                t => html`
                <input
                  id=${t}
                  name='provenance-target'
                  type='radio'
                  ?checked=${demand.restrictions?.provenance?.target === t}
                  @click=${this.handleProvenanceTargetClick}>
                </input>
                <label for=${t}>${TARGET_DESCRIPTIONS[t]()}</label><br/>
              `
              )}
          </fieldset>
        </div>
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
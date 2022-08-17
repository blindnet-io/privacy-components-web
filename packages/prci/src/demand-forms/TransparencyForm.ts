import { msg } from '@lit/localize';
import { css, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Demand } from '../models/demand.js';
import { ACTION, PROVENANCE } from '../models/priv-terms.js';
import {
  buttonStyles,
  containerStyles,
  imgStyles,
  textStyles,
} from '../styles.js';
import { enabledActions } from '../utils/conf.js';
import {
  ACTION_DESCRIPTIONS,
  PROVENANCE_DESCRIPTIONS,
} from '../utils/dictionary.js';
import { ActionForm } from './ActionForm.js';
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
@customElement('transparency-form')
export class TransparencyForm extends ActionForm {
  @property({ type: Array, attribute: false })
  transparencyActions: ACTION[] = Object.values(ACTION).filter(a =>
    a.includes('TRANSPARENCY.')
  );

  @property({ type: Array }) advancedSettings = [];

  @property({ type: String }) additionalMessage = '';

  static styles = [
    ActionForm.styles,
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

      .transparency-options {
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

      #review-heading-1 {
        font-weight: bold;
        /* padding: 0px; */
      }

      #extra-msg-txt {
        padding: 0px 0px 0px 20px;
      }

      p {
        margin: 0px;
      }

      .additional-msg-ctr {
        display: grid;
        row-gap: 20px;
      }
    `,
  ];

  constructor() {
    super();

    this.addEventListener('transparency-demand-select', e => {
      const details = (e as CustomEvent).detail;
      // eslint-disable-next-line no-restricted-globals
      const demandId = self.crypto.randomUUID();
      const demand: Demand = {
        action: details.id,
        message: this.additionalMessage,
      };
      this.setDemand(demandId, demand);
    });

    this.addEventListener('transparency-demand-deselect', e => {
      const details = (e as CustomEvent).detail;
      // Delete demands for the unchecked action
      Array.from(this.demands)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, d]) => d.action === details.id)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .forEach(([demandId, _]) => {
          // this.demands.delete(demandId); // NOTE: Disabling this so state flows down components
          // Fire event to delete a single demand
          this.deleteDemand(demandId);
        });

      // Fire event indicating the demand builder for this form is in an invalid state
      if (details['none-selected']) {
        const event = new CustomEvent('demand-invalidated', {
          bubbles: true,
          composed: true,
          detail: {
            demandBuilderId: this.demandBuilderId,
          },
        });
        this.dispatchEvent(event);
      }
    });

    this.addEventListener('text-element-change', e => {
      this.additionalMessage = (e as CustomEvent).detail?.text;
      // Update existing demands
      this.demands.forEach(d => {
        const demand = d;
        demand.message = this.additionalMessage;
      });
      this.setMultipleDemands(this.demands);
    });
  }

  handleAdditionalMessageInput() {}

  getEditTemplate(): TemplateResult<1 | 2> {
    const selectedActions = Object.values(this.demands).map(d => d.action);
    return html`
      <p id="edit-heading-1">
        <b>${msg('Details of my TRANSPARENCY Demand')}</b>
      </p>

      <div class="light-border transparency-options">
        <span slot="prompt"><b>${msg('I want to know:')}</b></span>
        <all-checklist
          .choices=${this.transparencyActions.map(a => ({
            id: a,
            description: ACTION_DESCRIPTIONS[a](),
            checked: selectedActions.includes(a),
            disabled: !enabledActions.get(a) ?? true,
          }))}
          all-message=${msg(
            'ALL information related to data processing practices and know if the organization has data on me'
          )}
          component-mode=${FormComponentState.CLOSED}
          event-prefix="transparency-demand"
          include-buttons
        ></all-checklist>
      </div>

      <slotted-dropdown header=${msg('Advanced settings')} include-buttons>
        <span slot="prompt"
          ><b
            >${msg(
              'My transparency demand applies to the following provenance:'
            )}</b
          ></span
        >
        <all-checklist
          .choices=${Object.values(PROVENANCE).map(p => ({
            id: p,
            description: PROVENANCE_DESCRIPTIONS[p](),
            checked: true,
            disabled: false,
          }))}
          all-message=${msg('All provenances')}
          component-mode=${FormComponentState.OPEN}
        ></all-checklist>
      </slotted-dropdown>
      <slotted-dropdown header=${msg('Additional message (optional)')}>
        <div class="additional-msg-ctr">
          <span class="">${msg('My additional message:')}</span>
          <span class="italic"
            >${msg(
              'Please note that adding a personalized message might lead to the demand taking longer to be processed'
            )}</span
          >
          <textarea
            class="std-txt-area"
            name="paragraph_text"
            cols="50"
            rows="5"
            @input=${this.handleAdditionalMessageInput}
          ></textarea>
        </div>
      </slotted-dropdown>
    `;
  }

  getReviewTemplate(): TemplateResult<1 | 2> {
    return html`
      <div id="dmd-ctr">
        <p id="review-hd-1"><b>${msg('TRANSPARENCY demand')}</b></p>
        <p>${msg('I want to know:')}</p>
        <ul id="transparency-demand-review-list">
          ${Array.from(this.demands.values()).map(
            (a: Demand) =>
              html` <li><b>${ACTION_DESCRIPTIONS[a.action]()}</b></li> `
          )}
        </ul>
        ${this.additionalMessage
          ? html`
              <p>${msg('Plus additional info:')}</p>
              <p id="extra-msg-txt"><i>${this.additionalMessage}</i></p>
            `
          : null}
      </div>
    `;
  }
}

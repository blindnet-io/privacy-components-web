import { msg } from '@lit/localize';
import { css, html, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Demand } from '../models/demand.js';
import { ACTION, PROVENANCE } from '../models/priv-terms.js';
import { buttonStyles, imgStyles, textStyles } from '../styles.js';
import { enabledActions } from '../utils/conf.js';
import {
  ACTION_DESCRIPTIONS,
  PROVENANCE_DESCRIPTIONS,
} from '../utils/dictionary.js';
import { ActionForm } from './ActionForm.js';

import '../CheckboxDropdown.js';
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
  transparencyActions: ACTION[] = [];

  @state() _advancedSettings = [];

  @state() _additionalMessage = undefined;

  static styles = [
    buttonStyles,
    textStyles,
    imgStyles,
    css`
      :host {
        display: grid;
        row-gap: 35px;
        grid-column: 2/5;
        align-content: flex-start;
        border: 2px solid #000;
        border-radius: 20px;
        padding: 40px 60px 40px 60px;
        margin: 0px;
      }

      :host([demand-state='2']) {
        padding: 30px;
        grid-column: 1/5;
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
        padding: 0px 0px 0px 10px;
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
    `,
  ];

  constructor() {
    super();

    this.addEventListener('dropdown-element-add', e => {
      const details = (e as CustomEvent).detail;
      // eslint-disable-next-line no-restricted-globals
      const demandId = self.crypto.randomUUID();
      const demand: Demand = {
        action: details.id,
        message: this._additionalMessage,
      };
      this.setDemand(demandId, demand);
    });

    this.addEventListener('dropdown-element-delete', e => {
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
      this._additionalMessage = (e as CustomEvent).detail?.text;
      // Update existing demands
      this.demands.forEach(d => {
        const demand = d;
        demand.message = this._additionalMessage;
      });
      this.setMultipleDemands(this.demands);
    });
  }

  getEditTemplate(): TemplateResult<1 | 2> {
    const selectedActions = Object.values(this.demands).map(d => d.action);
    return html`
      <p id="edit-heading-1">
        <b>${msg('Details of my TRANSPARENCY Demand')}</b>
      </p>
      <checkbox-dropdown
        .choices=${this.transparencyActions.map(a => ({
          id: a,
          description: ACTION_DESCRIPTIONS[a](),
          checked: selectedActions.includes(a),
          disabled: !enabledActions.get(a) ?? true,
        }))}
      ></checkbox-dropdown>
      <slotted-dropdown header=${msg('Advanced settings')}>
        <all-checklist
          .choices=${Object.values(PROVENANCE).map(p => ({
            id: p,
            description: PROVENANCE_DESCRIPTIONS[p](),
            checked: true,
            disabled: false,
          }))}
        ></all-checklist>
      </slotted-dropdown>
      <slotted-dropdown header=${msg('Additional message (optional)')}>
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
        ${this._additionalMessage
          ? html`
              <p>${msg('Plus additional info:')}</p>
              <p id="extra-msg-txt"><i>${this._additionalMessage}</i></p>
            `
          : null}
      </div>
    `;
  }
}

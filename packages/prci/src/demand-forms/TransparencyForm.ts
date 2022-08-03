import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { msg } from '@lit/localize';

import '../DemandBuilderDropdownElement.js';
import '../DemandBuilderTextElement.js';
import { ACTION } from '../models/priv-terms.js';
import { Demand } from '../models/demand.js';
import { ACTION_DESCRIPTIONS } from '../utils/dictionary.js';
import { DemandState } from '../utils/states.js';
import { enabledActions } from '../utils/conf.js';

/**
 * ActionForm for the Transparency PRIV action. Includes a dropdown and text element.
 *
 * The transparency form follows a different pattern than the other actions, as each
 * TRANSPARENCY.* actually represents a completely separate demand, but we display them
 * all in one DemandBuilder element.
 */
@customElement('transparency-form')
export class TransparencyForm extends LitElement {
  @property({ type: Number, attribute: 'demand-state' })
  demandState: DemandState = DemandState.EDIT;

  @property({ type: Array, attribute: false })
  transparencyActions: ACTION[] = [];

  @property({ attribute: false }) demands = new Map<string, Demand>();

  @property({ attribute: false }) demandBuilderId: string = '';

  private _extraMessage = undefined;

  constructor() {
    super();

    this.addEventListener('dropdown-element-add', e => {
      const details = (e as CustomEvent).detail;
      const demandId = self.crypto.randomUUID();
      const demand: Demand = {
        action: details.id,
        message: this._extraMessage,
      };
      this.demands.set(demandId, demand);

      // Fire event to set a single demand
      const setEvent = new CustomEvent('demand-set', {
        bubbles: true,
        composed: true,
        detail: {
          demandId,
          demand,
        },
      });
      this.dispatchEvent(setEvent);

      // Fire event indicating the demand builder is in a valid state once one choice is selected
      if (details['first-selection']) {
        const dmdValidEvent = new CustomEvent('demand-validated', {
          bubbles: true,
          composed: true,
          detail: {
            demandBuilderId: this.demandBuilderId,
          },
        });
        this.dispatchEvent(dmdValidEvent);
      }
    });

    this.addEventListener('dropdown-element-delete', e => {
      const details = (e as CustomEvent).detail;
      // Delete demands for the unchecked action
      Array.from(this.demands)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, d]) => d.action === details.id)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .forEach(([id, _]) => {
          this.demands.delete(id);
          // Fire event to delete a single demand
          const event = new CustomEvent('demand-delete', {
            bubbles: true,
            composed: true,
            detail: {
              id,
            },
          });
          this.dispatchEvent(event);
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
      this._extraMessage = (e as CustomEvent).detail?.text;
      // Update existing demands
      this.demands.forEach(d => {
        const demand = d;
        demand.message = this._extraMessage;
      });

      // Fire event to set multiple demands
      const event = new CustomEvent('demand-set-multiple', {
        bubbles: true,
        composed: true,
        detail: {
          demands: this.demands,
        },
      });
      this.dispatchEvent(event);
    });
  }

  static styles = css`
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
  `;

  /**
   * Get the edit display for a transparency demand
   * @returns HTML template for edit display
   */
  getEditTemplate() {
    const selectedActions = Object.values(this.demands).map(d => d.action);
    return html`
      <p id="edit-heading-1">
        <b>${msg('Details of my TRANSPARENCY Demand')}</b>
      </p>
      <demand-builder-dropdown-element
        .choices=${this.transparencyActions.map(a => ({
          id: a,
          description: ACTION_DESCRIPTIONS[a](),
          checked: selectedActions.includes(a),
          disabled: !enabledActions.get(a) ?? true,
        }))}
      ></demand-builder-dropdown-element>
      <demand-builder-text-element></demand-builder-text-element>
    `;
  }

  /**
   * Get the review display for a transparency demand
   * @returns HTML template for review display
   */
  getReviewTemplate() {
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
        ${this._extraMessage
          ? html`
              <p>${msg('Plus additional info:')}</p>
              <p id="extra-msg-txt"><i>${this._extraMessage}</i></p>
            `
          : null}
      </div>
    `;
  }

  render() {
    return html`
      ${choose(this.demandState, [
        [DemandState.EDIT, () => this.getEditTemplate()],
        [DemandState.REVIEW, () => this.getReviewTemplate()],
      ])}
    `;
  }
}

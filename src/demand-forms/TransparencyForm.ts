import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';

import '../DemandBuilderDropdownElement.js';
import '../DemandBuilderTextElement.js';
import { TRANSPARENCY_ACTION } from '../models/priv-terms.js';
import { Demand } from '../models/demand.js';
import { descriptions } from '../utils/dictionary.js';
import { DemandState } from '../utils/states.js';

/**
 * Could either do it where this component waits for notice of demand completion button click
 * to send the full demand, or sends a new demand to demand builder each time there is a change
 */
@customElement('transparency-form')
export class TransparencyForm extends LitElement {
  @property({ attribute: false }) demandState: DemandState = DemandState.EDIT;

  @property({ type: Array, attribute: false })
  transparencyActions: TRANSPARENCY_ACTION[] = [];

  @property({ attribute: false }) demands = new Map<string, Demand>();

  private _selectedActions = new Set<string>();

  private _extraMessage = undefined;

  constructor() {
    super();
    this.addEventListener('dropdown-element-selection-click', e => {
      const details = (e as CustomEvent).detail;
      const actionId = (e as CustomEvent).detail?.selectionId;
      if (details?.isChecked) {
        // Add a new demand and dispatch event if first selection
        this.demands.set(actionId, {
          action: actionId,
          message: this._extraMessage,
        });
        // eslint-disable-next-line no-empty
        if (this._selectedActions.size === 1) {
        }
      } else {
        // Remove selection and dispatch event if last unselection
        this._selectedActions.delete(actionId);
        // eslint-disable-next-line no-empty
        if (this._selectedActions.size === 0) {
        }
      }
      this.updateDemandBuilder();
    });

    this.addEventListener('text-element-change', e => {
      this._extraMessage = (e as CustomEvent).detail?.text;
      // Update existing demands
      this.demands.forEach(d => {
        const demand = d;
        demand.message = this._extraMessage;
      });
      this.updateDemandBuilder();
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
      padding: 40px 60px 60px 60px;
      margin: 0px 0px 0px 0px;
    }

    #dmd-ctr ul {
      margin: 0;
    }

    #dmd-ctr li:not(:last-child) {
      margin-bottom: 15px;
    }

    #dmd-heading-1 {
      font-weight: bold;
      grid-column: 1/2;
      padding: 0px 0px 0px 10px;
    }

    #dmd-heading-2 {
      grid-column: 1/2;
    }

    #transparency-demand-review-list {
      grid-column: 1/3;
    }

    p {
      margin: 0px;
    }
  `;

  updateDemandBuilder() {
    const event = new CustomEvent('demand-update-multiple', {
      bubbles: true,
      composed: true,
      detail: {
        demands: this.demands,
      },
    });
    this.dispatchEvent(event);
  }

  getEditTemplate() {
    return html`
      <p id="dmd-heading-1"><b>Details of my TRANSPARENCY Demand</b></p>
      <demand-builder-dropdown-element
        .choices=${this.transparencyActions.map(a => ({
          id: a,
          description: descriptions[a],
        }))}
      ></demand-builder-dropdown-element>
      <demand-builder-text-element></demand-builder-text-element>
    `;
  }

  getReviewTemplate() {
    return html`
      <div id="dmd-ctr">
        <p id="dmd-heading-1">
          TRANSPARENCY demand
          <!-- FIXME: Should reference dictionary/do translation here instead -->
        </p>
        <p id="transparency-demand-review-heading-2">I want to know:</p>
        <ul id="transparency-demand-review-list">
          ${Array.from(this.demands.values()).map(
            (a: Demand) => html` <li>${descriptions[a.action]}</li> `
          )}
        </ul>
        ${this._extraMessage
          ? html`
              <p id="transparency-demand-review-heading-2">
                Plus additional info:
              </p>
              ${this._extraMessage}
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

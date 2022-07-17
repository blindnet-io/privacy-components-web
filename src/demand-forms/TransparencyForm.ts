import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';

import '../DemandBuilderDropdownElement.js';
import '../DemandBuilderTextElement.js';
import { Demand, TRANSPARENCY_ACTION } from '../priv.js';
import { descriptions } from '../dictionary.js';

enum FormState {
  EDIT = 'edit',
  REVIEW = 'review',
}

/**
 * Could either do it where this component waits for notice of demand completion button click
 * to send the full demand, or sends a new demand to demand builder each time there is a change
 */
@customElement('transparency-form')
export class TransparencyForm extends LitElement {
  @property({ type: String }) formState: FormState = FormState.EDIT;

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
      row-gap: 20px;
    }

    #transparency-demand-review-container ul {
      margin: 0;
    }

    #transparency-demand-review-container li:not(:last-child) {
      margin-bottom: 15px;
    }

    #transparency-demand-review-heading-1 {
      font-weight: bold;
      grid-column: 1/2;
    }

    #transparency-demand-review-heading-2 {
      grid-column: 1/2;
    }

    #transparency-demand-review-list {
      grid-column: 1/3;
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

  render() {
    return html`
      ${choose(this.formState, [
        [
          FormState.EDIT,
          () => html`
            <demand-builder-dropdown-element
              .choices=${this.transparencyActions.map(a => ({
                id: a,
                desc: descriptions[a],
              }))}
            ></demand-builder-dropdown-element>
            <demand-builder-text-element></demand-builder-text-element>
          `,
        ],
        [
          FormState.REVIEW,
          () => html`
            ${console.log('in-review')} ${console.log(this.demands.values())}
            <div id="transparency-demand-review-container">
              <p id="transparency-demand-review-heading-1">
                TRANSPARENCY demand
                <!-- FIXME: Should reference dictionary/do translation here instead -->
              </p>
              <p id="transparency-demand-review-heading-2">I want to know:</p>
              <ul id="transparency-demand-review-list">
                ${Array.from(this.demands.values()).map(
                  (a: Demand) => html`
                    ${console.log(a)}
                    <li>${descriptions[a.action]}</li>
                  `
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
          `,
        ],
      ])}
    `;
  }
}

import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../DemandBuilderDropdownElement.js';
import '../DemandBuilderTextElement.js';
import { Demand } from '../priv.js';

/**
 * Could either do it where this component waits for notice of demand completion button click
 * to send the full demand, or sends a new demand to demand builder each time there is a change
 */
@customElement('transparency-form')
export class TransparencyForm extends LitElement {
  private _demands = new Map<string, Demand>();

  private _actions = new Set<string>();

  private _extraMessage = undefined;

  constructor() {
    super();
    this.addEventListener('dropdown-element-selection-click', e => {
      const details = (e as CustomEvent).detail;
      const actionId = (e as CustomEvent).detail?.selectionId;
      if (details?.isChecked) {
        // Add a new demand and dispatch event if first selection
        this._demands.set(actionId, {
          action: actionId,
          message: this._extraMessage,
        });
        if (this._actions.size === 1) {
          console.log('First selection');
        }
      } else {
        // Remove selection and dispatch event if last unselection
        this._actions.delete(actionId);
        if (this._actions.size === 0) {
          console.log('Last selection');
        }
      }
      this.updateDemandBuilder();
    });

    this.addEventListener('text-element-change', e => {
      this._extraMessage = (e as CustomEvent).detail?.text;
      // Update existing demands
      this._demands.forEach(d => {
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
  `;

  updateDemandBuilder() {
    const event = new CustomEvent('demand-update-multiple', {
      bubbles: true,
      composed: true,
      detail: {
        demands: this._demands,
      },
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <demand-builder-dropdown-element></demand-builder-dropdown-element>
      <demand-builder-text-element></demand-builder-text-element>
    `;
  }
}

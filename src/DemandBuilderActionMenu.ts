import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './ActionItem.js';
import { ACTION } from './models/priv-terms.js';
import { descriptions } from './utils/dictionary.js';
import { enabledActions } from './utils/conf.js';

/**
 * Grid menu of demand action types
 */
@customElement('demand-builder-action-menu')
export class DemandBuilerActionMenu extends LitElement {
  @property({ type: String }) description = 'Type of demand I want to submit:';

  @property({ attribute: false }) includedActions: ACTION[] = [];

  static styles = css`
    :host {
      grid-column: 1/5;
    }

    .actions-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 50px;
      padding: 30px 40px 10px 40px;
    }

    .description-heading {
      font-size: 18px;
      text-align: left;
      padding: 0px 0px 0px 10px;
    }
  `;

  render() {
    return html`
      <div class="description-heading">${this.description}</div>
      <div class="actions-container">
        ${this.includedActions.map(
          a =>
            html`<action-item
              action-name=${a}
              action-description=${descriptions[a]}
              ?disabled=${!enabledActions.get(a)}
            ></action-item>`
        )}
      </div>
    `;
  }
}

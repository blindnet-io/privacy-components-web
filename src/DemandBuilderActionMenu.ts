import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './ActionItem.js';

/**
 * Grid menu of demand action types
 */
@customElement('demand-builder-action-menu')
export class DemandBuilerActionMenu extends LitElement {
  @property({ type: String }) description = 'Type of demand I want to submit';

  @property({ type: Array }) includedActions: {
    NAME: string;
    DESCRIPTION: string;
  }[] = [];

  static styles = css`
    :host {
      grid-column: 1/5;
    }

    .actions-container {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(3, 1fr);
    }

    /* TODO: Which of these do we want to expose through variables? */
    .description-heading {
      color: var(--dmd-actions-menu-decription-color, #000);
      text-align: left;
      padding-bottom: 20px;
    }
  `;

  render() {
    return html`
      <div class="description-heading">${this.description}</div>
      <div class="actions-container">
        ${this.includedActions.map(
          a =>
            html`<action-item
              action-name=${a.NAME}
              action-description=${a.DESCRIPTION}
            ></action-item>`
        )}
      </div>
    `;
  }
}

import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './ActionItem.js';
import './TestElement.js';

/**
 * Grid menu of demand action types
 */
@customElement('demand-action-menu')
export class DemandActionMenu extends LitElement {
  @property({ type: String }) title = 'My privacy request';

  @property({ type: String }) description = 'Type of demand I want to submit';

  @property({ type: Array }) includedActions: {
    NAME: string;
    DESCRIPTION: string;
  }[] = [];

  static styles = css`
    .actions-container {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(3, 1fr);
    }

    /* TODO: Which of these do we want to expose through variables? */
    .title-heading {
      color: var(--dmnd-actions-menu-title-color, #000);
      font-weight: bold;
      font-size: 24px;
      text-align: center;
    }

    /* TODO: Which of these do we want to expose through variables? */
    .description-heading {
      color: var(--dmd-actions-menu-decription-color, #000);
      text-align: left;
    }
  `;

  render() {
    return html`
      <p class="title-heading">${this.title}</p>
      <p class="description-heading">${this.description}</p>
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

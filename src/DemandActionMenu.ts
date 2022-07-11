import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { action } from './priv.js';

import './ActionItem.js';
import './TestElement.js';

@customElement('demand-action-menu')
export class DemandActionMenu extends LitElement {
  @property({ type: String }) heading1 = 'My privacy request';

  @property({ type: String }) heading2 = 'Type of demand I want to submit';

  static styles = css`
    .actions-container {
      display: grid;
      gap: 10px;

      grid-template-columns: var(--dmnd-actions-menu-columns, 1fr 1fr 1fr);
    }
  `;

  actions = Object.values(action);

  render() {
    return html`
      <h1>${this.heading1}</h1>
      <h2>${this.heading2}</h2>
      <div class="actions-container">
        ${this.actions.map(
          a => html`<action-item action-name=${a}></action-item>`
        )}
      </div>
    `;
  }
}

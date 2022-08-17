import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized } from '@lit/localize';
import { ACTION_TITLES, ACTION_DESCRIPTIONS } from './utils/dictionary.js';

import './ActionItem.js';
import { ACTION } from './models/priv-terms.js';
import { enabledActions } from './utils/conf.js';

/**
 * Menu of clickable action types
 */
@localized()
@customElement('action-menu')
export class ActionMenu extends LitElement {
  // Text displayed above menu
  @property({ type: String }) prompt = 'Type of demand I want to submit:';

  // Actions to be displayed in the menu, each corresponding to an ActionItem.
  @property({ attribute: false }) includedActions: ACTION[] = [];

  static styles = css`
    .actions-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 50px;
      padding: 30px 40px 10px 40px;
    }

    .prompt-heading {
      font-size: 18px;
      text-align: left;
      padding: 0px 0px 0px 10px;
    }
  `;

  render() {
    return html`
      <div class="prompt-heading">${this.prompt}</div>
      <div class="actions-container">
        ${this.includedActions
          .filter(a => a !== ACTION['OTHER.DEMAND'])
          .map(
            a =>
              html`<action-item
                action-name=${ACTION_TITLES[a]()}
                action-description=${ACTION_DESCRIPTIONS[a]()}
                ?disabled=${!enabledActions.get(a)}
              ></action-item>`
          )}
      </div>
    `;
  }
}

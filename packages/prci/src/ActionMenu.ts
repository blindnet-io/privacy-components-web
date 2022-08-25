import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import './ActionItem.js';
import { ACTION } from './models/priv-terms.js';
import { enabledActions } from './utils/conf.js';
import { buttonStyles, containerStyles, textStyles } from './styles.js';
import { ComponentState } from './utils/states.js';

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

  static styles = [
    textStyles,
    containerStyles,
    buttonStyles,
    css`
      .actions-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 50px;
        /* padding: 30px 40px 10px 40px; */
      }

      .prompt-heading {
        font-size: 16px;
        text-align: left;
        padding: 0px 0px 0px 0px;
        margin: 0px 0px 35px 0px;
      }

      #other-dmd-btn {
        margin: 20px 0px 0px 0px;
        justify-self: right;
      }

      #below-menu-btns-ctr {
        display: grid;
        row-gap: 100px;
      }

      #requests-btn {
        display: flex;
        justify-content: center;
        justify-self: center;
        align-items: center;
        column-gap: 20px;
        background: none;
        padding: 20px;
        width: 35%;
        font-size: 18px;
        border-radius: 15px;
      }

      #requests-btn:hover {
        border: 1px solid #18a0fb;
      }

      #requests-btn img {
        float: right;
      }
    `,
  ];

  handleRequestsClick() {
    this.dispatchEvent(
      new CustomEvent('component-state-change', {
        bubbles: true,
        composed: true,
        detail: {
          newState: ComponentState.REQUESTS,
        },
      })
    );
  }

  render() {
    return html`
      <div class="view-ctr medium-border">
        <div class="prompt-heading"><b>${this.prompt}</b></div>
        <div class="actions-container">
          ${this.includedActions
            .filter(a => a !== ACTION['OTHER.DEMAND'])
            .map(
              a =>
                html`<action-item
                  .action=${a}
                  ?disabled=${!enabledActions.get(a)}
                ></action-item>`
            )}
        </div>
      </div>
      <div id='below-menu-btns-ctr'>
        <button id="other-dmd-btn" class="link-btn medium-font underline">
          ${msg(
            'Click here if you want to make some other demand (please note that it might take longer to be answered)'
          )}
        </button>
        <button id='requests-btn' class='curve-btn medium-border' @click=${
          this.handleRequestsClick
        }>
          <span>${msg('Access my submitted Privacy Requests')}</span>
          <img src='packages/prci/src/assets/icons/arrow_right.svg' alt='right arrow'></img>
        </button>
      </div>
    `;
  }
}

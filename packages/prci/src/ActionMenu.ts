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
        row-gap: 50px;
        max-width: 1170px;
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
      <div id="below-menu-btns-ctr">
        <button id="other-dmd-btn" class="link-btn medium-font underline">
          ${msg(
            'Click here if you want to make some other demand (please note that it might take longer to be answered)'
          )}
        </button>
        <button
          id="requests-btn"
          class="curve-btn medium-border animated-btn"
          @click=${this.handleRequestsClick}
        >
          <span>${msg('Access my submitted Privacy Requests')}</span>
          <svg
            width="15"
            height="26"
            viewBox="0 0 15 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.923975 1.06753C0.572467 1.41914 0.375 1.89597 0.375 2.39315C0.375 2.89034 0.572467 3.36716 0.923975 3.71878L10.2052 13L0.923975 22.2813C0.582428 22.6349 0.393438 23.1085 0.39771 23.6002C0.401982 24.0918 0.599175 24.562 0.946815 24.9097C1.29445 25.2573 1.76473 25.4545 2.25635 25.4588C2.74797 25.4631 3.22159 25.2741 3.57522 24.9325L14.1821 14.3257C14.5336 13.974 14.7311 13.4972 14.7311 13C14.7311 12.5028 14.5336 12.026 14.1821 11.6744L3.57522 1.06753C3.22361 0.716021 2.74678 0.518555 2.2496 0.518555C1.75242 0.518555 1.27559 0.716021 0.923975 1.06753Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    `;
  }
}

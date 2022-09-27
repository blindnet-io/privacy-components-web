import { localized } from '@lit/localize';
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ACTION } from '@blindnet/core';
import { PRCIStyles } from './styles.js';
import { ACTION_DESCRIPTIONS, ACTION_TITLES } from './utils/dictionary.js';
import { ComponentState } from './utils/states.js';

@customElement('action-item')
/**
 * Button element representing a single demand action. Used in the action menu.
 */
@localized()
export class ActionItem extends LitElement {
  static styles = [
    PRCIStyles,
    css`
      /* :host button {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 16px;
      } */

      .action-button {
        border-radius: 15px;
        border: 0.5px solid #5b5b5b;
        background-color: #fafafa;
        padding: 10px 40px;
        height: 120px;
        width: 100%;
        max-width: 400px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .btn-txt {
        /* text-overflow: ellipsis; */
        overflow: hidden;
      }

      .bolder {
        font-weight: 700;
      }
    `,
  ];

  @property({ attribute: false }) action: ACTION = ACTION.ACCESS;

  // Boolean mapping to the disabled attribute of the HTMLButtonElement
  @property({ type: Boolean }) disabled: boolean = false;

  handleClick() {
    const event = new CustomEvent('component-state-change', {
      bubbles: true,
      composed: true,
      detail: {
        newState: ComponentState.EDIT,
        newAction: this.action,
      },
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <button
        class="action-button btn--clickable"
        @click="${this.handleClick}"
        ?disabled=${this.disabled}
      >
        <strong>${ACTION_TITLES[this.action]()}:</strong> ${ACTION_DESCRIPTIONS[
          this.action
        ]()}
      </button>
    `;
  }
}

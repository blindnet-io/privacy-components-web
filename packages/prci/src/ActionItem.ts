import { localized } from '@lit/localize';
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ACTION } from './models/priv-terms.js';
import { ACTION_DESCRIPTIONS, ACTION_TITLES } from './utils/dictionary.js';
import { ComponentState } from './utils/states.js';

@customElement('action-item')
/**
 * Button element representing a single demand action. Used in the action menu.
 */
@localized()
export class ActionItem extends LitElement {
  @property({ attribute: false }) action: ACTION = ACTION.ACCESS;

  // Boolean mapping to the disabled attribute of the HTMLButtonElement
  @property({ type: Boolean }) disabled: boolean = false;

  static styles = css`
    :host button {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      /* font-size: 16px; */
      font-size: 1rem;
    }

    .action-button:not([disabled]):hover {
      border: 1px solid #18a0fb;
      overflow: visible;
    }

    .action-button {
      border-radius: 15px;
      border-width: 1px;
      background-color: #fafafa;
      padding: 10px 40px;
      height: 120px;
      /* max-height: 120px; */
      width: 100%;
      max-width: 400px;
      text-align: left;
      transition: 0.5s;
      -webkit-transition: 0.5s;

      overflow: hidden;
      /* white-space: nowrap; */
      /* display: block; */
      text-overflow: ellipsis;
    }

    .btn-txt {
      /* text-overflow: ellipsis; */
      overflow: hidden;
    }

    .bolder {
      font-weight: 700;
    }
  `;

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
        class="action-button draw-border"
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

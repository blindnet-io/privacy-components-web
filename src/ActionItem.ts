import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('action-item')
/**
 * Button element representing a single demand request action
 */
export class ActionItem extends LitElement {
  @property({ type: String, attribute: 'action-name' }) actionName = '';

  @property({ type: String, attribute: 'action-description' })
  actionDescription = '';

  @property({ type: Boolean }) disabled: boolean = false;

  static styles = css`
    :host button {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 16px;
    }

    .action-button:not([disabled]):hover {
      border: 2px solid #dc4c87;
    }

    .action-button {
      border-radius: 15px;
      background-color: #fafafa;
      padding: 0px 40px;
      height: 120px;
      width: 100%;
      text-align: left;

      transition: 0.5s;
      -webkit-transition: 0.5s;
    }

    .bolder {
      font-weight: 700;
    }
  `;

  handleClick() {
    const event = new CustomEvent('demand-action-menu-click', {
      bubbles: true,
      composed: true,
      detail: {
        actionName: this.actionName,
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
        <strong>${this.actionName}:</strong> ${this.actionDescription}
      </button>
    `;
  }
}

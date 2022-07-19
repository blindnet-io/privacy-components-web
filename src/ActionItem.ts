import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('action-item')
/**
 * Button element representing a single demand request action
 */
export class ActionItem extends LitElement {
  static styles = css`
    :host button {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 16px;
    }

    .action-button {
      border-radius: 15px;
      background-color: #fafafa;
      padding: 0px 40px;
      height: 120px;
      width: 100%;
      text-align: left;
    }

    .bolder {
      font-weight: 700;
    }
  `;

  @property({ type: String, attribute: 'action-name' }) actionName = '';

  @property({ type: String, attribute: 'action-description' })
  actionDescription = '';

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
      <button class="action-button" @click="${this.handleClick}">
        <strong>${this.actionName}:</strong> ${this.actionDescription}
      </button>
    `;
  }
}

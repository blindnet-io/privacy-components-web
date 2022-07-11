import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('action-item')
/**
 * Button element representing a single demand request action
 */
export class ActionItem extends LitElement {
  static styles = css`
    .action-button {
      border-radius: 5px;
      padding: 20px;
      height: 120px;
      width: 100%;
      text-align: left;
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

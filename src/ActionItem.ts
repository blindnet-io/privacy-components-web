import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('action-item')
export class ActionItem extends LitElement {
  static styles = css`
    .action-button {
      border-radius: 5px;
      padding: 20px;
    }
  `;

  @property({ type: String, attribute: 'action-name' }) actionName = '';

  @property({ type: String }) actionDescription = '';

  handleClick() {
    console.log(this);
  }

  render() {
    return html`
      <button class="action-button" @click="${this.handleClick}">
        <strong>${this.actionName}:</strong>
      </button>
    `;
  }
}

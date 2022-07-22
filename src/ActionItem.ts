import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('action-item')
/**
 * Button element representing a single demand action. Used in the action menu.
 */
export class ActionItem extends LitElement {
  // Name of the action, displayed in bold
  @property({ type: String, attribute: 'action-name' }) actionName = '';

  // Description of the action, displayed after the actionName
  @property({ type: String, attribute: 'action-description' })
  actionDescription = '';

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
      border: 2px solid #18a0fb;
      overflow: visible;
    }

    .action-button {
      border-radius: 15px;
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
        <!-- <span class="btn-txt"></span> -->
      </button>
    `;
  }
}

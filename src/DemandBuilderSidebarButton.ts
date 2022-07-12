import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// TODO: Refactor this and ActionItem.ts to be the same component

@customElement('demand-builder-sidebar-button')
export class DemandBuilderSidebarButton extends LitElement {
  static styles = css`
    .action-button {
      border-radius: 5px;
      padding: 20px;
      height: 120px;
      width: 100%;
      text-align: left;
      color: black;
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
    console.log('rendering sidebar button');
    return html`
      <button class="action-button" @click="${this.handleClick}">
        <strong>${this.actionName}:</strong> ${this.actionDescription}
      </button>
    `;
  }
}

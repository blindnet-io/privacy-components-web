import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('dropdown-element-selection')
export class DropdownElementSelection extends LitElement {
  @property({ type: String }) id: string = '';

  @property({ type: String }) description: string = '';

  static styles = css``;

  handleCheckboxClick(e: Event) {
    const event = new CustomEvent('dropdown-element-selection-click', {
      bubbles: true,
      composed: true,
      detail: {
        selectionId: this.id,
        isChecked: (e.target as HTMLInputElement).checked,
      },
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <input type="checkbox" @click=${this.handleCheckboxClick} />
      <label>${this.description}</label>
    `;
  }
}

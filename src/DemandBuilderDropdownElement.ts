import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './DropdownElementSelection.js';

@customElement('demand-builder-dropdown-element')
export class DemandBuilderDropdownElement extends LitElement {
  @property({ type: String }) prompt = 'What would you like to know?';

  @property({ type: Array }) choices: { id: string; desc: string }[] = [];

  private _selectedChoices = new Set<string>();

  static styles = css`
    :host {
      display: grid;
      grid-template-columns: 7fr 1fr;
      grid-template-rows: 75px;
      border: 2px solid #000;
      border-radius: 10px;
    }

    .element-prompt {
      display: flex;
      align-items: center;
      margin: 0px 20px;
    }

    .dropdown-element-collapse-button {
      margin: 20px;
      height: 30px;
    }

    #choices-container {
      display: none;
      overflow: hidden;
      grid-column: 1/3;
      grid-template-rows: 75px;
      grid-template-columns: 1fr;
      margin: 0px 20px;
      row-gap: 5px;
    }
  `;

  handleCollapseButtonClick() {
    const content = this.shadowRoot?.getElementById('choices-container');

    if (content) {
      if (content.style.display !== 'grid') {
        content.style.display = 'grid';
        content.style.gridTemplateRows = `repeat(${this.choices.length}, 45px)`;
      } else {
        content.style.display = 'none';
        this.style.gridTemplateRows = '75px';
      }
    }
  }

  render() {
    return html`
      <div class="element-prompt">${this.prompt}</div>
      <button
        class="dropdown-element-collapse-button"
        @click=${this.handleCollapseButtonClick}
      ></button>
      <div id="choices-container">
        ${this.choices.map(
          c => html`
            <dropdown-element-selection
              id=${c.id}
              description=${c.desc}
            ></dropdown-element-selection>
          `
        )}
      </div>
    `;
  }
}

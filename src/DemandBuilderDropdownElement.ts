import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './DropdownElementSelection.js';

@customElement('demand-builder-dropdown-element')
export class DemandBuilderDropdownElement extends LitElement {
  @property({ type: String }) prompt = 'What would you like to know?';

  @property({ type: Array }) choices: { id: string; description: string }[] =
    [];

  @property({ type: Boolean, reflect: true }) open: boolean = true;

  private _selectedChoices = new Set<string>();

  static styles = css`
    :host {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      border: 2px solid #000;
      border-radius: 10px;
      padding: 20px 40px 40px 40px;
    }

    :host([open]) #choices-list {
      display: grid;
    }

    #prompt {
      display: flex;
      grid-column: 1/8;
      align-items: center;
    }

    #drpdwn-collapse-btn {
      grid-column: 8/9;
      height: 30px;
    }

    #choices-list {
      display: none;
      overflow: hidden;
      grid-column: 1/9;
      grid-template-columns: 1fr;
      row-gap: 35px;
      padding: 25px 0px 0px 0px;
    }

    #choice-ctr {
      padding: 0px 30px;
    }
  `;

  handleCheckboxClick(e: Event) {
    const { id, checked } = e.target as HTMLInputElement;
    if (checked) {
      this._selectedChoices.add(id);
      // Fire event indicating the first selection
      if (this._selectedChoices.size === 1) {
        this.dispatchEvent(new Event('first-selection'));
      }
    } else {
      this._selectedChoices.delete(id);
      // Fire event indicating no choices are selected
      if (this._selectedChoices.size === 0) {
        this.dispatchEvent(new Event('no-selection'));
      }
    }
  }

  render() {
    return html`
      <div id="prompt">${this.prompt}</div>
      <button
        id="drpdwn-collapse-btn"
        @click=${() => {
          this.open = !this.open;
        }}
      ></button>
      <div id="choices-list">
        ${this.choices.map(
          c => html`
            <div id="choice-ctr">
              <input
                id=${c.id}
                type="checkbox"
                @click=${this.handleCheckboxClick}
              />
              <label>${c.description}</label>
            </div>
          `
        )}
      </div>
    `;
  }
}

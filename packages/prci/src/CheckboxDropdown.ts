import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormComponentState } from './utils/states.js';

/**
 * Collapsable element displaying a prompt and list of choices, each with a checkbox.
 */
@customElement('checkbox-dropdown')
export class CheckboxDropdown extends LitElement {
  // String displayed at the top of the element, in both open and closed state
  @property({ type: String }) prompt = 'I want to know:';

  // List of choices to be displayed with a unique identifier, description string (displayed),
  // and checked boolean indicating if the option should be checked initially
  @property({ type: Array }) choices: {
    id: string;
    description: string;
    checked: boolean;
    disabled: boolean;
  }[] = [];

  // Boolean indicating if the choices should be displayed initially
  @property({ type: Number, reflect: true, attribute: 'dropdown-state' })
  dropdownState: FormComponentState = FormComponentState.CLOSED;

  private _selectedChoices = new Set<string>();

  static styles = css`
    :host {
      display: grid;
      border: 2px solid #000;
      border-radius: 10px;
      padding: 20px 40px 20px 40px;
    }

    :host([dropdown-state='2']) {
      padding: 20px 40px 40px 40px;
    }

    :host([dropdown-state='2']) #choices-list {
      display: grid;
    }

    :host([dropdown-state='2']) #drpdwn-collapse-btn {
      background: url('/src/assets/icons/close_container_arrow.svg');
    }

    #prompt {
      display: flex;
      align-items: center;
    }

    #drpdwn-collapse-btn {
      height: 24px;
      background: url('/src/assets/icons/open_container_arrow.svg');
      width: 24px;
      border: none;
      justify-self: center;
    }

    #choices-list {
      display: none;
      overflow: hidden;
      grid-template-columns: 1fr;
      row-gap: 35px;
      padding: 25px 0px 0px 0px;
    }

    #choice-ctr {
      padding: 0px 30px;
    }

    p {
      margin: 0px;
    }
  `;

  handleCheckboxClick(e: Event) {
    const { id, checked } = e.target as HTMLInputElement;
    if (checked) {
      this._selectedChoices.add(id);
      // Fire add event
      const event = new CustomEvent('dropdown-element-add', {
        bubbles: true,
        composed: true,
        detail: {
          id,
          'first-selection': this._selectedChoices.size === 1,
        },
      });
      this.dispatchEvent(event);
    } else {
      this._selectedChoices.delete(id);
      // Fire delete event
      const event = new CustomEvent('dropdown-element-delete', {
        bubbles: true,
        composed: true,
        detail: {
          id,
          'none-selected': this._selectedChoices.size === 0,
        },
      });
      this.dispatchEvent(event);
    }
  }

  handleOpenClick() {
    if (
      this.dropdownState === FormComponentState.CLOSED ||
      this.dropdownState === FormComponentState.PARTIAL
    ) {
      this.dropdownState = FormComponentState.OPEN;
    } else {
      this.dropdownState = FormComponentState.CLOSED;
    }
  }

  render() {
    return html`
      <p id="prompt">${this.prompt}</p>
      <div id="choices-list">
        ${this.choices.map(
          c => html`
            <div id="choice-ctr">
              <input
                id=${c.id}
                type="checkbox"
                @click=${this.handleCheckboxClick}
                ?checked=${c.checked}
                ?disabled=${c.disabled}
              />
              <label>${c.description}</label>
            </div>
          `
        )}
      </div>
      <button id="drpdwn-collapse-btn" @click=${this.handleOpenClick}></button>
    `;
  }
}

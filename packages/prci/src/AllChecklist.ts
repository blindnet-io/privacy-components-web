import { msg } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

interface Choice {
  id: string;
  description: string;
  checked: boolean;
  disabled: boolean;
}

@customElement('all-checklist')
export class AllChecklist extends LitElement {
  // List of choices to be displayed with a unique identifier, description string (displayed),
  // and checked boolean indicating if the option should be checked initially
  @property({ type: Array }) choices: Choice[] = [];

  @property({ type: Boolean }) includeAll: boolean = true;

  @property({ type: Boolean, reflect: true }) allChecked: boolean = true;

  @property({ type: String }) allPrefix: string = msg('Select all');

  @property({ type: String }) eventName: string = 'checklist-click';

  @state() _selectedChoices = new Set<string>();

  static styles = [
    css`
      :host([allchecked]) .choice-checkbox {
        opacity: 0.5;
      }

      #choices-list {
        overflow: hidden;
        grid-template-columns: 1fr;
        row-gap: 35px;
        padding: 25px 0px 0px 0px;
      }

      #choice-ctr {
        padding: 0px 30px;
      }

      #all-checkbox {
        display: none;
      }

      #all-checkbox + label {
        background: url('/src/assets/icons/all-checkbox-unchecked.svg')
          no-repeat;
        height: 13px;
        width: 13px;
        display: inline-block;
        margin: 3px 3px 3px 4px;
      }

      #all-checkbox:checked + label {
        background: url('/src/assets/icons/all-checkbox-checked.svg') no-repeat;
        height: 13px;
        width: 13px;
        display: inline-block;
        margin: 3px 3px 3px 4px;
      }
    `,
  ];

  selectChoice(id: string) {
    this._selectedChoices.add(id);
    // Fire add event
    const event = new CustomEvent(`${this.eventName}-select`, {
      bubbles: true,
      composed: true,
      detail: {
        id,
        'first-selection': this._selectedChoices.size === 1,
      },
    });
    this.dispatchEvent(event);
  }

  deleteChocie(id: string) {
    this._selectedChoices.delete(id);
    // Fire delete event
    const event = new CustomEvent(`${this.eventName}-deselect`, {
      bubbles: true,
      composed: true,
      detail: {
        id,
        'none-selected': this._selectedChoices.size === 0,
      },
    });
    this.dispatchEvent(event);
  }

  handleChoiceClick(e: Event) {
    const { id, checked } = e.target as HTMLInputElement;
    if (id === 'all-checkbox') {
      // Get all choice checkboxes
      const allCheckboxes =
        this.shadowRoot?.querySelectorAll('.choice-checkbox');

      if (checked) {
        // Select all deselected choices
        this.allChecked = true;
        allCheckboxes?.forEach(element => {
          const input = element as HTMLInputElement;
          if (!input.checked) {
            input.checked = true;
            this.selectChoice(input.id);
          }
        });
      } else {
        // Deselect all selected choices
        this.allChecked = false;
        allCheckboxes?.forEach(element => {
          const input = element as HTMLInputElement;
          if (input.checked) {
            input.checked = false;
            this.deleteChocie(input.id);
          }
        });
      }
    } else if (checked) {
      // Select a single choice
      this.selectChoice(id);
    } else {
      // Deselect a single choice
      this.deleteChocie(id);
    }
  }

  protected firstUpdated(): void {
    this.choices.forEach(c => {
      if (c.checked || this.allChecked) {
        this._selectedChoices.add(c.id);
      }
    });
    this.requestUpdate();
  }

  render() {
    return html`
      <div id="choices-list">
        <!-- Optionally render all button -->
        ${when(
          this.includeAll,
          () => html`
          <div id="choice-ctr">
            <input
              id="all-checkbox"
              type="checkbox"
              @click=${this.handleChoiceClick}
              ?checked=${this.allChecked}
            />
            <label for="all-checkbox">
          </div>
        `
        )}
        <!-- Render each choice -->
        ${Array.from(this.choices).map(
          c => html`
            <div id="choice-ctr">
              <input
                id=${c.id}
                class="choice-checkbox"
                type="checkbox"
                ?checked=${this._selectedChoices.has(c.id)}
                ?disabled=${c.disabled}
                @change=${this.handleChoiceClick}
              />
              <label>${c.description}</label>
            </div>
          `
        )}
      </div>
    `;
  }
}

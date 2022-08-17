import { msg } from '@lit/localize';
import { css, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { buttonStyles, containerStyles, textStyles } from './styles.js';
import { FormComponentState } from './utils/states.js';

interface Choice {
  id: string;
  description: string;
  checked: boolean;
  disabled: boolean;
}

/**
 * States describing the choice list
 */
enum SelectionState {
  ALL,
  SOME,
  NONE,
}

@customElement('all-checklist')
export class AllChecklist extends LitElement {
  // List of choices to be displayed with a unique identifier, description string (displayed),
  // and checked boolean indicating if the option should be checked initially
  @property({ type: Array }) choices: Choice[] = [];

  // State indicating if all, some, or none of choices are selected
  @property({ type: Number, reflect: true, attribute: 'selection-state' })
  selectionState: SelectionState = SelectionState.ALL;

  // UI mode for this component
  @property({ type: Number, reflect: true, attribute: 'component-mode' })
  componentMode: FormComponentState = FormComponentState.CLOSED;

  // Should all option be included
  @property({ type: Boolean }) includeAll: boolean = true;

  // Should all option be checked initially
  @property({ type: Boolean, reflect: true }) allChecked: boolean = true;

  // String to show with the all option
  @property({ type: String, attribute: 'all-message' }) allMessage: string =
    msg('Select all');

  // Prefix for events generated by selecting/deselecting options from the list
  @property({ type: String, attribute: 'event-prefix' }) eventPrefix: string =
    'checklist-click';

  // Should include a close button at bottom of container
  @property({ type: Boolean, attribute: 'include-buttons' }) includeButtons =
    false;

  // Holds the IDs of all selected choices
  @state() _selectedChoices = new Set<string>();

  static styles = [
    containerStyles,
    textStyles,
    buttonStyles,
    css`
      :host {
        display: grid;
      }

      :host([selection-state='0']) .choice-checkbox {
        opacity: 0.5;
      }

      :host([selection-state='0']) #all-checkbox:checked + label {
        opacity: 1;
        background: url('/packages/prci/src/assets/icons/all-checkbox-checked.svg')
          no-repeat;
      }

      :host([selection-state='1']) #all-checkbox + label {
        opacity: 1;
        background: url('/packages/prci/src/assets/icons/all-checkbox-dash.svg')
          no-repeat;
      }

      :host([selection-state='2']) .choice-checkbox {
        opacity: 1;
      }

      .choices-list {
        display: grid;
        overflow: hidden;
        grid-template-columns: 1fr;
        row-gap: 35px;
        padding: 35px 0px 25px 0px;
      }

      .choice-ctr {
        padding: 0px 30px;
      }

      .all-ctr {
        display: flex;
        align-items: center;
        padding: 0px 30px;
      }

      .all-prefix {
        padding: 0px 0px 0px 4px;
      }

      #all-checkbox {
        display: none;
      }

      #all-checkbox + label {
        background: url('/packages/prci/src/assets/icons/all-checkbox-unchecked.svg')
          no-repeat;
        height: 13px;
        width: 13px;
        display: inline-block;
        margin: 3px 3px 3px 4px;
      }
    `,
  ];

  /**
   * Select a choice and notify parent component
   * @param id ID of the choice to select
   */
  selectChoice(id: string) {
    this._selectedChoices.add(id);
    // Fire add event
    const event = new CustomEvent(`${this.eventPrefix}-select`, {
      bubbles: true,
      composed: true,
      detail: {
        id,
        'first-selection': this._selectedChoices.size === 1,
      },
    });
    this.dispatchEvent(event);
    this.updateSelectionState();
  }

  /**
   * Deselect a choice and notify parent component
   * @param id ID of the choice to delete
   */
  deleteChoice(id: string) {
    this._selectedChoices.delete(id);
    // Fire delete event
    const event = new CustomEvent(`${this.eventPrefix}-deselect`, {
      bubbles: true,
      composed: true,
      detail: {
        id,
        'none-selected': this._selectedChoices.size === 0,
      },
    });
    this.dispatchEvent(event);
    this.updateSelectionState();
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
            this.deleteChoice(input.id);
          }
        });
      }
    } else if (checked) {
      // Select a single choice
      this.selectChoice(id);
      // Set all to checked
      const allCheckbox = this.shadowRoot?.getElementById(
        'all-checkbox'
      ) as HTMLInputElement;
      allCheckbox.checked = true;
    } else {
      // Deselect a single choice
      this.deleteChoice(id);
      // Set all to unchecked if none selected
      if (this._selectedChoices.size === 0) {
        const allCheckbox = this.shadowRoot?.getElementById(
          'all-checkbox'
        ) as HTMLInputElement;
        allCheckbox.checked = false;
      }
    }
  }

  /**
   * Update the selection state based on currently selected choices
   */
  updateSelectionState() {
    switch (this._selectedChoices.size) {
      case 0:
        this.selectionState = SelectionState.NONE;
        break;
      case this.choices.length:
        this.selectionState = SelectionState.ALL;
        break;
      default:
        this.selectionState = SelectionState.SOME;
        break;
    }
  }

  /**
   * Determine which choices to display based on the checklist's mode
   * @returns
   */
  getDisplayChoices(): Array<Choice> {
    switch (this.componentMode) {
      case FormComponentState.CLOSED:
        return [];

      case FormComponentState.OPEN:
        return Array.from(this.choices);

      case FormComponentState.PARTIAL:
        return Array.from(this.choices).filter(c =>
          this._selectedChoices.has(c.id)
        );

      default:
        return [];
    }
  }

  /**
   * Hook into willUpdate lifecycle method to properly set the selected choices when the choices property changes
   * @param _changedProperties
   */
  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has('choices')) {
      this.choices.forEach(c => {
        if (c.checked || this.allChecked) {
          this.selectChoice(c.id);
        }
      });
    }
  }

  /**
   * Determine which to switch to when open or close button is clicked
   */
  handleButtonClick() {
    if (
      this.componentMode === FormComponentState.CLOSED ||
      this.componentMode === FormComponentState.PARTIAL
    ) {
      this.componentMode = FormComponentState.OPEN;
    } else {
      this.componentMode = FormComponentState.CLOSED;
    }
  }

  render() {
    return html`
      <div class="choices-list">
        <!-- Optionally render all button -->
        ${when(
          this.includeAll &&
            !(
              this.componentMode === FormComponentState.PARTIAL &&
              this.selectionState === SelectionState.SOME
            ),
          () => html`
            <div class="all-ctr">
              <input
                id="all-checkbox"
                type="checkbox"
                @click=${this.handleChoiceClick}
                ?checked=${this.allChecked}
              />
              <label for="all-checkbox"></label>
              <span class="all-prefix">${this.allMessage}</span>
            </div>
          `
        )}
        <!-- Render each choice -->
        ${this.getDisplayChoices().map(
          c => html`
            <div class="choice-ctr">
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
      <!-- Optionally include a close button -->
      ${when(
        this.includeButtons,
        () => html`
          <button
            @click=${this.handleButtonClick}
            class="ctr-btn ${this.componentMode === FormComponentState.OPEN
              ? 'close-btn'
              : 'open-btn'}"
          ></button>
        `
      )}
    `;
  }
}

import { msg } from '@lit/localize';
import { css, html, LitElement, PropertyValueMap, TemplateResult } from 'lit';
import { customElement, property, query, queryAll, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { when } from 'lit/directives/when.js';

/**
 * Refactoring TODO:
 * 
 * - Use @query('') instead reactive properties instead of searching
 *   for the elements each time
 * 
 *   See https://lit.dev/docs/api/decorators/#query
 * 
 */

const allCheckboxCheckedSvg = new URL(
  './assets/icons/all-checkbox-checked.svg',
  import.meta.url
).href;

const allCheckboxDashSvg = new URL(
  './assets/icons/all-checkbox-dash.svg',
  import.meta.url
).href;

const allCheckboxUncheckedSvg = new URL(
  './assets/icons/all-checkbox-unchecked.svg',
  import.meta.url
).href;

const closeContainerArrowSvg = new URL(
  './assets/icons/close-container-arrow.svg',
  import.meta.url
).href;

const expandListSvg = new URL(
  './assets/icons/bx_dots-vertical-rounded.svg',
  import.meta.url
).href;

interface Choice {
  value: string;
  display: TemplateResult<1|2>;
  checked: boolean;
  allChoice?: boolean;
}

/**
 * States describing the choice list
 */
enum SelectionState {
  ALL,
  SOME,
  NONE,
}

/**
 * @event {CustomEvent} bldn-all-checklist:choice-select - Fired when a choice is selected
 * @event {CustomEvent} bldn-all-checklist:choice-deselect - Fired when a choice is deselected
 */
@customElement('bldn-all-checklist')
export class BldnAllChecklist extends LitElement {

  // List of choices to be displayed with a unique identifier, description string (displayed),
  // and checked boolean indicating if the option should be checked initially
  @property({ type: Array }) choices: Choice[] = [];

  /** @prop */
  @property({ type: Boolean, reflect: true }) open: boolean = false;

  /** @prop */
  @property({ type: Boolean, attribute: 'include-other' }) includeOther = false;

  // TODO: Move this to state
  @property({ type: Number, reflect: true, attribute: 'selection-state' })
  selectionState: SelectionState = SelectionState.ALL;

  // Holds the IDs of all selected choices
  @state() selectedChoices = new Set<string>();

  @query('#all-checkbox')
  allCheckbox!: HTMLInputElement;

  @queryAll('.choice-checkbox')
  choiceCheckboxes!: HTMLInputElement[];

  /**
   * Select a choice and notify parent component
   * @param value value of the choice to select
   */
  selectChoice(value: string) {
    this.selectedChoices.add(value);
    // Fire add event
    const event = new CustomEvent(`bldn-all-checklist:choice-select`, {
      bubbles: true,
      composed: true,
      detail: {
        value,
        'first-selection': this.selectedChoices.size === 1,
      },
    });
    this.dispatchEvent(event);
  }

  /**
   * Deselect a choice and notify parent component
   * @param value value of the choice to delete
   */
  deselectChoice(value: string) {
    this.selectedChoices.delete(value);
    // Fire delete event
    const event = new CustomEvent(`bldn-all-checklist:choice-deselect`, {
      bubbles: true,
      composed: true,
      detail: {
        value,
        'none-selected': this.selectedChoices.size === 0,
      },
    });
    this.dispatchEvent(event);
  }

  handleChoiceClick(e: Event) {
    const { id, checked } = e.target as HTMLInputElement;

    if (id === 'all-checkbox') {

      if (checked) {
        // Select all choices
        this.choiceCheckboxes.forEach(input => {
          // eslint-disable-next-line no-param-reassign
          input.checked = true;
        })
        this.choices.filter(c => !c.allChoice).forEach(c => {
          this.selectChoice(c.value)
        })
      } else {
        // Deselect all choices
        this.choiceCheckboxes.forEach(input => {
          // eslint-disable-next-line no-param-reassign
          input.checked = false;
        })
        this.choices.filter(c => !c.allChoice).forEach(c => {
          this.deselectChoice(c.value)
        })
      }
    } else if (checked) {
      // Select one choice
      this.selectChoice(id)
    } else {
      // Deselect one choice
      this.deselectChoice(id)
    }

    // Update component state so checkboxes render properly
    this.updateSelectionState()
  }

  // TODO: Combine these two other events into one change event
  handleOtherClick(e: Event) {
    this.dispatchEvent(
      new CustomEvent(`bldn-all-checklist:other-click`, {
        bubbles: true,
        composed: true,
        detail: {
          checked: (e.target as HTMLInputElement).checked,
        },
      })
    );
  }

  handleOtherInput(e: Event) {
    this.dispatchEvent(
      new CustomEvent(`bldn-all-checklist:other-input`, {
        bubbles: true,
        composed: true,
        detail: {
          text: (e.target as HTMLInputElement).value,
        },
      })
    );
  }

  /**
   * Update the selection state based on currently selected choices
   */
  updateSelectionState() {

    switch (this.selectedChoices.size) {
      case 0:
        this.selectionState = SelectionState.NONE;
        break;
      case this.choices.length - 1:
        this.selectionState = SelectionState.ALL;
        break;
      default:
        this.selectionState = SelectionState.SOME;
        break;
    }
  }

  getCheckboxImg() {
    return html`
      ${choose(this.selectionState, [
        [
          SelectionState.NONE,
          () =>
            html`<img
              src=${allCheckboxUncheckedSvg}
              alt="empty checkbox"
            />`,
        ],
        [
          SelectionState.SOME,
          () =>
            html`<img
              src=${allCheckboxDashSvg}
              alt="dash checkbox"
            />`,
        ],
        [
          SelectionState.ALL,
          () =>
            html`<img
              src=${allCheckboxCheckedSvg}
              alt="checked checkbox"
            />`,
        ],
      ])}
    `
  }

  /**
   * Hook into willUpdate to ensure the selected choices set matches choices
   * @param _changedProperties Map of changed properties for this update
   */
  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has('choices')) {

      // Add all choices if all choice is checked intially
      const allChoice = this.choices.find(c => c.allChoice)
      if (allChoice && allChoice.checked) {
        this.choices.forEach(c => {
          if (!c.allChoice) {
            this.selectedChoices.add(c.value)
          }
        })
      }

      // Update selected choices based on initial input
      this.choices.forEach(c => {
        if (c.checked && !c.allChoice) {
          this.selectedChoices.add(c.value);
        }
      });
    }
  }

  render() {

    const allChoice = this.choices.find(c => c.allChoice) || {
      value: '*',
      display: html`<b>${msg('Select All')}</b>`,
      checked: true,
      allChoice: true
    }

    return html`

      <!-- Render each choice -->
      <div class="choices-list">

        <!-- All choice -->
        <div class="all-ctr">
          <input
            id="all-checkbox"
            type="checkbox"
            @click=${this.handleChoiceClick}
            ?checked=${allChoice.checked}
          />
          <label for="all-checkbox">
            ${this.getCheckboxImg()}
          </label>
          <span class="all-prefix">${allChoice.display}</span>
        </div>

        ${when(this.open, () => html`        
          ${this.choices.filter(c => !c.allChoice).map(
            c => html`
              <div class="choice-ctr">
                <input
                  id=${c.value}
                  class="choice-checkbox"
                  type="checkbox"
                  ?checked=${this.selectedChoices.has(c.value)}
                  @change=${this.handleChoiceClick}
                />
                <label>${c.display}</label>
              </div>
            `
          )}
          
          <!-- Optional other choice -->
          ${when(
            this.includeOther,
            () => html`
            <div id="other-data-ctr">
              <div class="choice-ctr">
                <input
                  id='other-checkbox'
                  type="checkbox"
                  @change=${this.handleOtherClick}
                />
                <label>${msg(
                  html`<b>OTHER-DATA:</b> Specify another type of data`
                )}</label>
              </div>
              <div id="other-data-input-ctr">
                <span>${msg('Other data type:')}</span>
                <input id="other-data-input" type="text"></input>
              </div>
            </div>
          `
          )}

        `)}

      </div>
      
      <!-- Expand/collapse button -->
      <button @click=${() => { this.open = !this.open }}>
        ${when(this.open,
          () =>
            html`<img src=${closeContainerArrowSvg} alt="close arrow" />`,
          () => html`<img src=${expandListSvg} alt="expand list" />`
        )}
      </button>
    `;
  }

  static styles = [
    css`
      :host {
        display: block;
        text-align: center;
      }

      :host([selection-state='0']) .choice-checkbox {
        opacity: 0.5;
      }

      :host([selection-state='0']) #all-checkbox:checked + label {
        opacity: 1;
      }

      :host([selection-state='1']) #all-checkbox + label {
        opacity: 1;
      }

      :host([selection-state='2']) .choice-checkbox {
        opacity: 1;
      }

      .choices-list {
        display: grid;
        overflow: hidden;
        grid-template-columns: 1fr;
        row-gap: 1.5em;
        padding: 0em 0em 1em 0em;
      }

      .choice-ctr {
        text-align: left;
      }

      .all-ctr {
        display: flex;
        align-items: center;
      }

      .all-prefix {
        padding: 0px 0px 0px 4px;
      }

      #all-checkbox {
        display: none;
      }

      #all-checkbox + label {
        height: 13px;
        width: 13px;
        display: inline-block;
        margin: 3px 3px 3px 4px;
      }

      #other-data-input-ctr {
        display: flex;
        column-gap: 5px;
        padding: 20px 55px;
        align-items: center;
      }

      #other-data-input input {
        height: 30px;
        width: 100%;
        background: #f8f8fc;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
      }

      #other-data-input span {
        flex-shrink: 0;
      }

      button {
        background: none;
        border: none;
      }
    `,
  ];
}

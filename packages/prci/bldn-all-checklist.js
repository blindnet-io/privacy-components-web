import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { property, state, query, queryAll, customElement } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

const allCheckboxCheckedSvg = new URL(new URL('assets/all-checkbox-checked.svg', import.meta.url).href, import.meta.url).href;
const allCheckboxDashSvg = new URL(new URL('assets/all-checkbox-dash.svg', import.meta.url).href, import.meta.url).href;
const allCheckboxUncheckedSvg = new URL(new URL('assets/all-checkbox-unchecked.svg', import.meta.url).href, import.meta.url).href;
const closeContainerArrowSvg = new URL(new URL('assets/close-container-arrow.svg', import.meta.url).href, import.meta.url).href;
const expandListSvg = new URL(new URL('assets/bx_dots-vertical-rounded.svg', import.meta.url).href, import.meta.url).href;
/**
 * States describing the choice list
 */
var SelectionState;
(function (SelectionState) {
    SelectionState[SelectionState["ALL"] = 0] = "ALL";
    SelectionState[SelectionState["SOME"] = 1] = "SOME";
    SelectionState[SelectionState["NONE"] = 2] = "NONE";
})(SelectionState || (SelectionState = {}));
/**
 * @event {CustomEvent} bldn-all-checklist:choice-select - Fired when a choice is selected
 * @event {CustomEvent} bldn-all-checklist:choice-deselect - Fired when a choice is deselected
 */
let BldnAllChecklist = class BldnAllChecklist extends LitElement {
    constructor() {
        super(...arguments);
        // List of choices to be displayed with a unique identifier, description string (displayed),
        // and checked boolean indicating if the option should be checked initially
        this.choices = [];
        /** @prop */
        this.open = false;
        /** @prop */
        this.includeOther = false;
        // TODO: Move this to state
        this.selectionState = SelectionState.ALL;
        // Holds the IDs of all selected choices
        this.selectedChoices = new Set();
    }
    /**
     * Select a choice and notify parent component
     * @param value value of the choice to select
     */
    selectChoice(value) {
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
    deselectChoice(value) {
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
    handleChoiceClick(e) {
        const { id, checked } = e.target;
        if (id === 'all-checkbox') {
            if (checked) {
                // Check all inputs
                this.choiceCheckboxes.forEach(input => {
                    input.checked = true;
                });
                // Select the all choice and deselect all others
                this.choices.forEach(c => {
                    if (c.allChoice) {
                        this.selectChoice(c.value);
                    }
                    else {
                        this.deselectChoice(c.value);
                    }
                });
            }
            else {
                // Uncheck all inputs
                this.choiceCheckboxes.forEach(input => {
                    input.checked = false;
                });
                // Deselect all choices
                this.choices.forEach(c => {
                    this.deselectChoice(c.value);
                });
            }
        }
        else if (checked) {
            if (this.selectedChoices.size === this.choices.length - 2) {
                // Deselect all choices and select the all choice
                this.allCheckbox.checked = true;
                this.choices.forEach(c => {
                    if (!c.allChoice) {
                        this.deselectChoice(c.value);
                    }
                    else {
                        this.selectChoice(c.value);
                    }
                });
                // Tick all checkboxes
                this.choiceCheckboxes.forEach(input => {
                    input.checked = true;
                });
                this.allCheckbox.checked = true;
            }
            else {
                // Select one choice as this wasn't that last one before every choice was checked
                this.selectChoice(id);
            }
        }
        else {
            if (this.allCheckbox.checked) {
                // Select all other choices if all was checked
                this.allCheckbox.checked = false;
                this.choices.forEach(c => {
                    if (c.value !== id && !c.allChoice) {
                        this.selectChoice(c.value);
                    }
                    else if (c.value) {
                        this.deselectChoice(c.value);
                    }
                });
            }
            else {
                // Deselect one choice as all wasn't checked already
                this.deselectChoice(id);
            }
        }
        // Update component state so checkboxes render properly
        this.updateSelectionState();
    }
    // TODO: Combine these two other events into one change event
    handleOtherClick(e) {
        this.dispatchEvent(new CustomEvent(`bldn-all-checklist:other-click`, {
            bubbles: true,
            composed: true,
            detail: {
                checked: e.target.checked,
            },
        }));
    }
    handleOtherInput(e) {
        this.dispatchEvent(new CustomEvent(`bldn-all-checklist:other-input`, {
            bubbles: true,
            composed: true,
            detail: {
                text: e.target.value,
            },
        }));
    }
    /**
     * Update the selection state based on currently selected choices
     */
    updateSelectionState() {
        const allChoice = this.choices.find(c => c.allChoice) || {
            value: '*',
            display: html `<b>${msg('Select All')}</b>`,
            checked: true,
            allChoice: true,
        };
        if (this.selectedChoices.size === 0) {
            this.selectionState = SelectionState.NONE;
        }
        else if (this.selectedChoices.size === 1 &&
            this.selectedChoices.has(allChoice.value)) {
            this.selectionState = SelectionState.ALL;
        }
        else {
            this.selectionState = SelectionState.SOME;
        }
    }
    getCheckboxImg() {
        const allChoice = this.choices.find(c => c.allChoice) || {
            value: '*',
            display: html `<b>${msg('Select All')}</b>`,
            checked: true,
            allChoice: true,
        };
        if (this.selectedChoices.size === 0) {
            return html `<img src=${allCheckboxUncheckedSvg} alt="empty checkbox" />`;
        }
        if (this.selectedChoices.size === 1 &&
            this.selectedChoices.has(allChoice.value)) {
            return html `<img src=${allCheckboxCheckedSvg} alt="checked checkbox" />`;
        }
        return html `<img src=${allCheckboxDashSvg} alt="dash checkbox" />`;
    }
    /**
     * Hook into willUpdate to ensure the selected choices set matches choices
     * @param _changedProperties Map of changed properties for this update
     */
    willUpdate(_changedProperties) {
        if (_changedProperties.has('choices')) {
            const allChoice = this.choices.find(c => c.allChoice);
            if (allChoice && allChoice.checked) {
                // Add only the al lvalue if all selected initially
                this.selectedChoices.add(allChoice.value);
            }
            else {
                // Otherwise, add all selected values based on initial input
                this.choices.forEach(c => {
                    if (c.checked && !c.allChoice) {
                        this.selectedChoices.add(c.value);
                    }
                });
            }
        }
        // Ensure all checkboxes have the proper appearance intially
        this.updateSelectionState();
    }
    render() {
        const allChoice = this.choices.find(c => c.allChoice) || {
            value: '*',
            display: html `<b>${msg('Select All')}</b>`,
            checked: true,
            allChoice: true,
        };
        return html `
      <!-- Render each choice -->
      <div class="choices-list">
        <!-- All choice -->
        <div class="all-ctr">
          <input
            id="all-checkbox"
            type="checkbox"
            @click=${this.handleChoiceClick}
            ?checked=${this.selectedChoices.has(allChoice.value)}
          />
          <label for="all-checkbox"> ${this.getCheckboxImg()} </label>
          <span class="all-prefix">${allChoice.display}</span>
        </div>

        ${when(this.open, () => html `
            ${this.choices
            .filter(c => !c.allChoice)
            .map(c => html `
                  <div class="choice-ctr">
                    <input
                      id=${c.value}
                      class="choice-checkbox"
                      type="checkbox"
                      ?checked=${this.selectedChoices.has(c.value) ||
            this.selectedChoices.has(allChoice.value)}
                      @change=${this.handleChoiceClick}
                    />
                    <label>${c.display}</label>
                  </div>
                `)}

            <!-- Optional other choice -->
            ${when(this.includeOther, () => html `
            <div id="other-data-ctr">
              <div class="choice-ctr">
                <input
                  id='other-checkbox'
                  type="checkbox"
                  @change=${this.handleOtherClick}
                />
                <label>${msg(html `<b>OTHER-DATA:</b> Specify another type of data`)}</label>
              </div>
              <div id="other-data-input-ctr">
                <span>${msg('Other data type:')}</span>
                <input id="other-data-input" type="text"></input>
              </div>
            </div>
          `)}
          `)}
      </div>

      <!-- Expand/collapse button -->
      <button
        @click=${() => {
            this.open = !this.open;
        }}
      >
        ${when(this.open, () => html `<img src=${closeContainerArrowSvg} alt="close arrow" />`, () => html `<img src=${expandListSvg} alt="expand list" />`)}
      </button>
    `;
    }
};
BldnAllChecklist.styles = [
    css `
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
__decorate([
    property({ type: Array })
], BldnAllChecklist.prototype, "choices", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], BldnAllChecklist.prototype, "open", void 0);
__decorate([
    property({ type: Boolean, attribute: 'include-other' })
], BldnAllChecklist.prototype, "includeOther", void 0);
__decorate([
    property({ type: Number, reflect: true, attribute: 'selection-state' })
], BldnAllChecklist.prototype, "selectionState", void 0);
__decorate([
    state()
], BldnAllChecklist.prototype, "selectedChoices", void 0);
__decorate([
    query('#all-checkbox')
], BldnAllChecklist.prototype, "allCheckbox", void 0);
__decorate([
    queryAll('.choice-checkbox')
], BldnAllChecklist.prototype, "choiceCheckboxes", void 0);
BldnAllChecklist = __decorate([
    customElement('bldn-all-checklist')
], BldnAllChecklist);

export { BldnAllChecklist };
//# sourceMappingURL=bldn-all-checklist.js.map

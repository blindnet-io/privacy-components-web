import { LitElement, PropertyValueMap, TemplateResult } from 'lit';
interface Choice {
    value: string;
    display: TemplateResult<1 | 2>;
    checked: boolean;
    allChoice?: boolean;
}
/**
 * States describing the choice list
 */
declare enum SelectionState {
    ALL = 0,
    SOME = 1,
    NONE = 2
}
/**
 * @event {CustomEvent} bldn-all-checklist:choice-select - Fired when a choice is selected
 * @event {CustomEvent} bldn-all-checklist:choice-deselect - Fired when a choice is deselected
 */
export declare class BldnAllChecklist extends LitElement {
    choices: Choice[];
    /** @prop */
    open: boolean;
    /** @prop */
    includeOther: boolean;
    selectionState: SelectionState;
    selectedChoices: Set<string>;
    allCheckbox: HTMLInputElement;
    choiceCheckboxes: HTMLInputElement[];
    /**
     * Select a choice and notify parent component
     * @param value value of the choice to select
     */
    selectChoice(value: string): void;
    /**
     * Deselect a choice and notify parent component
     * @param value value of the choice to delete
     */
    deselectChoice(value: string): void;
    handleChoiceClick(e: Event): void;
    handleOtherClick(e: Event): void;
    handleOtherInput(e: Event): void;
    /**
     * Update the selection state based on currently selected choices
     */
    updateSelectionState(): void;
    getCheckboxImg(): TemplateResult<1>;
    /**
     * Hook into willUpdate to ensure the selected choices set matches choices
     * @param _changedProperties Map of changed properties for this update
     */
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
export {};

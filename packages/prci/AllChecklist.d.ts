import { LitElement, PropertyValueMap, TemplateResult } from 'lit';
import { FormComponentState } from './utils/states.js';
interface Choice {
    id: string;
    description: string | TemplateResult<1 | 2>;
    checked: boolean | false;
    disabled: boolean;
}
/**
 * States describing the choice list
 */
declare enum SelectionState {
    ALL = 0,
    SOME = 1,
    NONE = 2
}
export declare class AllChecklist extends LitElement {
    static styles: import("lit").CSSResult[];
    choices: Choice[];
    selectionState: SelectionState;
    componentMode: FormComponentState;
    includeAll: boolean;
    allChecked: boolean;
    allMessage: string;
    eventPrefix: string;
    includeButtons: boolean;
    includeOther: boolean;
    selectedChoices: Set<string>;
    /**
     * Select a choice and notify parent component
     * @param id ID of the choice to select
     */
    selectChoice(id: string): void;
    /**
     * Deselect a choice and notify parent component
     * @param id ID of the choice to delete
     */
    deleteChoice(id: string): void;
    handleChoiceClick(e: Event): void;
    handleOtherClick(e: Event): void;
    handleOtherInput(e: Event): void;
    /**
     * Update the selection state based on currently selected choices
     */
    updateSelectionState(): void;
    /**
     * Determine which choices to display based on the checklist's mode
     * @returns
     */
    getDisplayChoices(): Array<Choice>;
    /**
     * Determine which to switch to when open or close button is clicked
     */
    handleButtonClick(): void;
    /**
     * Hook into willUpdate to ensure the selected choices set matches choices
     * @param _changedProperties Map of changed properties for this update
     */
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): TemplateResult<1>;
}
export {};
import { LitElement } from 'lit';
/**
 * Collapsable element displaying a prompt and list of choices, each with a checkbox.
 */
export declare class DemandBuilderDropdownElement extends LitElement {
    prompt: string;
    choices: {
        id: string;
        description: string;
        checked: boolean;
        disabled: boolean;
    }[];
    open: boolean;
    private _selectedChoices;
    static styles: import("lit").CSSResult;
    handleCheckboxClick(e: Event): void;
    render(): import("lit").TemplateResult<1>;
}

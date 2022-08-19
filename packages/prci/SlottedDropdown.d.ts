import { LitElement } from 'lit';
import { FormComponentState } from './utils/states.js';
/**
 * Collapsable element with slots for children
 */
export declare class SlottedDropdown extends LitElement {
    header: string;
    includeButtons: Boolean;
    dropdownState: FormComponentState;
    static styles: import("lit").CSSResult[];
    /**
     * Decide the next state when dropdown button is clicked
     */
    handleButtonClick(): void;
    render(): import("lit").TemplateResult<1>;
}

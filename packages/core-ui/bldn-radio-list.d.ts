import { LitElement, TemplateResult } from 'lit';
interface Choice {
    display: string | TemplateResult<1 | 2>;
    value: string;
    checked?: boolean;
}
/**
 * Radio list with optional prompt.
 *
 * @event {CustomEvent} bldn-radio-list:choice-change - Fired when the list choice changess
 */
export declare class BldnRadioList extends LitElement {
    /** @prop */
    choices: Choice[];
    handleChoiceChange(e: Event): void;
    render(): TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export {};

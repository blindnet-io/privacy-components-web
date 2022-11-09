import { LitElement, TemplateResult } from 'lit';
interface Choice {
    value: string;
    display: string | TemplateResult<1 | 2>;
    checked?: boolean;
}
/**
 * Simple checklist component
 *
 * @event {CustomEvent} bldn-checklist:choice-select
 * @event {CustomEvent} bldn-checklist:choice-deselect
 */
export declare class BldnChecklist extends LitElement {
    choices: Choice[];
    handleChoiceClick(e: Event): void;
    render(): TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export {};

import { LitElement, PropertyValueMap } from 'lit';
interface Choice {
    value: string;
    display: string;
    selected?: boolean;
}
export declare class HorizontalList extends LitElement {
    choices: Choice[];
    _selected: number;
    handleChoiceClick(e: Event): void;
    render(): import("lit-html").TemplateResult<1>;
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    static styles: import("lit").CSSResult[];
}
export {};

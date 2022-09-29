import { LitElement, PropertyValueMap } from 'lit';
interface ListChoice {
    id: string;
    display: string;
    selected?: boolean;
}
export declare class HorizontalList extends LitElement {
    choices: ListChoice[];
    _selected: number;
    render(): import("lit-html").TemplateResult<1>;
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    static styles: import("lit").CSSResult[];
}
export {};

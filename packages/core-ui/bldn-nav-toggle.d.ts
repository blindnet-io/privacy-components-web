import { LitElement, PropertyValueMap } from 'lit';
interface Option {
    label: string;
    value: string;
    checked?: boolean;
}
export declare class BldnNavToggle extends LitElement {
    left: Option;
    right: Option;
    _selected: 'left' | 'right';
    handleClick(side: 'left' | 'right'): void;
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export {};

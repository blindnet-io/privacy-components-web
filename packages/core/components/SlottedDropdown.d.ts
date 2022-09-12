import { LitElement } from 'lit';
/**
 * Collapsable element with slots for children
 */
export declare class SlottedDropdown extends LitElement {
    static styles: import("lit").CSSResult[];
    header: string;
    open: boolean;
    includeButtons: Boolean;
    render(): import("lit-html").TemplateResult<1>;
}

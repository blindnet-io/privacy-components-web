import { LitElement } from 'lit';
export declare class BldnDropdown extends LitElement {
    /** @prop */
    mode: 'major' | 'minor';
    /** @prop open - Indicates if the dropdown is open or closed */
    open: boolean;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}

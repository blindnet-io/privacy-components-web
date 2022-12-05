import { CSSResultGroup, LitElement } from 'lit';
export declare class BldnBadge extends LitElement {
    /**
     * @prop neutral - Badge should have a neutral (non-colored) display
     *
     * This prop takes priority over the others if multiple are set.
     */
    neutral: boolean;
    /** @prop info - Badge should indicate some info */
    info: boolean;
    /** @prop success - Badge should indicate success */
    success: boolean;
    /** @prop warning - Badge should indicate a warning */
    warning: boolean;
    /** @prop danger - Badge should indicate danger */
    danger: boolean;
    render(): import("lit-html").TemplateResult<1>;
    static styles: CSSResultGroup | undefined;
}

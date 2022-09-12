import { LitElement } from 'lit';
import { ACTION } from './models/priv-terms.js';
export declare class ActionItem extends LitElement {
    static styles: import("lit").CSSResult[];
    action: ACTION;
    disabled: boolean;
    handleClick(): void;
    render(): import("lit-html").TemplateResult<1>;
}

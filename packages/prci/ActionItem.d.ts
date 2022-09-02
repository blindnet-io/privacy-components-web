import { LitElement } from 'lit';
import { ACTION } from './models/priv-terms.js';
export declare class ActionItem extends LitElement {
    action: ACTION;
    disabled: boolean;
    static styles: import("lit").CSSResult[];
    handleClick(): void;
    render(): import("lit").TemplateResult<1>;
}

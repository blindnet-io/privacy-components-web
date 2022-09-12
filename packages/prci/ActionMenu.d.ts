import { LitElement } from 'lit';
import './ActionItem.js';
import { ACTION } from './models/priv-terms.js';
/**
 * Menu of clickable action types
 */
export declare class ActionMenu extends LitElement {
    static styles: import("lit").CSSResult[];
    prompt: string;
    includedActions: ACTION[];
    handleRequestsClick(): void;
    render(): import("lit-html").TemplateResult<1>;
}

import { LitElement } from 'lit';
import './ActionItem.js';
import { ACTION } from './models/priv-terms.js';
/**
 * Menu of clickable action types
 */
export declare class ActionMenu extends LitElement {
    prompt: string;
    includedActions: ACTION[];
    static styles: import("lit").CSSResult;
    render(): import("lit").TemplateResult<1>;
}

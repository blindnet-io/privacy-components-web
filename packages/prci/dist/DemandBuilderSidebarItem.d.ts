import { LitElement } from 'lit';
import { ACTION } from './models/priv-terms.js';
/**
 * A single item on the DemandBuilder sidebar.
 */
export declare class DemandBuilderSidebarItem extends LitElement {
    checked: boolean;
    disabled: boolean;
    id: ACTION;
    title: string;
    description: string;
    static styles: import("lit").CSSResult;
    handleClick(): void;
    render(): import("lit").TemplateResult<1>;
}

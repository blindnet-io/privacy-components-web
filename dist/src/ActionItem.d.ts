import { LitElement } from 'lit';
export declare class ActionItem extends LitElement {
    actionName: string;
    actionDescription: string;
    disabled: boolean;
    static styles: import("lit").CSSResult;
    handleClick(): void;
    render(): import("lit-html").TemplateResult<1>;
}

import { LitElement } from 'lit';
export declare class BldnButton extends LitElement {
    mode: 'primary' | 'secondary' | 'positive' | 'warning' | 'negative' | 'link' | 'icon' | 'link-icon';
    underlineMode: 'solid' | 'dotted' | 'none';
    handleClick(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}

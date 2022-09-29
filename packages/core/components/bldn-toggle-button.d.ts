import { LitElement } from 'lit';
export declare class ToggleButton extends LitElement {
    left: string;
    right: string;
    selected: 'left' | 'right';
    handleClick(side: 'left' | 'right'): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}

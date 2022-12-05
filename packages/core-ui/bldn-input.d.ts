import { LitElement } from 'lit';
export declare class BldnInput extends LitElement {
    mode: 'default' | 'confirmed' | 'error';
    type: 'hidden' | 'text' | 'search' | 'tel' | 'url' | 'email' | 'password' | 'datetime' | 'date' | 'month' | 'week' | 'time' | 'datetime-local' | 'number' | 'range' | 'color' | 'checkbox' | 'radio' | 'file' | 'submit' | 'image' | 'reset' | 'button';
    value: string;
    placeholder: string;
    handleChange(e: Event): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}

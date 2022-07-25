import { LitElement } from 'lit';
/**
 * Collapsable element displaying a prompt and text input field.
 */
export declare class DemandBuilderTextElement extends LitElement {
    prompt: string;
    open: boolean;
    static styles: import("lit").CSSResult;
    handleInput(e: Event): void;
    render(): import("lit-html").TemplateResult<1>;
}

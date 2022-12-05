import { LitElement } from 'lit';
import '@blindnet/core-ui';
/**
 * @event {Event} bldn-request-addon:back Fired when back button is clicked
 * @event {Event} bldn-request-addon:complete Fired when next button is clicked and onSubmit() returns true
 */
export declare class BldnRequestAddon extends LitElement {
    /**
     * @prop onSubmit
     *
     * Function that runs when the next button is clicked, returning true if
     * the form should proceed to the next step. If the form should not proceed,
     * the function should return false or an error message to display.
     *
     */
    onSubmit: () => boolean | string;
    /**
     * @prop back-text Text to display on the back button
     */
    backText: string;
    /**
     * @prop next-text Text to display on the next button
     */
    nextText: string;
    _error: boolean;
    _errorMessage: string;
    handleBackClick(e: Event): void;
    handNextClick(e: Event): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}

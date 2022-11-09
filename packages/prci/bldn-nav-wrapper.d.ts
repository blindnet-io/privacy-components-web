import { LitElement } from 'lit';
/**
 * @event {Event} bldn-nav-wrapper:left-click - Fires when the left nav button is clicked
 * @event {Event} bldn-nav-wrapper:center-click - Fires when the center nav button is clicked
 * @event {Event} bldn-nav-wrapper:right-click - Fires when the right nav button is clicked
 *
 * @slot - Content to be displayed within the wrapper
 * @cssprop {BorderColor} --bldn-nav-wrapper-border-color - Color of the border wrapping slotted content. Uses --bldn-color-medium by default.
 */
export declare class BldnNavWrapper extends LitElement {
    /** Whether to include one or two navigation buttons on the button border of the wrapper */
    mode: 'single' | 'double';
    /** Text for the left navigation button. Only relevant if mode is 'double'. */
    leftButton: undefined | string;
    /** Text for the right navigation button. Only relevant if mode is 'double'. */
    rightButton: undefined | string;
    /** Text for the center navigation button. Only relevant if mode is 'single'. */
    centerButton: undefined | string;
    handleNavClick(e: Event, side: 'left' | 'center' | 'right'): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}

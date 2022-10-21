import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";

/**
 * @event {Event} bldn-nav-wrapper:left-click - Fires when the left nav button is clicked
 * @event {Event} bldn-nav-wrapper:center-click - Fires when the center nav button is clicked
 * @event {Event} bldn-nav-wrapper:right-click - Fires when the right nav button is clicked
 * 
 * @slot - Content to be displayed within the wrapper
 * @cssprop {BorderColor} --bldn-nav-wrapper-border-color - Color of the border wrapping slotted content. Uses --bldn-color-medium by default.
 */
@customElement('bldn-nav-wrapper')
export class BldnNavWrapper extends LitElement {

  /** Whether to include one or two navigation buttons on the button border of the wrapper */
  @property({ type: String }) mode: 'single' | 'double' = 'double';

  /** Text for the left navigation button. Only relevant if mode is 'double'. */
  @property({ type: String, attribute: 'left-button' }) leftButton: undefined | string

  /** Text for the right navigation button. Only relevant if mode is 'double'. */
  @property({ type: String, attribute: 'right-button' }) rightButton: undefined | string

  /** Text for the center navigation button. Only relevant if mode is 'single'. */
  @property({ type: String, attribute: 'center-button' }) centerButton: undefined | string

  handleNavClick(e: Event, side: 'left' | 'center' | 'right') {
    e.stopPropagation()
    this.dispatchEvent(new Event(`bldn-nav-wrapper:${side}-click`))
  }

  render() {
    return html`
      <div id='content'>
        <slot></slot>
      </div>
      <div id='nav-buttons'>
        ${when(this.mode === 'single', () => html`
          <bldn-button @bldn-button:click=${(e: Event) => this.handleNavClick(e, 'center')}>${this.centerButton}</bldn-button>
        `, () => html`
          <bldn-button mode='secondary' @bldn-button:click=${(e: Event) => this.handleNavClick(e, 'left')}>${this.leftButton}</bldn-button>
          <bldn-button @bldn-button:click=${(e: Event) => this.handleNavClick(e, 'right')}>${this.rightButton}</bldn-button>
        `)}
      </div>
    `
  }

  static styles = css`
    :host {
      display: block;
      border: 2px solid var(--bldn-nav-wrapper-border-color, var(--color-medium));
      border-radius: 20px;
      margin-bottom: 20px;
    }

    #content {
      display: grid;
      row-gap: 40px;
    }

    #nav-buttons {
      /* Make nav buttons sit on border */
      display: flex;
      justify-content: center;
      /* FIXME: Forces the wrapper to be a certain size */
      column-gap: 12.5rem;
      margin: 0px 275px;
      transform: translateY(22px);
    }
  `

}
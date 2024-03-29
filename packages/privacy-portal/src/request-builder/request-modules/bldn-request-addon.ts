import { msg } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import '@blindnet/core-ui';

/**
 * @event {Event} bldn-request-addon:back Fired when back button is clicked
 * @event {Event} bldn-request-addon:complete Fired when next button is clicked and onSubmit() returns true
 */
@customElement('bldn-request-addon')
export class BldnRequestAddon extends LitElement {
  /**
   * @prop onSubmit
   *
   * Function that runs when the next button is clicked, returning true if
   * the form should proceed to the next step. If the form should not proceed,
   * the function should return false or an error message to display.
   *
   */
  @property({ attribute: false }) onSubmit: () => boolean | string = () => true;

  /**
   * @prop back-text Text to display on the back button
   */
  @property({ type: String, attribute: 'back-text' }) backText: string =
    msg('Back');

  /**
   * @prop next-text Text to display on the next button
   */
  @property({ type: String, attribute: 'next-text' }) nextText: string =
    msg('Next');

  @state() _error: boolean = false;

  @state() _errorMessage: string = msg('Invalid Input');

  handleBackClick(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(
      new Event('bldn-request-addon:back', {
        bubbles: true,
        composed: true,
      })
    );
  }

  handNextClick(e: Event) {
    e.stopPropagation();
    // Run submit function to set error state
    const submitResult = this.onSubmit();
    this._error = submitResult !== true;
    if (this._error && submitResult !== false) {
      this._errorMessage = submitResult as string;
    }

    // Fire event if there are no errors
    if (this._error === false) {
      this.dispatchEvent(
        new Event('bldn-request-addon:complete', {
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  render() {
    return html`
      <bldn-nav-wrapper
        left-button=${this.backText}
        right-button=${this.nextText}
        @bldn-nav-wrapper:left-click=${this.handleBackClick}
        @bldn-nav-wrapper:right-click=${this.handNextClick}
      >
        ${when(
          this._error,
          () => html` <bldn-badge danger>${this._errorMessage}</bldn-badge> `
        )}
        <slot></slot>
      </bldn-nav-wrapper>
    `;
  }

  static styles = css`
    :host {
      display: block;
      text-align: center;
    }

    bldn-badge {
      margin-top: 2em;
    }
  `;
}

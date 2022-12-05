import { __decorate } from '../../node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import '@blindnet/core-ui';

/**
 * @event {Event} bldn-request-addon:back Fired when back button is clicked
 * @event {Event} bldn-request-addon:complete Fired when next button is clicked and onSubmit() returns true
 */
let BldnRequestAddon = class BldnRequestAddon extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * @prop onSubmit
         *
         * Function that runs when the next button is clicked, returning true if
         * the form should proceed to the next step. If the form should not proceed,
         * the function should return false or an error message to display.
         *
         */
        this.onSubmit = () => true;
        /**
         * @prop back-text Text to display on the back button
         */
        this.backText = msg('Back');
        /**
         * @prop next-text Text to display on the next button
         */
        this.nextText = msg('Next');
        this._error = false;
        this._errorMessage = msg('Invalid Input');
    }
    handleBackClick(e) {
        e.stopPropagation();
        this.dispatchEvent(new Event('bldn-request-addon:back', {
            bubbles: true,
            composed: true,
        }));
    }
    handNextClick(e) {
        e.stopPropagation();
        // Run submit function to set error state
        const submitResult = this.onSubmit();
        this._error = submitResult !== true;
        if (this._error && submitResult !== false) {
            this._errorMessage = submitResult;
        }
        // Fire event if there are no errors
        if (this._error === false) {
            this.dispatchEvent(new Event('bldn-request-addon:complete', {
                bubbles: true,
                composed: true,
            }));
        }
    }
    render() {
        return html `
      <bldn-nav-wrapper
        left-button=${this.backText}
        right-button=${this.nextText}
        @bldn-nav-wrapper:left-click=${this.handleBackClick}
        @bldn-nav-wrapper:right-click=${this.handNextClick}
      >
        ${when(this._error, () => html ` <bldn-badge danger>${this._errorMessage}</bldn-badge> `)}
        <slot></slot>
      </bldn-nav-wrapper>
    `;
    }
};
BldnRequestAddon.styles = css `
    :host {
      display: block;
      text-align: center;
    }

    bldn-badge {
      margin-top: 2em;
    }
  `;
__decorate([
    property({ attribute: false })
], BldnRequestAddon.prototype, "onSubmit", void 0);
__decorate([
    property({ type: String, attribute: 'back-text' })
], BldnRequestAddon.prototype, "backText", void 0);
__decorate([
    property({ type: String, attribute: 'next-text' })
], BldnRequestAddon.prototype, "nextText", void 0);
__decorate([
    state()
], BldnRequestAddon.prototype, "_error", void 0);
__decorate([
    state()
], BldnRequestAddon.prototype, "_errorMessage", void 0);
BldnRequestAddon = __decorate([
    customElement('bldn-request-addon')
], BldnRequestAddon);

export { BldnRequestAddon };
//# sourceMappingURL=bldn-request-addon.js.map

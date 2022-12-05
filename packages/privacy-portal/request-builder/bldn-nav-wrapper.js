import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

/**
 * @event {Event} bldn-nav-wrapper:left-click - Fires when the left nav button is clicked
 * @event {Event} bldn-nav-wrapper:center-click - Fires when the center nav button is clicked
 * @event {Event} bldn-nav-wrapper:right-click - Fires when the right nav button is clicked
 *
 * @slot - Content to be displayed within the wrapper
 * @cssprop {BorderColor} --bldn-nav-wrapper-border-color - Color of the border wrapping slotted content. Uses --bldn-color-medium by default.
 */
let BldnNavWrapper = class BldnNavWrapper extends LitElement {
    constructor() {
        super(...arguments);
        /** Whether to include one or two navigation buttons on the button border of the wrapper */
        this.mode = 'double';
    }
    handleNavClick(e, side) {
        e.stopPropagation();
        this.dispatchEvent(new Event(`bldn-nav-wrapper:${side}-click`));
    }
    render() {
        return html `
      <div id="content">
        <slot></slot>
      </div>
      <div id="nav-buttons">
        ${when(this.mode === 'single', () => html `
            <bldn-button
              @bldn-button:click=${(e) => this.handleNavClick(e, 'center')}
              >${this.centerButton}</bldn-button
            >
          `, () => html `
            <bldn-button
              mode="secondary"
              @bldn-button:click=${(e) => this.handleNavClick(e, 'left')}
              >${this.leftButton}</bldn-button
            >
            <bldn-button
              @bldn-button:click=${(e) => this.handleNavClick(e, 'right')}
              >${this.rightButton}</bldn-button
            >
          `)}
      </div>
    `;
    }
};
BldnNavWrapper.styles = css `
    :host {
      display: block;
      /* width: 100%; */
      border: 2px solid
        var(--bldn-nav-wrapper-border-color, var(--color-medium));
      border-radius: 20px;
      margin-bottom: 20px;
    }

    #content {
      display: block;
      row-gap: 40px;
    }

    #nav-buttons {
      /* Make nav buttons sit on border */
      display: flex;
      justify-content: center;
      /* FIXME: Forces the wrapper to be a certain size */
      column-gap: 25%;
      /* margin: 0px 275px; */
      transform: translateY(22px);
    }
  `;
__decorate([
    property({ type: String })
], BldnNavWrapper.prototype, "mode", void 0);
__decorate([
    property({ type: String, attribute: 'left-button' })
], BldnNavWrapper.prototype, "leftButton", void 0);
__decorate([
    property({ type: String, attribute: 'right-button' })
], BldnNavWrapper.prototype, "rightButton", void 0);
__decorate([
    property({ type: String, attribute: 'center-button' })
], BldnNavWrapper.prototype, "centerButton", void 0);
BldnNavWrapper = __decorate([
    customElement('bldn-nav-wrapper')
], BldnNavWrapper);

export { BldnNavWrapper };
//# sourceMappingURL=bldn-nav-wrapper.js.map

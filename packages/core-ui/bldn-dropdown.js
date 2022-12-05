import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

const arrowSvg = new URL(new URL('assets/akar-icons_chevron-down.svg', import.meta.url).href, import.meta.url).href;
const smallArrowSvg = new URL(new URL('assets/akar-icons_chevron-down-small.svg', import.meta.url).href, import.meta.url).href;
let BldnDropdown = class BldnDropdown extends LitElement {
    constructor() {
        super(...arguments);
        /** @prop */
        this.mode = 'minor';
        /** @prop open - Indicates if the dropdown is open or closed */
        this.open = false;
    }
    render() {
        return html `
      <div id='heading'>
        <slot name='heading'>${msg('Click to expand')}</slot>
        <button @click=${() => {
            this.open = !this.open;
        }}><img id='dropdown-button-image' src=${this.mode === 'minor' ? smallArrowSvg : arrowSvg} alt=${msg('Arrow to expand or collapse the dropdown')}></img></button>
      </div>
      <div id='content'>
        <slot></slot>
      </div>
    `;
    }
};
BldnDropdown.styles = css `
    :host {
      display: block;
      padding: 0.625em 0em;
    }

    :host[open] {
      padding: 0.625em 0em 1.25em 0em;
    }

    #heading {
      display: flex;
      text-align: left;
      align-items: center;
    }

    :host([open][mode='major']) #heading {
      padding-bottom: 2.5em;
      border-bottom: 2px solid
        var(
          --bldn-dropdown-major-section-heading-border-color,
          var(--color-lightest)
        );
      margin: 0em -2em;
    }

    :host([open][mode='major']) slot[name='heading'] {
      display: inline-block;
      margin-left: 2em;
    }

    :host([open][mode='major']) button {
      padding-right: 2.5em;
    }

    :host([mode='minor']) button {
      padding-right: 0.42em;
    }

    :host([open]) #dropdown-button-image {
      /* Flip the dropdown arrow when open */
      -webkit-transform: scaleY(-1);
      transform: scaleY(-1);
    }

    #content {
      display: none;
    }

    :host([open]) #content {
      display: block;
    }

    button {
      border: none;
      background: none;
      margin-left: auto;
      padding: 0;
    }
  `;
__decorate([
    property({ type: String, reflect: true })
], BldnDropdown.prototype, "mode", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], BldnDropdown.prototype, "open", void 0);
BldnDropdown = __decorate([
    customElement('bldn-dropdown')
], BldnDropdown);

export { BldnDropdown };
//# sourceMappingURL=bldn-dropdown.js.map

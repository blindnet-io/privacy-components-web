import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { bldnStyles } from './blindnet-wc-styles.js';

let BldnButton = class BldnButton extends LitElement {
    constructor() {
        super(...arguments);
        this.mode = 'primary';
    }
    handleClick() {
        this.dispatchEvent(new Event('bldn-button:click'));
    }
    render() {
        return html `
      <button class=${this.mode} @click=${this.handleClick}>
        <slot></slot>
      </button>
    `;
    }
};
BldnButton.styles = [
    bldnStyles,
    css `
      button {
        border: none;
        border-radius: var(--bldn-button-border-radius, 5px);
        padding: 1vh 2vw;
        color: white;
        font-size: 16px;
        background: var(--bldn-button-color-primary, var(--color-primary));
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1),
          0px 2px 4px rgba(0, 0, 0, 0.2), 0px 4px 8px rgba(0, 0, 0, 0.2),
          0px 8px 16px rgba(0, 0, 0, 0.2);
      }

      button:not([disabled]):active {
        transform: translateY(2px);
        transition: 0.2s;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1),
          0px 2px 4px rgba(0, 0, 0, 0.2), 0px 4px 8px rgba(0, 0, 0, 0.2),
          0px 8px 16px rgba(0, 0, 0, 0.2);
      }

      button.link:active {
        transform: none;
        transition: none;
        box-shadow: none;
      }

      .secondary {
        background: white;
        color: rgb(
          var(
            --bldn-button-color-primary,
            var(--bldn-color-primary, 5, 80, 222)
          )
        );
        border: 1px solid
          rgb(
            var(
              --bldn-button-color-primary,
              var(--bldn-color-primary, 5, 80, 222)
            )
          );
      }

      .positive {
        background: var(--bldn-button-color-positive, var(--color-positive));
      }

      .warning {
        background: var(--bldn-button-color-warning, var(--color-warning));
      }

      .negative {
        background: var(--bldn-button-color-negative, var(--color-negative));
      }

      .link {
        border: none;
        background: none;
        box-shadow: none;
        text-decoration: underline;
        color: var(--color-dark);
        padding: inherit;
      }
    `,
];
__decorate([
    property({ type: String, reflect: true })
], BldnButton.prototype, "mode", void 0);
BldnButton = __decorate([
    customElement('bldn-button')
], BldnButton);

export { BldnButton };
//# sourceMappingURL=bldn-button.js.map

import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import './ActionItem.js';
import { ACTION } from './models/priv-terms.js';
import { enabledActions } from './utils/conf.js';
import { textStyles, containerStyles, buttonStyles } from './styles.js';
import { ComponentState } from './utils/states.js';

const arrowForwardSvg = new URL(new URL('assets/arrow-forward.svg', import.meta.url).href, import.meta.url).href;
/**
 * Menu of clickable action types
 */
let ActionMenu = class ActionMenu extends LitElement {
    constructor() {
        super(...arguments);
        // Text displayed above menu
        this.prompt = 'Type of demand I want to submit:';
        // Actions to be displayed in the menu, each corresponding to an ActionItem.
        this.includedActions = [];
    }
    handleRequestsClick() {
        this.dispatchEvent(new CustomEvent('component-state-change', {
            bubbles: true,
            composed: true,
            detail: {
                newState: ComponentState.REQUESTS,
            },
        }));
    }
    render() {
        return html `
      <div class="view-ctr medium-border">
        <div class="prompt-heading"><b>${this.prompt}</b></div>
        <div class="actions-container">
          ${this.includedActions
            .filter(a => a !== ACTION['OTHER.DEMAND'])
            .map(a => html `<action-item
                  .action=${a}
                  ?disabled=${!enabledActions.get(a)}
                ></action-item>`)}
        </div>
      </div>
      <div id="below-menu-btns-ctr">
        <button id="other-dmd-btn" class="link-btn medium-font underline">
          ${msg('Click here if you want to make some other demand (please note that it might take longer to be answered)')}
        </button>
        <button
          id="requests-btn"
          class="curve-btn medium-border animated-btn"
          @click=${this.handleRequestsClick}
        >
          <span>${msg('Access my submitted Privacy Requests')}</span>
          <img src=${arrowForwardSvg} alt="" />
        </button>
      </div>
    `;
    }
};
ActionMenu.styles = [
    textStyles,
    containerStyles,
    buttonStyles,
    css `
      .actions-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 50px;
        /* padding: 30px 40px 10px 40px; */
      }

      .prompt-heading {
        font-size: 16px;
        text-align: left;
        padding: 0px 0px 0px 0px;
        margin: 0px 0px 35px 0px;
      }

      #other-dmd-btn {
        margin: 20px 0px 0px 0px;
        justify-self: right;
      }

      #below-menu-btns-ctr {
        display: grid;
        row-gap: 50px;
        max-width: 1170px;
      }

      #requests-btn {
        display: flex;
        justify-content: center;
        justify-self: center;
        align-items: center;
        column-gap: 20px;
        background: none;
        padding: 20px;
        width: 35%;
        font-size: 18px;
        border-radius: 15px;
      }

      #requests-btn img {
        float: right;
      }
    `,
];
__decorate([
    property({ type: String })
], ActionMenu.prototype, "prompt", void 0);
__decorate([
    property({ attribute: false })
], ActionMenu.prototype, "includedActions", void 0);
ActionMenu = __decorate([
    localized(),
    customElement('action-menu')
], ActionMenu);

export { ActionMenu };
//# sourceMappingURL=ActionMenu.js.map

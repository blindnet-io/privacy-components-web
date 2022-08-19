import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { localized } from '@lit/localize';
import './ActionItem.js';
import { ACTION } from './models/priv-terms.js';
import { enabledActions } from './utils/conf.js';

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
    render() {
        return html `
      <div class="prompt-heading">${this.prompt}</div>
      <div class="actions-container">
        ${this.includedActions
            .filter(a => a !== ACTION['OTHER.DEMAND'])
            .map(a => html `<action-item
                .action=${a}
                ?disabled=${!enabledActions.get(a)}
              ></action-item>`)}
      </div>
    `;
    }
};
ActionMenu.styles = css `
    .actions-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 50px;
      padding: 30px 40px 10px 40px;
    }

    .prompt-heading {
      font-size: 18px;
      text-align: left;
      padding: 0px 0px 0px 10px;
    }
  `;
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

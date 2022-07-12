import { html, css, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

import './DemandActionMenu.js';
import './DemandBuilder.js';
import { action } from './priv.js';
import { getAllowedActions } from './utils.js';

enum route {
  ACTION_MENU = 'ACTION-MENU',
  DEMAND_BUILDER = 'DEMAND-BUILDER',
}

export class BldnPrivRequest extends LitElement {
  @property({ type: String, attribute: 'excluded-actions' }) excludedActions =
    '';

  @state() _includedActions = Object.values(action);

  @state() _route: route = route.ACTION_MENU;

  constructor() {
    super();
    this.addEventListener('demand-action-menu-click', () => {
      // FIXME: Once we support more than one action type, will need to get the action out of event here
      this._route = route.DEMAND_BUILDER;
    });
  }

  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--bldn-priv-request-text-color, #000);
    }
  `;

  render() {
    this._includedActions = getAllowedActions(this.excludedActions);

    switch (this._route) {
      case route.ACTION_MENU:
        return html`
          <demand-action-menu
            .includedActions=${this._includedActions}
          ></demand-action-menu>
        `;

      case route.DEMAND_BUILDER:
        return html`
          <demand-builder
            .includedActions=${this._includedActions}
          ></demand-builder>
        `;

      default:
        return html``;
    }
  }
}

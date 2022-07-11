import { html, css, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

import './DemandActionMenu.js';
import './DemandBuilder.js';

enum route {
  ACTION_MENU = 'ACTION-MENU',
  DEMAND_BUILDER = 'DEMAND-BUILDER',
}

export class BldnPrivRequest extends LitElement {
  @property({ type: String, attribute: 'exclude-actions' }) excludeActions = '';

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
    switch (this._route) {
      case route.ACTION_MENU:
        return html`
          <demand-action-menu
            exclude-actions=${this.excludeActions}
          ></demand-action-menu>
        `;

      case route.DEMAND_BUILDER:
        return html` <demand-builder></demand-builder> `;

      default:
        return html``;
    }
  }
}

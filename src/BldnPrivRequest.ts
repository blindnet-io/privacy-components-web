import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import './DemandActionMenu.js';
import './TestElement.js';

export class BldnPrivRequest extends LitElement {
  @property({ type: String, attribute: 'exclude-actions' }) excludeActions = '';

  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--bldn-priv-request-text-color, #000);
    }
  `;

  render() {
    return html`
      <demand-action-menu
        exclude-actions=${this.excludeActions}
      ></demand-action-menu>
    `;
  }
}

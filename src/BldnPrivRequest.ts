import { html, css, LitElement } from 'lit';

import './DemandActionMenu.js';
import './TestElement.js';

export class BldnPrivRequest extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--bldn-priv-request-text-color, #000);
    }
  `;

  render() {
    return html` <demand-action-menu></demand-action-menu> `;
  }
}

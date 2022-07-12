import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './DemandBuilderSidebarButton.js';

@customElement('demand-builder-sidebar')
export class DemandBuilderSidebar extends LitElement {
  @property({ type: Array }) includedActions: {
    NAME: string;
    DESCRIPTION: string;
  }[] = [];

  static styles = css`
    :host {
      display: grid;
      grid-template-columns: 1fr;
    }
  `;

  render() {
    console.log(this.includedActions);
    return html`
      ${this.includedActions.map(
        a =>
          html`<demand-builder-sidebar-button
            action-name=${a.NAME}
            action-description=${a.DESCRIPTION}
          ></demand-builder-sidebar-button>`
      )}
    `;
  }
}

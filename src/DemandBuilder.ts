import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { action } from './priv.js';

import './DemandBuilderSidebar.js';
import './DemandBuilderDropdownElement.js';
import './DemandBuilderTextElement.js';

@customElement('demand-builder')
export class DemandBuilder extends LitElement {
  @property({ type: Array }) includedActions: {
    NAME: string;
    DESCRIPTION: string;
  }[] = [];

  @state() selectedAction = action.TRANSPARENCY;

  static styles = css`
    :host {
      display: grid;
      grid-template-columns: 1fr 3fr;
    }

    .demand-elements {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 20px;
      align-content: flex-start;
      border: 2px solid #000;
      border-radius: 20px;
      padding: 0px 20px;
      margin: 0px 20px;
    }

    .demand-builder-back-btn {
      grid-column-start: 1/2;
    }

    .demand-builder-header {
      grid-column: 2/3;
      font-weight: bold;
      text-align: center;
    }

    .demand-contents-header {
      font-weight: bold;
      height: 30px;
    }
  `;

  render() {
    return html`
      <button class="demand-builder-back-btn">Back</button>
      <p class="demand-builder-header">My Privacy Request</p>
      <demand-builder-sidebar
        .includedActions=${this.includedActions}
      ></demand-builder-sidebar>
      <div class="demand-elements">
        <p class="demand-contents-header">
          Details of my ${this.selectedAction.NAME} demand:
        </p>
        <demand-builder-dropdown-element></demand-builder-dropdown-element>
        <demand-builder-text-element></demand-builder-text-element>
      </div>
    `;
  }
}

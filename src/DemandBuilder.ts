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
      grid-template-columns: 1fr 1fr;
    }
  `;

  render() {
    console.log(this.includedActions);
    return html`
      <demand-builder-sidebar
        .includedActions=${this.includedActions}
      ></demand-builder-sidebar>
      <div class="demand-elements">
        <demand-builder-dropdown-element></demand-builder-dropdown-element>
        <demand-builder-text-element></demand-builder-text-element>
        <demand-builder-dropdown-element></demand-builder-dropdown-element>
        <demand-builder-text-element></demand-builder-text-element>
      </div>
    `;
  }
}

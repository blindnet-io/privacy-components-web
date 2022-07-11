import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('demand-builder-sidebar')
export class DemandBuilderSidebar extends LitElement {
  @property({ type: String, attribute: 'exclude-actions' }) excludeActions = '';

  static styles = css`
    :host {
      background-color: red;
    }
  `;

  render() {
    return html`Sidebar`;
  }
}

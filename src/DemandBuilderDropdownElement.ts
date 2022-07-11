import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('demand-builder-dropdown-element')
export class DemandBuilderDropdownElement extends LitElement {
  static styles = css`
    :host {
      background-color: blue;
    }
  `;

  render() {
    return html`Dropdown element`;
  }
}

import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('demand-builder-text-element')
export class DemandBuilderTextElement extends LitElement {
  static styles = css`
    :host {
      background-color: green;
    }
  `;

  render() {
    return html`Text element`;
  }
}

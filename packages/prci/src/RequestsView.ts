import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('requests-view')
export class RequestsView extends LitElement {
  render() {
    return html` Hello from the RequestsView! `;
  }
}

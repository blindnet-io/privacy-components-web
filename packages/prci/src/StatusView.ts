import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('status-view')
export class StatusView extends LitElement {
  @property({ type: String, attribute: 'request-id' }) requestId: string = '';

  constructor() {
    super();
    console.log(`Get request here!`);
  }

  render() {
    console.log(`Getting request id ${this.requestId}!`);
    return html`Hello from status view!`;
  }
}

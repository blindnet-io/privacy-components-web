import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('bldn-data-consum-requests')
export class DataConsumerRequests extends LitElement {
  render() {
    return html`
      <bldn-horizontal-list
        choices=${JSON.stringify([
          { id: 'all', display: 'All' },
          { id: 'pending', display: 'Pending' },
          { id: 'answered', display: 'Answered' },
          { id: 'canceled', display: 'Canceled' },
        ])}
      ></bldn-horizontal-list>
    `;
  }
}

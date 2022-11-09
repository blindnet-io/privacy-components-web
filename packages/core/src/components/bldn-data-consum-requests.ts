import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PendingDemandPayload } from '../computation/generated-models/index.js';

@customElement('bldn-data-consum-requests')
export class DataConsumerRequests extends LitElement {
  @property({ type: Array }) demands: PendingDemandPayload[] = [];

  render() {
    return html`
      <bldn-horizontal-list
        choices=${JSON.stringify([
          { value: 'all', display: 'All' },
          { value: 'pending', display: 'Pending', selected: true },
          { value: 'answered', display: 'Answered' },
          { value: 'canceled', display: 'Canceled' },
        ])}
      ></bldn-horizontal-list>
      <bldn-data-consum-demand-list
        demands=${JSON.stringify(this.demands)}
      ></bldn-data-consum-demand-list>
    `;
  }

  static styles = css`
    bldn-horizontal-list {
      padding-bottom: 4vh;
    }
  `;
}

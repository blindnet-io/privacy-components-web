import { ACTION } from '@blindnet/prci/src/models/priv-terms.js';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { PendingRequestsResponse } from './models/pending-requests-response.js';

/**
 * A single item in the pending requests list
 */
@customElement('requests-list-item')
export class RequestsListItem extends LitElement {
  @state() _open: boolean = false;

  @property({ attribute: false }) demand: PendingRequestsResponse = {
    id: '',
    date: '',
    action: ACTION.ACCESS,
    data_subject: {
      id: '',
      schema: '',
    },
  };

  static styles = [
    css`
      :host {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        padding: 20px 0px;
        border: 2px solid #5b5b5b;
        border-radius: 10px;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
      }
    `,
  ];

  render() {
    return html`
      <!-- TODO: MAKE THIS FIT IN THE GRID -->
      <div class="">
        <div class="list-item-ctr">
          <span class="list-item"
            >${new Date(this.demand.date).toLocaleDateString('en-gb')}</span
          >
          <span class="list-item">${this.demand.data_subject.id}</span>
          <span class="list-item">${this.demand.action}</span>
        </div>
        <span class=""></span>
        ${when(this._open, () => html``)}
      </div>
    `;
  }
}

import { msg } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { PendingRequestsResponse } from './models/pending-requests-response.js';
import { DCIStyles } from './styles.js';
import { getPendingDemands } from './utils/data-consumer-api.js';

import './RequestsListItem.js';

@customElement('process-requests-view')
export class ProcessRequestsView extends LitElement {
  static styles = [
    DCIStyles,
    css`
      #process-req-ctr {
        display: grid;
        row-gap: 40px;
        text-align: center;
      }

      #requests-list {
        display: grid;
        row-gap: 10px;
      }

      .list-header-ctr {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        text-align: center;
      }

      .title {
        font-size: 22px;
      }
    `,
  ];

  constructor() {
    super();
    this.reloadRequests();
  }

  @state() _demands: PendingRequestsResponse[] = [];

  @state() _intervalId: any = undefined;

  reloadRequests() {
    getPendingDemands().then(response => {
      this._demands = response;
    });
  }

  render() {
    return html`
      <div id="process-req-ctr">
        <span class="title"><b>${msg('PRIVACY REQUESTS TO PROCESS')}</b></span>
        <div id="requests-list">
          <div class="list-header-ctr">
            <span class="list-header"><b>${msg('Submitted')}</b></span>
            <span class="list-header"><b>${msg('Data Subject')}</b></span>
            <span class="list-header"><b>${msg('Action(s)')}</b></span>
          </div>
          ${map(
            this._demands,
            d => html`<requests-list-item .demand=${d}></requests-list-item>`
          )}
        </div>
      </div>
    `;
  }
}

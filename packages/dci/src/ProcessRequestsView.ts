// import { msg } from "@lit/localize"
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { PendingRequestsResponse } from './models/pending-requests-response.js';
import { DCIStyles } from './styles.js';
import { getPendingDemands } from './utils/data-consumer-api.js';

import './RequestsListItem.js';

@customElement('process-requests-view')
export class ProcessRequestsView extends LitElement {
  static styles = [
    DCIStyles,
    css`
      #requests-list {
        display: grid;
        row-gap: 30px;
      }

      .list-header-ctr {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        text-align: center;
      }

      .list-item-ctr {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        padding: 20px 0px;
        border: 2px solid #5b5b5b;
        border-radius: 10px;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
      }

      .list-item {
        display: inline-flex;
        justify-items: center;
        text-align: center;
        justify-self: center;
        align-items: center;
      }

      .list-item:last-child {
        padding: 0px 20px 0px 0px;
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

      // If no more demands are processing we can stop reloading this request
      // if (this._processingDemands.length === 0 && this._intervalId) {
      //   clearInterval(this._intervalId);
      //   this._intervalId = undefined;
      // } else if (!this._intervalId && this._processingDemands.length !== 0) {
      //   // Setup an interval to get the status of processing demands every 3 seconds
      //   this._intervalId = setInterval(() => this.reloadRequest(), 3000);
      // }
    });
  }

  render() {
    return html`
      <div>
        <span><b>PRIVACY REQUESTS TO PROCESS</b></span>
        <div id="requests-list">
          <div class="list-header-ctr">
            <!-- <span class='list-header'><b>Submitted</b></span>
            <span class='list-header'><b>Data Subject</b></span>
            <span class='list-header'><b>Action(s)</b></span> -->
            <span></span>
          </div>
        </div>
      </div>
    `;
  }
}

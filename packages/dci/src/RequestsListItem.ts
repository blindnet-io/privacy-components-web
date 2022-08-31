/* eslint-disable lit-a11y/click-events-have-key-events */
// eslint-disable-next-line import/no-extraneous-dependencies
import { ACTION } from '@blindnet/prci/dist/models/priv-terms.js';
import { msg } from '@lit/localize';
import { css, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { PendingDemandResponse } from './models/pending-demand-response.js';
import { PendingRequestsResponse } from './models/pending-requests-response.js';
import { DCIStyles } from './styles.js';
import { approveDemand, getPendingDemand } from './utils/data-consumer-api.js';

/**
 * A single item in the pending requests list
 */
@customElement('requests-list-item')
export class RequestsListItem extends LitElement {
  static styles = [
    DCIStyles,
    css`
      :host {
        border: 2px solid #5b5b5b;
        border-radius: 10px;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
      }

      #summary-ctr {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding: 20px 0px;
      }

      .dmd-info-element {
        display: inline-flex;
        justify-items: center;
        text-align: center;
        justify-self: center;
        align-items: center;
      }

      li {
        text-align: left;
      }
    `,
  ];

  @property({ attribute: false }) demand: PendingRequestsResponse = {
    id: '',
    date: '',
    action: ACTION.ACCESS,
    data_subject: {
      id: '',
      schema: '',
    },
  };

  @state() _open: boolean = false;

  @state() _demandDetails: PendingDemandResponse | undefined;

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has('demand')) {
      getPendingDemand(this.demand.id).then(response => {
        this._demandDetails = response;
      });
    }
  }

  approveDemand() {
    approveDemand(this.demand.id, 'Approved').then(() => {});
  }

  render() {
    return html`
      <!-- TODO: MAKE THIS FIT IN THE GRID -->
      <div
        id="summary-ctr"
        @click=${() => {
          this._open = !this._open;
        }}
      >
        <span class="dmd-info-element"
          >${new Date(this.demand.date).toLocaleDateString('en-gb')}</span
        >
        <span class="dmd-info-element">${this.demand.data_subject.id}</span>
        <span class="dmd-info-element">${this.demand.action}</span>
      </div>
      ${when(
        this._open,
        () => html`
          ${when(
            this._demandDetails,
            () => html`
              <button @click=${this.approveDemand}>Approve</button>
              <button>Deny</button>
              <ul>
                <b>${msg('I want to delete:')}</b>
                ${map(
                  this._demandDetails?.recommendation.data_categories,
                  dc => html` <li>${dc}</li> `
                )}
              </ul>
            `,
            () => html` Getting demand details... `
          )}
        `
      )}
    `;
  }
}

/* eslint-disable lit-a11y/click-events-have-key-events */
// import { ACTION } from '@blindnet/prci/src/models/priv-terms';
import { ACTION } from '@blindnet/prci/dist/models/priv-terms.js';
import { msg } from '@lit/localize';
import { css, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { when } from 'lit/directives/when.js';
import { PendingDemandResponse } from './models/pending-demand-response.js';
import { PendingRequestsResponse } from './models/pending-requests-response.js';
import { DCIStyles } from './styles.js';
import { approveDemand, getPendingDemand } from './utils/data-consumer-api.js';

enum REQ_ITEM_UI_STATE {
  PENDING_DECISION,
  APPROVED,
  DENIED,
}

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

      #dmd-details-ctr {
        display: flex;
        justify-items: center;
        justify-content: center;
        padding: 20px;
        column-gap: 40px;
      }

      #approve-btn {
        border-color: #51d214;
      }

      #deny-btn {
        border-color: #f90707;
      }

      .dmd-btn {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 18px;
        padding: 20px;
        border: 4px solid;
        border-radius: 10px;
        border-width: 4px;
        background: none;
        width: 200px;
        text-align: center;
      }

      .decision-ctr {
        padding: 20px;
        font-size: 16px;
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

  @state() _uiState: REQ_ITEM_UI_STATE = REQ_ITEM_UI_STATE.PENDING_DECISION;

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
    approveDemand(this.demand.id, 'Approved').then(() => {
      this._uiState = REQ_ITEM_UI_STATE.APPROVED;
    });
  }

  denyDemand() {
    this._uiState = REQ_ITEM_UI_STATE.DENIED;
  }

  render() {
    return html`
      ${choose(this._uiState, [
        [
          REQ_ITEM_UI_STATE.PENDING_DECISION,
          () => html`
            <div
              id="summary-ctr"
              @click=${() => {
                this._open = !this._open;
              }}
            >
              <span class="dmd-info-element"
                >${new Date(this.demand.date).toLocaleDateString('en-gb')}</span
              >
              <span class="dmd-info-element">John Smith</span>
              <span class="dmd-info-element">${this.demand.action}</span>
            </div>
            ${when(
              this._open,
              () => html`
                <div id="dmd-details-ctr">
                  ${when(
                    this._demandDetails,
                    () => html`
                      <button
                        id="approve-btn"
                        class="dmd-btn animated-btn"
                        @click=${this.approveDemand}
                      >
                        Approve
                      </button>
                      <button
                        id="deny-btn"
                        class="dmd-btn animated-btn"
                        @click=${this.denyDemand}
                      >
                        Deny
                      </button>
                    `,
                    () => html` Getting demand details... `
                  )}
                </div>
              `
            )}
          `,
        ],
        [
          REQ_ITEM_UI_STATE.APPROVED,
          () => html`
            <div class="decision-ctr">${msg('Demand Approved ✅')}</div>
          `,
        ],
        [
          REQ_ITEM_UI_STATE.DENIED,
          () => html`
            <div class="decision-ctr">${msg('Demand Denied ❌')}</div>
          `,
        ],
      ])}
    `;
  }
}

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
import {
  approveDemand,
  denyDemand,
  getPendingDemand,
} from './utils/data-consumer-api.js';

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

      #dmd-response-ctr {
        display: grid;
        justify-content: center;
        padding: 20px;
        row-gap: 20px;
      }

      #response-msg-ctr {
        display: grid;
        row-gap: 10px;
      }

      #response-msg-ctr label {
        display: block;
        text-align: left;
      }

      #response-msg {
        display: block;
        background: #f8f8fc;
        border: 1px solid #d9d9d9;
        border-radius: 8px;
      }

      #response-btns-ctr {
        display: flex;
        justify-items: center;
        justify-content: center;
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
        width: 150px;
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

  @state() _message: string = '';

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has('demand')) {
      getPendingDemand(this.demand.id).then(response => {
        this._demandDetails = response;
      });
    }
  }

  handleApproveDemandClick() {
    approveDemand(this.demand.id, this._message).then(() => {
      this._uiState = REQ_ITEM_UI_STATE.APPROVED;
    });
  }

  handleDenyDemandClick() {
    denyDemand(this.demand.id, this._message).then(() => {
      this._uiState = REQ_ITEM_UI_STATE.DENIED;
    });
  }

  handleMessageInput(e: Event) {
    const { value } = e.target as HTMLTextAreaElement;
    this._message = value;
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
                <div id="dmd-response-ctr">
                  ${when(
                    this._demandDetails,
                    () => html`
                      <div id="response-msg-ctr">
                        <label for="response-msg"
                          >${msg('Optional Message')}</label
                        >
                        <textarea
                          id="response-msg"
                          rows="5"
                          cols="50"
                          @input=${this.handleMessageInput}
                        ></textarea>
                      </div>
                      <div id="response-btns-ctr">
                        <button
                          id="approve-btn"
                          class="dmd-btn animated-btn"
                          @click=${this.handleApproveDemandClick}
                        >
                          Approve
                        </button>
                        <button
                          id="deny-btn"
                          class="dmd-btn animated-btn"
                          @click=${this.handleDenyDemandClick}
                        >
                          Deny
                        </button>
                      </div>
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

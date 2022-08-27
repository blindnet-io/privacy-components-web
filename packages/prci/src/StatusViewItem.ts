import { msg } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { when } from 'lit/directives/when.js';
import { ACTION, DEMAND_STATUS } from './models/priv-terms.js';
import { PrivacyResponseItem } from './models/privacy-response.js';
import { buttonStyles, containerStyles } from './styles.js';
import { ACTION_TITLES } from './utils/dictionary.js';

@customElement('status-view-item')
export class StatusViewItem extends LitElement {
  @property({ attribute: false }) demand: PrivacyResponseItem = {
    demand_id: '',
    date: '',
    requested_action: ACTION.ACCESS,
    status: DEMAND_STATUS.GRANTED,
    includes: [],
    system: '',
  };

  @state() _open: boolean = false;

  static styles = [
    containerStyles,
    buttonStyles,
    css`
      .demand-status-ctr {
        display: flex;
        flex-direction: column;
        border-radius: 15px;
        border: 2px solid #e6e6e6;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
      }

      .demand-status-ctr span {
        padding: 10px 0px;
      }

      .dmd-action-ctr {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        justify-items: center;
        column-gap: 20px;
        padding: 20px 20px;
        background: white;
      }

      .granted-dmd {
        background-color: #51d214;
        border-color: #51d214;
      }

      .denied-dmd {
        background-color: #f90707;
        border-color: #f90707;
      }

      .partially-granted-dmd {
        background-color: #ff7a00;
        border-color: #ff7a00;
      }

      .granted-dmd span {
        color: white;
      }

      .denied-dmd span {
        color: white;
      }

      .partially-granted-dmd span {
        color: white;
      }

      .under-review-dmd {
        background-color: #e6e6e6;
        border-color: #e6e6e6;
      }

      .cancelled-dmd {
        background-color: #ffc1bd;
        border-color: #ffc1bd;
      }

      .action-title {
        justify-self: center;
      }

      .status-btn {
        background: none;
        padding: 10px 20px;
        justify-self: center;
        align-self: flex-end;
        float: right;
        box-shadow: -1px 1px 8px rgba(0, 0, 0, 0.4);
      }

      .status-btn:hover {
        /* transform: translateY(-5px); */
        box-shadow: -2px 2px 16px rgba(0, 0, 0, 0.5);
      }

      .status-btn:active {
        box-shadow: -4px 4px 24px rgba(0, 0, 0, 0.6);
      }

      .access-btn {
        border: 2px solid #18a0fb;
      }

      .cancel-btn {
        border: 2px solid #f90707;
      }

      .round-bottom {
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
      }

      .dmd-details-ctr {
        display: grid;
        background-color: white;
        /* height: 100px; */
        padding: 10px 20px 30px 20px;
      }

      p {
        margin: 0;
        padding: 0;
      }
    `,
  ];

  accessResponseTemplate() {
    return html`⬇ Your data download should begin automatically.`;
  }

  deleteResponseTemplate() {
    return html``;
  }

  transparencyResponseTemplate() {
    return html``;
  }

  render() {
    return html`
      <div
        class="demand-status-ctr ${this.demand.status.toLocaleLowerCase()}-dmd medium-border"
      >
        <span class="status-type-ctr">${this.demand.status}</span>
        <div class="dmd-action-ctr ${this._open ? '' : 'round-bottom'}">
          <p class="action-title">
            <b
              >${ACTION_TITLES[this.demand.requested_action]()}
              ${msg('Demand')}</b
            >
          </p>
          ${when(
            [
              DEMAND_STATUS.GRANTED,
              DEMAND_STATUS['PARTIALLY-GRANTED'],
              DEMAND_STATUS.DENIED,
            ].includes(this.demand.status),
            () => html`
              <button
                class="status-btn access-btn curve-btn"
                @click=${() => {
                  this._open = !this._open;
                }}
              >
                ${msg('ACCESS DETAILS')}
              </button>
            `
          )}
          ${when(
            this.demand.status === DEMAND_STATUS['UNDER-REVIEW'],
            () => html`
              <button
                class="status-btn cancel-btn curve-btn"
                @click=${() => {
                  this._open = !this._open;
                }}
              >
                ${msg('CANCEL DEMAND')}
              </button>
            `
          )}
        </div>
        ${when(
          this._open,
          () => html`
            <div
              id="${this.demand.demand_id}-details-ctr"
              class="dmd-details-ctr round-bottom"
            >
              ${choose(
                this.demand.requested_action,
                [
                  [ACTION.ACCESS, () => this.accessResponseTemplate()],
                  [ACTION.DELETE, () => this.deleteResponseTemplate()],
                  [
                    ACTION.TRANSPARENCY,
                    () => this.transparencyResponseTemplate(),
                  ],
                ],
                () => html`
                  Error: No response template defined for
                  ${this.demand.requested_action}!
                `
              )}
              ${this.demand.answer}
            </div>
          `
        )}
      </div>
    `;
  }
}

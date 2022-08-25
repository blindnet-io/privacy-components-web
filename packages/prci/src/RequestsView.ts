import { msg } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { RequestHistoryItem } from './models/history-response.js';
import { STATUS } from './models/priv-terms.js';
import { buttonStyles, containerStyles, textStyles } from './styles.js';
import { STATUS_DESCRIPTIONS } from './utils/dictionary.js';
import { getRequestHistory } from './utils/privacy-request-api.js';
import { ComponentState } from './utils/states.js';

@customElement('requests-view')
export class RequestsView extends LitElement {
  @state() _requests: RequestHistoryItem[] = [];

  constructor() {
    super();
    getRequestHistory().then(response => {
      console.log(response);
      this._requests = response.history;
    });
  }

  static styles = [
    containerStyles,
    buttonStyles,
    textStyles,
    css`
      :host {
        display: grid;
        row-gap: 50px;
        justify-items: center;
      }

      #table-ctr {
        width: 100%;
        overflow-y: auto;
        max-height: 500px;
      }

      #requests-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 30px;
        margin-top: -30px;
        font-size: 18px;
      }

      #creation-col {
        width: 35%;
      }

      #status-col {
        width: 20%;
      }

      #num-demands-col {
        width: 20%;
      }

      #status-link-col {
        width: 25%;
      }

      .req-info-ctr {
        border-collapse: collapse;
      }

      th {
        text-align: left;
      }

      td {
        padding: 20px 0px;
        text-align: left;
      }

      td {
        border: 1px solid #5b5b5b;
        border-style: solid none;
      }

      td:first-child {
        border-left-style: solid;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        padding-left: 20px;
      }

      td:last-child {
        border-right-style: solid;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
        padding-right: 20px;
      }

      #new-request-btn {
        font-size: 18px;
      }
    `,
  ];

  handleRequestClick(e: Event) {
    this.dispatchEvent(
      new CustomEvent('component-state-change', {
        bubbles: true,
        composed: true,
        detail: {
          newState: ComponentState.STATUS,
          requestId: (e.target as HTMLInputElement).id,
        },
      })
    );
  }

  handleNewRequestClick() {
    this.dispatchEvent(
      new CustomEvent('component-state-change', {
        bubbles: true,
        composed: true,
        detail: {
          newState: ComponentState.MENU,
        },
      })
    );
  }

  render() {
    return html`
      <div id="table-ctr">
        <table id="requests-table">
          <tr>
            <th id="creation-col">${msg('Created')}</th>
            <th id="status-col">${msg('Status')}</th>
            <th id="num-demands-col">${msg('Number of Demand(s)')}</th>
            <th id="status-link-col"></th>
          </tr>
          ${map(
            this._requests,
            r => html`
              <tr class="req-info-ctr">
                <td>${new Date(r.date).toLocaleDateString('en-gb')}</td>
                <td>${STATUS_DESCRIPTIONS[r.status as STATUS]()}</td>
                <td>${r.demands}</td>
                <td>
                  <button
                    id=${r.id}
                    class="link-btn dark-font underline"
                    @click=${this.handleRequestClick}
                  >
                    ${msg('See demand details')}
                  </button>
                </td>
              </tr>
            `
          )}
        </table>
      </div>
      <div id="new-request-ctr">
        <button
          id="new-request-btn"
          class="link-btn dark-font underline"
          @click=${this.handleNewRequestClick}
        >
          ${msg('Submit a new Privacy Request')}
        </button>
      </div>
    `;
  }
}

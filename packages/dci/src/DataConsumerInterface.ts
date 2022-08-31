// import { msg } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';

import './ProcessRequestsView.js';
import './RequestHistoryView.js';
import './SettingsView.js';
import { DCIStyles } from './styles.js';

enum DCI_UI_STATE {
  PROCESS_REQUESTS,
  REQUEST_HISTORY,
  SETTINGS,
}

@customElement('bldn-data-consum')
export class DataConsumerInterface extends LitElement {
  static styles = [
    DCIStyles,
    css`
      :host {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 16;
        max-width: 1350px;
      }

      #dci-ctr {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
      }

      #sidebar-ctr {
        grid-column: 1/2;
        height: 100px;
      }

      #user-ctr {
      }

      #view-btns-ctr {
      }

      #view-ctr {
        grid-column: 2/6;
        height: 100px;
      }
    `,
  ];

  @state() _uiState: DCI_UI_STATE = DCI_UI_STATE.PROCESS_REQUESTS;

  render() {
    return html`
      <div id="dci-ctr">
        <div id="sidebar-ctr">
          <div id="user-ctr"></div>
          <div id="view-btns-ctr">
            <button
              @click=${() => {
                this._uiState = DCI_UI_STATE.PROCESS_REQUESTS;
              }}
              id="to-process-view-btn"
            >
              Requests to process
            </button>
            <button
              @click=${() => {
                this._uiState = DCI_UI_STATE.REQUEST_HISTORY;
              }}
              id="req-history-view-btn"
            >
              Requests history
            </button>
            <button
              @click=${() => {
                this._uiState = DCI_UI_STATE.SETTINGS;
              }}
              id="settings-btn"
            >
              Settings
            </button>
          </div>
        </div>
        <div id="view-ctr">
          ${choose(this._uiState, [
            [
              DCI_UI_STATE.PROCESS_REQUESTS,
              () => html` <process-requests-view></process-requests-view> `,
            ],
            [
              DCI_UI_STATE.REQUEST_HISTORY,
              () => html` <request-history-view></request-history-view> `,
            ],
            [
              DCI_UI_STATE.SETTINGS,
              () => html` <settings-view></settings-view> `,
            ],
          ])}
        </div>
      </div>
    `;
  }
}

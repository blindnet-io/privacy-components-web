import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { css, LitElement, html } from 'lit';
import { state, customElement } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import './ProcessRequestsView.js';
import './RequestHistoryView.js';
import './SettingsView.js';
import { DCIStyles } from './styles.js';

var DCI_UI_STATE;
(function (DCI_UI_STATE) {
    DCI_UI_STATE[DCI_UI_STATE["PROCESS_REQUESTS"] = 0] = "PROCESS_REQUESTS";
    DCI_UI_STATE[DCI_UI_STATE["REQUEST_HISTORY"] = 1] = "REQUEST_HISTORY";
    DCI_UI_STATE[DCI_UI_STATE["SETTINGS"] = 2] = "SETTINGS";
})(DCI_UI_STATE || (DCI_UI_STATE = {}));
let DataConsumerInterface = class DataConsumerInterface extends LitElement {
    constructor() {
        super(...arguments);
        this._uiState = DCI_UI_STATE.PROCESS_REQUESTS;
    }
    render() {
        return html `
      <div id="dci-ctr">
        <div id="sidebar-ctr">
          <div id="user-ctr"></div>
          <div id="view-btns-ctr">
            <button
              id="to-process-view-btn"
              class="view-btn animated-btn ${this._uiState ===
            DCI_UI_STATE.PROCESS_REQUESTS
            ? 'current-view-btn'
            : ''}"
              @click=${() => {
            this._uiState = DCI_UI_STATE.PROCESS_REQUESTS;
        }}
            >
              Requests to process
            </button>
            <button
              id="req-history-view-btn"
              class="view-btn animated-btn ${this._uiState ===
            DCI_UI_STATE.REQUEST_HISTORY
            ? 'current-view-btn'
            : ''}"
              @click=${() => {
            this._uiState = DCI_UI_STATE.REQUEST_HISTORY;
        }}
            >
              Requests history
            </button>
            <button
              id="settings-btn"
              class="view-btn animated-btn ${this._uiState ===
            DCI_UI_STATE.SETTINGS
            ? 'current-view-btn'
            : ''}"
              @click=${() => {
            this._uiState = DCI_UI_STATE.SETTINGS;
        }}
            >
              Settings
            </button>
          </div>
        </div>
        <div id="view-ctr">
          ${choose(this._uiState, [
            [
                DCI_UI_STATE.PROCESS_REQUESTS,
                () => html ` <process-requests-view></process-requests-view> `,
            ],
            [
                DCI_UI_STATE.REQUEST_HISTORY,
                () => html ` <request-history-view></request-history-view> `,
            ],
            [
                DCI_UI_STATE.SETTINGS,
                () => html ` <settings-view></settings-view> `,
            ],
        ])}
        </div>
      </div>
    `;
    }
};
DataConsumerInterface.styles = [
    DCIStyles,
    css `
      :host {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 16;
        max-width: 1350px;
      }

      :host button {
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
      }

      #view-btns-ctr {
        display: grid;
        padding: 20px;
        row-gap: 20px;
      }

      .view-btn {
        border: none;
        background: none;
        padding: 40px;
        border-radius: 10px;
        background-color: #d9d9d9;
        color: black;
        font-size: 18px;
      }

      .current-view-btn {
        background-color: #5b5b5b;
        color: white;
      }

      #view-ctr {
        grid-column: 2/6;
        justify-content: center;
      }
    `,
];
__decorate([
    state()
], DataConsumerInterface.prototype, "_uiState", void 0);
DataConsumerInterface = __decorate([
    customElement('bldn-data-consum')
], DataConsumerInterface);

export { DataConsumerInterface };
//# sourceMappingURL=DataConsumerInterface.js.map

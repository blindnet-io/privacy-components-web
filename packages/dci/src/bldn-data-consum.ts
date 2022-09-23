import { localized } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';

import '@blindnet/core';

enum DCI_UI_STATE {
  REQUESTS,
  ALERTS,
}

@customElement('bldn-data-consum')
@localized()
export class DataConsumerInterface extends LitElement {
  @state() uiState: DCI_UI_STATE = DCI_UI_STATE.REQUESTS;

  render() {
    return html`
      <div class="test">
        <bldn-toggle-button
          left-text="Requests"
          right-text="Alerts"
          left-id="requests"
          right-id="alerts"
        ></bldn-toggle-button>
      </div>
      ${choose(this.uiState, [
        [
          DCI_UI_STATE.REQUESTS,
          () => html`<bldn-data-consum-requests></bldn-data-consum-requests>`,
        ],
        [
          DCI_UI_STATE.ALERTS,
          () => html`<bldn-data-consum-alerts></bldn-data-consum-alerts>`,
        ],
      ])}
    `;
  }

  static styles = css`
    :host {
      width: 100%;
    }
  `;
}

// // import { msg } from '@lit/localize';
// import { css, html, LitElement } from 'lit';
// import { customElement, state } from 'lit/decorators.js';
// import { choose } from 'lit/directives/choose.js';

// import './ProcessRequestsView.js';
// import './RequestHistoryView.js';
// import './SettingsView.js';
// import { DCIStyles } from './styles.js';

// enum DCI_UI_STATE {
//   PROCESS_REQUESTS,
//   REQUEST_HISTORY,
//   SETTINGS,
// }

// @customElement('bldn-data-consum')
// export class DataConsumerInterface extends LitElement {
//   static styles = [
//     DCIStyles,
//     css`
//       :host {
//         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
//           Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
//         font-size: 16;
//         max-width: 1350px;
//       }

//       :host button {
//         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
//           Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
//         font-size: 16;
//         max-width: 1350px;
//       }

//       #dci-ctr {
//         display: grid;
//         grid-template-columns: repeat(5, 1fr);
//       }

//       #sidebar-ctr {
//         grid-column: 1/2;
//       }

//       #view-btns-ctr {
//         display: grid;
//         padding: 20px;
//         row-gap: 20px;
//       }

//       .view-btn {
//         border: none;
//         background: none;
//         padding: 40px;
//         border-radius: 10px;
//         background-color: #d9d9d9;
//         color: black;
//         font-size: 18px;
//       }

//       .current-view-btn {
//         background-color: #5b5b5b;
//         color: white;
//       }

//       #view-ctr {
//         grid-column: 2/6;
//         justify-content: center;
//       }
//     `,
//   ];

//   @state() _uiState: DCI_UI_STATE = DCI_UI_STATE.PROCESS_REQUESTS;

//   render() {
//     return html`
//       <div id="dci-ctr">
//         <div id="sidebar-ctr">
//           <div id="user-ctr"></div>
//           <div id="view-btns-ctr">
//             <button
//               id="to-process-view-btn"
//               class="view-btn animated-btn ${this._uiState ===
//               DCI_UI_STATE.PROCESS_REQUESTS
//                 ? 'current-view-btn'
//                 : ''}"
//               @click=${() => {
//                 this._uiState = DCI_UI_STATE.PROCESS_REQUESTS;
//               }}
//             >
//               Requests to process
//             </button>
//             <button
//               id="req-history-view-btn"
//               class="view-btn animated-btn ${this._uiState ===
//               DCI_UI_STATE.REQUEST_HISTORY
//                 ? 'current-view-btn'
//                 : ''}"
//               @click=${() => {
//                 this._uiState = DCI_UI_STATE.REQUEST_HISTORY;
//               }}
//             >
//               Requests history
//             </button>
//             <button
//               id="settings-btn"
//               class="view-btn animated-btn ${this._uiState ===
//               DCI_UI_STATE.SETTINGS
//                 ? 'current-view-btn'
//                 : ''}"
//               @click=${() => {
//                 this._uiState = DCI_UI_STATE.SETTINGS;
//               }}
//             >
//               Settings
//             </button>
//           </div>
//         </div>
//         <div id="view-ctr">
//           ${choose(this._uiState, [
//             [
//               DCI_UI_STATE.PROCESS_REQUESTS,
//               () => html` <process-requests-view></process-requests-view> `,
//             ],
//             [
//               DCI_UI_STATE.REQUEST_HISTORY,
//               () => html` <request-history-view></request-history-view> `,
//             ],
//             [
//               DCI_UI_STATE.SETTINGS,
//               () => html` <settings-view></settings-view> `,
//             ],
//           ])}
//         </div>
//       </div>
//     `;
//   }
// }

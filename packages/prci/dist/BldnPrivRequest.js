import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { css, LitElement, html } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { map } from 'lit/directives/map.js';
import { choose } from 'lit/directives/choose.js';
import { localized, msg } from '@lit/localize';
import './DemandBuilder.js';
import './RequestProgressIndicator.js';
import './FrequentRequestsMenu.js';
import './ResponseView.js';
import { ACTION } from './models/priv-terms.js';
import { sendPrivacyRequest } from './utils/privacy-request-api.js';
import { RequestState, DemandState } from './utils/states.js';
import { getDefaultActions } from './utils/utils.js';

/**
 * Top level component encapsulating a single PrivacyRequest. Contains one or
 * more DemandBuilder elements, each for a single demand action type.
 */
let BldnPrivRequest = class BldnPrivRequest extends LitElement {
    constructor() {
        super();
        // JSON string of actions to display
        this.actions = '';
        // Array of actions, given by actions attribute if a valid list was passed, otherwise includes the 9 defaults
        this._includedActions = getDefaultActions();
        // State of the whole privacy request
        this._requestState = RequestState.BUILD;
        // Privacy request object, empty until some demands are added
        this._privacyRequest = {
            demands: [],
            data_subject: [
                {
                    // FIXME: For now we hardcode this, but will come from token once auth added
                    id: '4f04dbb4-d77d-49df-ae57-52aae9d6f3b5',
                    schema: 'dsid',
                },
            ],
        };
        // Map of ids to their specific demands
        this._demands = new Map();
        // Map of ids to demand builder UI components
        this._demandBuilders = new Map([
            [crypto.randomUUID(), false],
        ]);
        // Boolean indicating if review/complete buttons should be displayed
        this._showButtons = false;
        // Bolean indicating if review/complete buttons should be clickable
        this._buttonsClickable = false;
        // Response to our request
        this._privacyResponse = {
            response_id: '',
            request_id: '',
            date: '',
            demands: [],
        };
        // Demand update listeners
        this.addEventListener('demand-set', e => {
            const { demandId, demand } = e.detail;
            this._demands.set(demandId, demand);
        });
        this.addEventListener('demand-delete', e => {
            const { id } = e.detail;
            this._demands.delete(id);
        });
        this.addEventListener('demand-set-multiple', e => {
            e.detail.demands.forEach((demand, id) => this._demands.set(id, demand));
        });
        // Event indicating a demand builder has a valid action form
        this.addEventListener('demand-validated', e => {
            const { demandBuilderId } = e.detail;
            this._demandBuilders.set(demandBuilderId, true);
            // Check if review/submit buttons should be enabled
            this._buttonsClickable = Array.from(this._demandBuilders.values()).every(b => b === true);
        });
        // Event indicating a demand builder has an invalid action form
        this.addEventListener('demand-invalidated', e => {
            const { demandBuilderId } = e.detail;
            this._demandBuilders.set(demandBuilderId, false);
            // Check if review/submit buttons should be disabled
            this._buttonsClickable = Array.from(this._demandBuilders.values()).every(b => b === true);
        });
        // Unhide review and submit buttons when demand builder has passed the action menu
        this.addEventListener('menu-done', () => {
            this._showButtons = true;
        });
    }
    handleSubmitClick() {
        // Form privacy request
        this._privacyRequest.demands = Array.from(this._demands.values()).map((d, i) => {
            d.id = i.toString();
            return d;
        });
        sendPrivacyRequest(this._privacyRequest, false).then(response => {
            this._privacyResponse = response;
        });
        this._requestState = RequestState.SENT;
    }
    /**
     * Switch request to the review state, causing all demand builders to switch
     */
    handleReviewClick() {
        this._requestState = RequestState.REVIEW;
    }
    /**
     * Reset most states
     */
    handleRestartClick() {
        this._requestState = RequestState.BUILD;
        this._privacyRequest = {
            demands: [{ action: ACTION.TRANSPARENCY }],
            data_subject: [
                {
                    id: '4f04dbb4-d77d-49df-ae57-52aae9d6f3b5',
                    schema: 'dsid',
                },
            ],
        };
        this._demands = new Map();
        this._demandBuilders = new Map([
            [crypto.randomUUID(), false],
        ]);
        this._showButtons = false;
        this._buttonsClickable = false;
        this._privacyResponse = {
            response_id: '',
            request_id: '',
            date: '',
            demands: [],
        };
    }
    // Hook into willUpdate lifecycle method to set the included actions state if a valid list of actions is passed as an attribute
    willUpdate(_changedProperties) {
        if (_changedProperties.has('actions') && this.actions) {
            try {
                const actionsList = Array.from(JSON.parse(this.actions)).map(a => a.toLocaleLowerCase());
                const validActionsList = getDefaultActions().filter(a => actionsList.includes(a.toLocaleLowerCase()));
                // If a valid list of actions has been passed, use it
                if (validActionsList.length > 0) {
                    this._includedActions = validActionsList;
                }
            }
            catch (_a) {
                this._includedActions = getDefaultActions();
            }
        }
    }
    render() {
        return html `
      <div id="priv-req-ctr">
        <div class="req-hdr">${msg('My Privacy Request')}</div>
        <request-progress-indicator></request-progress-indicator>

        <!-- BUILD AND REVIEW STATE -->
        ${when(this._requestState === RequestState.BUILD ||
            this._requestState === RequestState.REVIEW, () => html `
            ${map(this._demandBuilders.entries(), ([id]) => html `
                <demand-builder
                  id=${id}
                  .includedActions=${this._includedActions}
                  demand-state=${this._requestState === RequestState.REVIEW
            ? DemandState.REVIEW
            : DemandState.SELECT_ACTION}
                ></demand-builder>
              `)}
            ${when(this._showButtons, () => html `
                ${choose(this._requestState, [
            [
                RequestState.BUILD,
                () => html `
                      <!-- TODO: Uncomment this once multiple demands are supported -->
                      <!-- <div id="new-dmd-ctr">
                  <p><strong>I want to add another demand</strong></p>
                  <button id="new-dmd-btn">+</button>
                </div> -->
                      <button
                        class="nav-btn right-btn"
                        ?disabled=${!this._buttonsClickable}
                        @click=${this.handleReviewClick}
                      >
                        ${msg('Continue to submit Privacy Request')}
                      </button>
                    `,
            ],
            [
                RequestState.REVIEW,
                () => html `
                      <button
                        class="nav-btn ctr-btn"
                        ?disabled=${!this._buttonsClickable}
                        @click=${this.handleSubmitClick}
                      >
                        ${msg('Submit Privacy Request')}
                      </button>
                    `,
            ],
        ])}
              `)}
          `)}

        <!-- Sent state -->
        ${when(this._requestState === RequestState.SENT, () => html `
            <strong id="req-sent-hdr" class="ctr-txt"
              >${msg('Your privacy request has been sent!')}</strong
            >
            <p class="ctr-txt">${msg('You may view the response below.')}</p>
            <button
              id="restart-btn"
              class="ctr-txt ctr-btn"
              href=""
              @click=${this.handleRestartClick}
            >
              ${msg('Submit a new Privacy Request.')}
            </button>
          `)}
      </div>
      ${when(this._requestState === RequestState.SENT, () => html `
          <response-view .response=${this._privacyResponse}></response-view>
        `)}
    `;
    }
};
BldnPrivRequest.styles = css `
    :host {
      display: grid;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 16;
      max-width: 1350px;
      background-color: white;
    }

    :host button {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    #priv-req-ctr {
      display: grid;
      border: 2px solid #000;
      border-radius: 20px;
      padding: 30px;
      margin: 0px 0px 30px 0px;
    }

    #new-dmd-ctr {
      display: flex;
      column-gap: 10px;
      margin: 20px 0px 0px 0px;
      padding: 20px;
      border: 2px solid #000;
      border-radius: 20px;
      align-items: center;
      justify-content: center;
    }

    #request-progress-indicator {
      background-color: red;
    }

    #frequent-requests {
      background-color: green;
    }

    #restart-btn {
      background: #fafafa;
      border: none;
      width: fit-content;
      height: fit-content;
      text-decoration: underline;
      margin: 20px 0px;
    }

    #req-sent-hdr {
      padding: 40px 0px;
    }

    .req-hdr {
      font-weight: bold;
      font-size: 24px;
      text-align: center;
      padding-bottom: 20px;
    }

    .new-dmd-btn {
      width: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .nav-btn {
      height: 50px;
      background-color: #18a0fb;
      border-width: 0px;
      border-radius: 6px;
      font-size: 18px;
      color: #ffffff;
      width: fit-content;
      margin: 20px 0px -55px 0px;
      padding: 0px 25px;
    }

    button:disabled {
      /* background-color: #d9d9d9; */
      background-color: #a9d1ff;
    }

    .ctr-btn {
      justify-self: center;
    }

    .right-btn {
      justify-self: flex-end;
      margin: 20px 60px -55px 0px;
    }

    .demand-builder-next-btn {
      grid-column: 2/3;
      padding-bottom: -50px;
      margin-bottom: -50px;
    }

    .ctr-txt {
      text-align: center;
    }
  `;
__decorate([
    property({ type: String, attribute: 'actions' })
], BldnPrivRequest.prototype, "actions", void 0);
__decorate([
    state()
], BldnPrivRequest.prototype, "_includedActions", void 0);
__decorate([
    state()
], BldnPrivRequest.prototype, "_requestState", void 0);
__decorate([
    state()
], BldnPrivRequest.prototype, "_privacyRequest", void 0);
__decorate([
    state()
], BldnPrivRequest.prototype, "_demands", void 0);
__decorate([
    state()
], BldnPrivRequest.prototype, "_demandBuilders", void 0);
__decorate([
    state()
], BldnPrivRequest.prototype, "_showButtons", void 0);
__decorate([
    state()
], BldnPrivRequest.prototype, "_buttonsClickable", void 0);
__decorate([
    state()
], BldnPrivRequest.prototype, "_privacyResponse", void 0);
BldnPrivRequest = __decorate([
    customElement('bldn-priv-request'),
    localized()
], BldnPrivRequest);

export { BldnPrivRequest };
//# sourceMappingURL=BldnPrivRequest.js.map

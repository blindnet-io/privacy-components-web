import { html, css, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { map } from 'lit/directives/map.js';
import { choose } from 'lit/directives/choose.js';
import { v4 as uuidv4 } from 'uuid';

import './DemandBuilder.js';
import './RequestProgressIndicator.js';
import './FrequentRequestsMenu.js';
import './ResponseView.js';
import { ACTION } from './models/priv-terms.js';
import { PrivacyRequest } from './models/privacy-request.js';
import { sendPrivacyRequest } from './utils/PrivacyRequestApi.js';
import { PrivacyResponse } from './models/privacy-response.js';
import { RequestState, DemandState } from './utils/states.js';
import { Demand } from './models/demand.js';

/**
 * Top level component encapsulating a single PrivacyRequest. Contains one or
 * more DemandBuilder elements, each for a single demand action type.
 */
export class BldnPrivRequest extends LitElement {
  @property({ type: Array, attribute: 'included-actions' }) includedActions =
    Object.values(ACTION).filter(a => !a.includes('TRANSPARENCY.'));

  @state() _requestState: RequestState = RequestState.BUILD;

  @state() _privacyRequest: PrivacyRequest = {
    demands: [{ action: ACTION.TRANSPARENCY }],
  };

  @state() _demands: Map<string, Demand> = new Map<string, Demand>();

  @state() _demandBuilders: Map<string, boolean> = new Map<string, boolean>([
    [uuidv4(), false],
  ]);

  @state() _showButtons: boolean = false;

  @state() _buttonsClickable: boolean = false;

  @state() _privacyResponse: PrivacyResponse = {
    responseId: '',
    inResponseTo: '',
    date: '',
    system: '',
    status: '',
  };

  constructor() {
    super();

    // Demand update listeners
    this.addEventListener('demand-set', e => {
      const { demandId, demand } = (e as CustomEvent).detail;
      this._demands.set(demandId, demand);
    });
    this.addEventListener('demand-delete', e => {
      const { id } = (e as CustomEvent).detail;
      this._demands.delete(id);
    });
    this.addEventListener('demand-set-multiple', e => {
      ((e as CustomEvent).detail.demands as Map<string, Demand>).forEach(
        (demand, id) => this._demands.set(id, demand)
      );
    });

    // UI element listeners
    this.addEventListener('demand-validated', e => {
      const { demandBuilderId } = (e as CustomEvent).detail;
      this._demandBuilders.set(demandBuilderId, true);
      this._buttonsClickable = Array.from(this._demandBuilders.values()).every(
        b => b === true
      );
    });
    this.addEventListener('demand-invalidated', e => {
      const { demandBuilderId } = (e as CustomEvent).detail;
      this._demandBuilders.set(demandBuilderId, false);
      this._buttonsClickable = Array.from(this._demandBuilders.values()).every(
        b => b === true
      );
    });
    this.addEventListener('menu-done', () => {
      this._showButtons = true;
    });
  }

  static styles = css`
    :host {
      display: grid;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 16;
      max-width: 1350px;
      /* max-height: 750px; */
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
      /* opacity: 0.8; */
      background-color: #d9d9d9;
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

  handleSubmitClick() {
    // Form privacy request
    this._privacyRequest.demands = Array.from(this._demands.values());
    sendPrivacyRequest(this._privacyRequest).then(response => {
      this._privacyResponse = response;
    });
    this._requestState = RequestState.SENT;
  }

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
    };
    this._demands = new Map<string, Demand>();
    this._demandBuilders = new Map<string, boolean>([[uuidv4(), false]]);
    this._showButtons = false;
    this._buttonsClickable = false;
    this._privacyResponse = {
      responseId: '',
      inResponseTo: '',
      date: '',
      system: '',
      status: '',
    };
  }

  render() {
    return html`
      <div id="priv-req-ctr">
        <div class="req-hdr">My Privacy Request</div>
        <request-progress-indicator></request-progress-indicator>

        <!-- BUILD AND REVIEW STATE -->
        ${when(
          this._requestState === RequestState.BUILD ||
            this._requestState === RequestState.REVIEW,
          () => html`
            ${map(
              this._demandBuilders.entries(),
              ([id]) => html`
                <demand-builder
                  id=${id}
                  .includedActions=${this.includedActions}
                  demand-state=${this._requestState === RequestState.REVIEW
                    ? DemandState.REVIEW
                    : DemandState.SELECT_ACTION}
                ></demand-builder>
              `
            )}
            ${when(
              this._showButtons,
              () => html`
                ${choose(this._requestState, [
                  [
                    RequestState.BUILD,
                    () => html`
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
                        Continue to submit Privacy Request >
                      </button>
                    `,
                  ],
                  [
                    RequestState.REVIEW,
                    () => html`
                      <button
                        class="nav-btn ctr-btn"
                        ?disabled=${!this._buttonsClickable}
                        @click=${this.handleSubmitClick}
                      >
                        Submit Privacy Request
                      </button>
                    `,
                  ],
                ])}
              `
            )}
          `
        )}

        <!-- Sent state -->
        ${when(
          this._requestState === RequestState.SENT,
          () => html`
            <strong id="req-sent-hdr" class="ctr-txt"
              >Your privacy request has been sent!</strong
            >
            <p class="ctr-txt">You may view the response below.</p>
            <button
              id="restart-btn"
              class="ctr-txt ctr-btn"
              href=""
              @click=${this.handleRestartClick}
            >
              Submit a new Privacy Request.
            </button>
          `
        )}
      </div>
      ${when(
        this._requestState === RequestState.SENT,
        () => html`
          <response-view .response=${this._privacyResponse}></response-view>
        `
      )}
    `;
  }
}

import { html, css, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { map } from 'lit/directives/map.js';
import { choose } from 'lit/directives/choose.js';

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

  @state() _privacyResponse: PrivacyResponse = {
    responseId: '',
    inResponseTo: '',
    date: '',
    system: '',
    status: '',
  };

  @state() _showButtons: boolean = false;

  constructor() {
    super();

    // Demand update listeners
    this.addEventListener('demand-set', e => {
      const { id, demand } = (e as CustomEvent).detail;
      this._demands.set(id, demand);
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
    this.addEventListener('demand-validated', () => {});
    this.addEventListener('demand-invalidated', () => {});
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

    #priv-req-ctr {
      display: grid;
      border: 2px solid #000;
      border-radius: 20px;
      padding: 30px;
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
      height: 20px;
      width: fit-content;
      margin: 10px 0px -30px 0px;
      padding: 0px 0px 0px 0px;
      justify-self: center;
    }

    .demand-builder-next-btn {
      grid-column: 2/3;
      padding-bottom: -50px;
      margin-bottom: -50px;
    }
  `;

  handleSubmitClick() {
    sendPrivacyRequest(this._privacyRequest).then(response => {
      this._privacyResponse = response;
    });
    this._requestState = RequestState.SENT;
  }

  handleReviewClick() {
    this._requestState = RequestState.REVIEW;
  }

  handleNewDemandClick() {
    this._privacyRequest.demands.push({
      action: ACTION.TRANSPARENCY,
    });
  }

  render() {
    return html`
      <div id="priv-req-ctr">
        <div class="req-hdr">My Privacy Request</div>
        <request-progress-indicator></request-progress-indicator>
        ${map(
          this._privacyRequest.demands,
          d => html`
            <demand-builder
              .includedActions=${this.includedActions}
              .demand=${d}
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
                    class="nav-btn center-on-border"
                    @click=${this.handleReviewClick}
                  >
                    Review Request
                  </button>
                `,
              ],
              [
                RequestState.REVIEW,
                () => html`
                  <button
                    class="nav-btn center-on-border"
                    @click=${this.handleSubmitClick}
                  >
                    Submit Privacy Request
                  </button>
                `,
              ],
            ])}
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

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

export class BldnPrivRequest extends LitElement {
  @property({ type: String, attribute: 'excluded-actions' }) excludedActions =
    '';

  @state() _includedActions = Object.values(ACTION).filter(
    a => !a.includes('TRANSPARENCY.')
  );

  @state() _requestState: RequestState = RequestState.BUILD;

  @state() _privacyRequest: PrivacyRequest = {
    demands: [{ action: ACTION.TRANSPARENCY }],
  };

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

    // Privacy request update listeners - TODO: I think we can combine these events, in demand builder too
    this.addEventListener('demand-update', e => {
      this._privacyRequest.demands.push((e as CustomEvent).detail.demand);
    });
    this.addEventListener('demand-update-multiple', e => {
      this._privacyRequest.demands.push((e as CustomEvent).detail?.demands);
    });

    // Listeners for events indicating if the new demand, review, and submit buttons should be visible/clickable
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

      /* Variables? */
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
      /* color: var(--dmnd-actions-menu-title-color, #000); */
      font-weight: bold;
      font-size: 24px;
      text-align: center;
      padding-bottom: 20px;
      /* background-color: blue; */
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
    // TODO: Validate request success here
    this._requestState = RequestState.SENT;
  }

  /** TODO: Move this to one of the lifecycle methods
   * Filter the list of actions to exclude certain ones
   * @returns List of not excluded actions
   */
  getAllowedActions(): ACTION[] {
    const exclActions = this.excludedActions
      .split(',')
      .map(s => s.toLocaleLowerCase());
    return Object.values(ACTION).filter(
      a =>
        !exclActions.includes(a.toLocaleLowerCase()) &&
        !a.includes('TRANSPARENCY.')
    );
  }

  handleReviewClick() {
    // Need some kind of validation here?
    this._requestState = RequestState.REVIEW;
  }

  handleNewDemandClick() {
    this._privacyRequest.demands.push({
      action: ACTION.TRANSPARENCY,
    });
  }

  render() {
    this._includedActions = this.getAllowedActions();

    return html`
      <div id="priv-req-ctr">
        <div class="req-hdr">My Privacy Request</div>
        <request-progress-indicator></request-progress-indicator>
        ${map(
          this._privacyRequest.demands,
          d => html`
            <demand-builder
              .includedActions=${this._includedActions}
              .demand=${d}
              .demandState=${this._requestState === RequestState.REVIEW
                ? DemandState.REVIEW
                : DemandState.SELECT_ACTION}
            ></demand-builder>
            <!-- TODO: Handle bundling of transparency demands into one -->
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

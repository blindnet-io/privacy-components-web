import { html, css, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { map } from 'lit/directives/map.js';

import './DemandBuilder.js';
import './RequestProgressIndicator.js';
import './FrequentRequestsMenu.js';
import './RequestReview.js';
import './ResponseView.js';
import { ACTION } from './models/priv-terms.js';
import { PrivacyRequest } from './models/privacy-request.js';
import { sendPrivacyRequest } from './utils/PrivacyRequestApi.js';
import { PrivacyResponse } from './models/privacy-response.js';
import { RequestState } from './utils/states.js';

export class BldnPrivRequest extends LitElement {
  @property({ type: String, attribute: 'excluded-actions' }) excludedActions =
    '';

  @state() _includedActions = Object.values(ACTION).filter(
    a => !a.includes('TRANSPARENCY.')
  );

  @state() _requestState: RequestState = RequestState.BUILD;

  @state() _privacyRequest: PrivacyRequest = { demands: [] };

  @state() _privacyResponse: PrivacyResponse = {
    responseId: '',
    inResponseTo: '',
    date: '',
    system: '',
    status: '',
  };

  constructor() {
    super();
    this.addEventListener('submit-request', () => {
      sendPrivacyRequest(this._privacyRequest).then(response => {
        this._privacyResponse = response;
      });
      this._requestState = RequestState.REVIEW;
    });
  }

  static styles = css`
    :host {
      display: grid;

      @font-face {
        font-family: 'NeueHaasDisplay-Roman';
        src: url('./assets/fonts/NeueHaasDisplay-Bold.woff') format('woff')
          url('/assets/fonts/NeueHaasDisplay-Bold.woff') format('woff');
        font-weight: normal;
        font-style: italic;
        font-size: 48;
      }

      @font-face {
        font-family: 'NeueHaasDisplay-Mediu';
        src: url('./assets/fonts/NeueHaasDisplay-Mediu.woff') format('woff');
        font-weight: normal;
        font-style: normal;
      }

      @font-face {
        font-family: 'NeueHaasDisplay-Bold';
        src: url('./assets/fonts/NeueHaasDisplay-Bold.woff') format('woff');
        font-weight: normal;
        font-style: normal;
      }

      font-family: 'NeueHaasDisplay-Roman';

      /* Variables? */
      /* max-width: 1000px; */
      /* max-height: 750px; */

      border: 2px solid #000;
      border-radius: 20px;
      padding: 20px;
      margin: 0px 0px 20px 0px;
    }

    .request-header {
      /* color: var(--dmnd-actions-menu-title-color, #000); */
      font-family: 'NeueHaasDisplay-Roman';
      font-weight: bold;
      font-size: 24px;
      text-align: center;
      padding-bottom: 20px;
      /* background-color: blue; */
    }

    .request-progress-indicator {
      background-color: red;
    }

    .frequent-requests {
      background-color: green;
    }
  `;

  /**
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

  render() {
    this._includedActions = this.getAllowedActions();

    return html`
      <div class="request-header">My Privacy Request</div>
      <request-progress-indicator></request-progress-indicator>
      ${map(
        this._privacyRequest.demands,
        d => html`
          <demand-builder
            .includedActions=${this._includedActions}
            .demand=${d}
          ></demand-builder>
          <!-- TODO: Handle bundling of transparency demands into one -->
        `
      )}
      ${when(
        this._requestState === RequestState.SENT,
        () => html`
          <response-view .response=${this._privacyResponse}></response-view>
        `
      )}
    `;
  }
}

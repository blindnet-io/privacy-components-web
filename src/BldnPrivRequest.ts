import { html, css, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';

import './DemandBuilder.js';
import './RequestProgressIndicator.js';
import './FrequentRequestsMenu.js';
import './RequestReview.js';
import { ACTION } from './models/priv-terms.js';
import { PrivacyRequest } from './models/privacy-request.js';

enum requestState {
  DEMAND_BUILDER,
  REVIEW_SUBMIT,
}

export class BldnPrivRequest extends LitElement {
  @property({ type: String, attribute: 'excluded-actions' }) excludedActions =
    '';

  @state() _includedActions = Object.values(ACTION).filter(
    a => !a.includes('TRANSPARENCY.')
  );

  @state() _requestState: requestState = requestState.DEMAND_BUILDER;

  @state() _privacyRequest: PrivacyRequest = { demands: [] };

  constructor() {
    super();
    this.addEventListener('demands-complete-click', () => {
      this._requestState = requestState.REVIEW_SUBMIT;
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
      ${choose(
        this._requestState,
        [
          [
            requestState.DEMAND_BUILDER,
            () => html`
              <demand-builder
                .includedActions=${this._includedActions}
              ></demand-builder>
            `,
          ],
          [
            requestState.REVIEW_SUBMIT,
            () => html` <request-review></request-review> `,
          ],
        ],
        () => html`<h1>Error: Invalid request state</h1>`
      )}
    `;
  }
}

import { html, css, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';

import './DemandBuilder.js';
import './RequestProgressIndicator.js';
import './FrequentRequestsMenu.js';
import './RequestReview.js';
import { action } from './dictionary.js';
import { getAllowedActions } from './utils.js';

enum requestState {
  DEMAND_BUILDER,
  REVIEW_SUBMIT,
}

export class BldnPrivRequest extends LitElement {
  @property({ type: String, attribute: 'excluded-actions' }) excludedActions =
    '';

  @state() _includedActions = Object.values(action);

  @state() _requestState: requestState = requestState.DEMAND_BUILDER;

  private _privacyRequest: {} = {}; // FIXME: Add PrivacyRequest type here

  constructor() {
    super();
    this.addEventListener('demands-complete-click', () => {
      this._requestState = requestState.REVIEW_SUBMIT;
    });
  }

  static styles = css`
    :host {
      display: grid;

      /* Variables? */
      /* max-width: 1000px; */
      /* max-height: 750px; */

      border: 2px solid #000;
      border-radius: 20px;
      padding: 20px;
      margin: 0px 0px 20px 0px;
    }

    .request-header {
      color: var(--dmnd-actions-menu-title-color, #000);
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

  render() {
    this._includedActions = getAllowedActions(this.excludedActions);

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

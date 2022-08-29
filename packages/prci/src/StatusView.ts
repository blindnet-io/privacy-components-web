import { msg } from '@lit/localize';
import { css, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { DEMAND_STATUS } from './models/priv-terms.js';
import { PrivacyResponseItem } from './models/privacy-response.js';
import { buttonStyles, containerStyles, textStyles } from './styles.js';
import { getRequest } from './utils/privacy-request-api.js';

import './StatusViewItem.js';
import { ComponentState } from './utils/states.js';

/**
 * View the status of a Privacy Request
 */
@customElement('status-view')
export class StatusView extends LitElement {
  @property({ type: String, attribute: 'request-id' }) requestId: string = '';

  @state() _requestDate: Date = new Date();

  @state() _completedDemands: PrivacyResponseItem[] = [];

  @state() _processingDemands: PrivacyResponseItem[] = [];

  @state() _cancelledDemands: PrivacyResponseItem[] = [];

  static styles = [
    containerStyles,
    buttonStyles,
    textStyles,
    css`
      :host {
        display: grid;
        row-gap: 40px;
        max-width: 600px;
        text-align: center;
        margin: auto;
      }

      .req-progress-ctr {
        display: grid;
        row-gap: 10px;
      }

      .dmds-ctr {
        display: grid;
        row-gap: 20px;
        padding: 30px 40px 40px 40px;
      }

      .dmds-ctr span {
        padding: 0px 0px 20px 0px;
      }

      #completed-dmds-ctr {
        border: 1px solid #18a0fb;
        background: rgba(24, 160, 251, 0.11);
      }

      #new-request-ctr {
        display: flex;
        justify-content: center;
      }

      #new-request-btn {
        font-size: 18px;
      }

      p {
        margin: 0;
        padding: 0;
      }
    `,
  ];

  reloadRequest() {
    getRequest(this.requestId).then(response => {
      if (response.length > 0) {
        this._requestDate = new Date(response[0].date);
        this._completedDemands = response.filter(d =>
          [
            DEMAND_STATUS.GRANTED,
            DEMAND_STATUS['PARTIALLY-GRANTED'],
            DEMAND_STATUS.DENIED,
          ].includes(d.status)
        );
        this._processingDemands = response.filter(
          d => d.status === DEMAND_STATUS['UNDER-REVIEW']
        );
        this._cancelledDemands = response.filter(
          d => d.status === DEMAND_STATUS.CANCELED
        );
      }
    });
  }

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has('requestId') && this.requestId !== '') {
      this.reloadRequest();
    }
  }

  handleNewRequestClick() {
    this.dispatchEvent(
      new CustomEvent('component-state-change', {
        bubbles: true,
        composed: true,
        detail: {
          newState: ComponentState.MENU,
        },
      })
    );
  }

  render() {
    return html`
      ${when(
        this._processingDemands.length > 0,
        () => html`
          <p>
            ${msg(
              html`Your Privacy Request, sent on
              ${this._requestDate.toLocaleDateString('en-gb')}, is currently
              being processed.`
            )}
          </p>
          ${when(
            this._completedDemands.length > 0,
            () => html`
              <div class="req-progress-ctr">
                <p>${msg('At the moment:')}</p>
                <p>
                  <b
                    >${msg(
                      html`${this._completedDemands.length} demand(s) have been
                      completed${when(
                        this._cancelledDemands.length > 0,
                        () =>
                          html` and ${this._cancelledDemands.length} demand(s)
                          have been cancelled`
                      )}`
                    )}</b
                  >
                </p>
                <p>
                  ${msg(
                    html`${this._processingDemands.length} demand(s) are being
                    processed`
                  )}
                </p>
              </div>
            `
          )}
          <p></p>
        `,
        () => html`
          <p>
            ${msg(
              html`Your Privacy Request, sent on
              ${this._requestDate.toLocaleDateString('en-gb')}, has been
              processed.`
            )}
          </p>
        `
      )}
      ${when(
        this._completedDemands.length > 0,
        () => html`
          <div id="completed-dmds-ctr" class="dmds-ctr medium-border">
            <span><b>${msg('Completed Demand(s)')}</b></span>
            ${map(
              this._completedDemands,
              d => html`<status-view-item .demand=${d}></status-view-item>`
            )}
          </div>
        `
      )}
      ${when(
        this._processingDemands.length > 0,
        () => html`
          <div id="processing-dmds-ctr" class="dmds-ctr medium-border">
            <span><b>${msg('Processing Demand(s)')}</b></span>
            ${map(
              this._processingDemands,
              d => html`<status-view-item .demand=${d}></status-view-item>`
            )}
          </div>
        `
      )}
      ${when(
        this._cancelledDemands.length > 0,
        () => html`
          <div id="cancelled-dmds-ctr" class="dmds-ctr medium-border">
            <span><b>${msg('Cancelled Demand(s)')}</b></span>
            ${map(
              this._cancelledDemands,
              d => html`<status-view-item .demand=${d}></status-view-item>`
            )}
          </div>
        `
      )}
      <div id="new-request-ctr">
        <button
          id="new-request-btn"
          class="link-btn dark-font underline"
          @click=${this.handleNewRequestClick}
        >
          ${msg('Submit a new Privacy Request')}
        </button>
      </div>
    `;
  }
}

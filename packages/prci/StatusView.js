import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { msg, str } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { ComputationAPI, DEMAND_STATUS, ACTION } from '@blindnet/core';
import './StatusViewItem.js';
import { ComponentState } from './utils/states.js';
import { PRCIStyles } from './styles.js';
import { getRequestLink, removeQueryParam } from './utils/utils.js';

const linkSvg = new URL(new URL('assets/link.svg', import.meta.url).href, import.meta.url).href;
/**
 * View the status of a Privacy Request
 */
let StatusView = class StatusView extends LitElement {
    constructor() {
        super(...arguments);
        this.requestId = '';
        this.newRequest = false;
        this._requestDate = new Date();
        this._completedDemands = [];
        this._processingDemands = [];
        this._cancelledDemands = [];
        // eslint-disable-next-line no-undef
        this._intervalId = undefined;
    }
    reloadRequest() {
        // Get the status of the current request once there is an API token set
        if (ComputationAPI.getInstance().hasApiToken()) {
            ComputationAPI.getInstance()
                .getRequest(this.requestId)
                .then(response => {
                if (response.length > 0) {
                    this._requestDate = new Date(response[0].date);
                    this._completedDemands = response.filter(d => [
                        DEMAND_STATUS.GRANTED,
                        DEMAND_STATUS['PARTIALLY-GRANTED'],
                        DEMAND_STATUS.DENIED,
                    ].includes(d.status));
                    this._processingDemands = response.filter(d => d.status === DEMAND_STATUS['UNDER-REVIEW']);
                    this._cancelledDemands = response.filter(d => d.status === DEMAND_STATUS.CANCELED);
                }
                // If no more demands are processing, the reload interval exists, and the data for
                // all ACCESS responses has arrived, stop reloading the request.
                if (this._processingDemands.length === 0 &&
                    this._intervalId &&
                    !this._completedDemands.some(d => d.requested_action === ACTION.ACCESS && !d.data)) {
                    clearInterval(this._intervalId);
                    this._intervalId = undefined;
                }
                else if (!this._intervalId &&
                    this._processingDemands.length !== 0) {
                    // FIXME: reload should happen after a user interaction, not automatically
                    // Setup an interval to get the status of processing demands every 3 seconds
                    this._intervalId = setInterval(() => this.reloadRequest(), 3000);
                }
            });
        }
        else {
            this._intervalId = setInterval(() => this.reloadRequest(), 3000);
        }
    }
    willUpdate(_changedProperties) {
        if (_changedProperties.has('requestId') && this.requestId !== '') {
            this.reloadRequest();
        }
    }
    handleCopyIdClick() {
        navigator.clipboard.writeText(this.requestId);
    }
    handleCopyLinkClick() {
        navigator.clipboard.writeText(getRequestLink(this.requestId).toString());
    }
    handleBackClick() {
        removeQueryParam('requestId');
        this.dispatchEvent(new CustomEvent('component-state-change', {
            bubbles: true,
            composed: true,
            detail: {
                newState: ComponentState.REQUESTS,
            },
        }));
    }
    handleNewRequestClick() {
        removeQueryParam('requestId');
        this.dispatchEvent(new CustomEvent('component-state-change', {
            bubbles: true,
            composed: true,
            detail: {
                newState: ComponentState.MENU,
            },
        }));
    }
    /**
     * Stop fetching this request when leaving status view
     */
    disconnectedCallback() {
        if (this._intervalId) {
            clearInterval(this._intervalId);
        }
    }
    render() {
        return html `
      ${when(this._processingDemands.length > 0, () => html `
          <p>
            ${msg(str `Your Privacy Request, sent on
              ${this._requestDate.toLocaleDateString('en-gb')}, is currently
              being processed.`)}
          </p>
          ${when(this._completedDemands.length > 0, () => html `
              <div class="req-progress-ctr">
                <p>${msg('At the moment:')}</p>
                <p>
                  <b
                    >${msg(html `${this._completedDemands.length} demand(s) have been
                      completed${when(this._cancelledDemands.length > 0, () => html ` and ${this._cancelledDemands.length} demand(s)
                          have been cancelled`)}`)}</b
                  >
                </p>
                <p>
                  ${msg(html `${this._processingDemands.length} demand(s) are being
                    processed`)}
                </p>
              </div>
            `)}
        `, () => html `
          <p>
            ${msg(html `Your Privacy Request, sent on
              ${this._requestDate.toLocaleDateString('en-gb')}, has been
              processed.`)}
          </p>
        `)}
      <div>
        <button class='svg-btn' @click=${this.handleCopyLinkClick}>
          <img src=${linkSvg} alt='Copy status page link'></img>&nbsp;
          <span class='text--underline'>${msg('Copy link to this page')}</span>
        </button>
      </div>
      ${when(this._completedDemands.length > 0, () => html `
          <div
            id="completed-dmds-ctr"
            class="dmds-ctr border--medium border--rounded"
          >
            <span><b>${msg('Completed Demand(s)')}</b></span>
            ${map(this._completedDemands, d => html `<status-view-item .demand=${d}></status-view-item>`)}
          </div>
        `)}
      ${when(this._processingDemands.length > 0, () => html `
          <div
            id="processing-dmds-ctr"
            class="dmds-ctr border--medium border--rounded"
          >
            <span><b>${msg('Processing Demand(s)')}</b></span>
            ${map(this._processingDemands, d => html `<status-view-item .demand=${d}></status-view-item>`)}
          </div>
        `)}
      ${when(this._cancelledDemands.length > 0, () => html `
          <div
            id="cancelled-dmds-ctr"
            class="dmds-ctr border--medium border--rounded"
          >
            <span><b>${msg('Cancelled Demand(s)')}</b></span>
            ${map(this._cancelledDemands, d => html `<status-view-item .demand=${d}></status-view-item>`)}
          </div>
        `)}
      <div id="nav-btns-ctr">
        <button
          class="status-nav-btn link-btn dark-font text--underline"
          @click=${this.handleBackClick}
        >
          ${msg('Back to my Requests')}
        </button>
        <button
          class="status-nav-btn link-btn dark-font text--underline"
          @click=${this.handleNewRequestClick}
        >
          ${msg('Submit a new Privacy Request')}
        </button>
      </div>
    `;
    }
};
StatusView.styles = [
    PRCIStyles,
    css `
      :host {
        display: grid;
        row-gap: 20px;
        max-width: 900px;
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

      #nav-btns-ctr {
        display: flex;
        /* grid-template-columns: repeat(2, 1fr); */
        column-gap: 20px;
        justify-content: center;
        justify-items: center;
      }

      .status-nav-btn {
        font-size: 18px;
      }

      p {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      button {
        display: inline-flex;
        align-items: center;
      }
    `,
];
__decorate([
    property({ type: String, attribute: 'request-id' })
], StatusView.prototype, "requestId", void 0);
__decorate([
    property({ type: Boolean })
], StatusView.prototype, "newRequest", void 0);
__decorate([
    state()
], StatusView.prototype, "_requestDate", void 0);
__decorate([
    state()
], StatusView.prototype, "_completedDemands", void 0);
__decorate([
    state()
], StatusView.prototype, "_processingDemands", void 0);
__decorate([
    state()
], StatusView.prototype, "_cancelledDemands", void 0);
__decorate([
    state()
], StatusView.prototype, "_intervalId", void 0);
StatusView = __decorate([
    customElement('status-view')
], StatusView);

export { StatusView };
//# sourceMappingURL=StatusView.js.map

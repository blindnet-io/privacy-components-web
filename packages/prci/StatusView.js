import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { DEMAND_STATUS, ACTION } from './models/priv-terms.js';
import { containerStyles, buttonStyles, textStyles } from './styles.js';
import { getRequest } from './utils/privacy-request-api.js';
import './StatusViewItem.js';
import { ComponentState } from './utils/states.js';

/**
 * View the status of a Privacy Request
 */
let StatusView = class StatusView extends LitElement {
    constructor() {
        super(...arguments);
        this.requestId = '';
        this._requestDate = new Date();
        this._completedDemands = [];
        this._processingDemands = [];
        this._cancelledDemands = [];
        // eslint-disable-next-line no-undef
        this._intervalId = undefined;
    }
    reloadRequest() {
        getRequest(this.requestId).then(response => {
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
            else if (!this._intervalId && this._processingDemands.length !== 0) {
                // Setup an interval to get the status of processing demands every 3 seconds
                this._intervalId = setInterval(() => this.reloadRequest(), 3000);
            }
        });
    }
    willUpdate(_changedProperties) {
        if (_changedProperties.has('requestId') && this.requestId !== '') {
            this.reloadRequest();
        }
    }
    handleBackClick() {
        this.dispatchEvent(new CustomEvent('component-state-change', {
            bubbles: true,
            composed: true,
            detail: {
                newState: ComponentState.REQUESTS,
            },
        }));
    }
    handleNewRequestClick() {
        this.dispatchEvent(new CustomEvent('component-state-change', {
            bubbles: true,
            composed: true,
            detail: {
                newState: ComponentState.MENU,
            },
        }));
    }
    render() {
        return html `
      ${when(this._processingDemands.length > 0, () => html `
          <p>
            ${msg(html `Your Privacy Request, sent on
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
      ${when(this._completedDemands.length > 0, () => html `
          <div id="completed-dmds-ctr" class="dmds-ctr medium-border">
            <span><b>${msg('Completed Demand(s)')}</b></span>
            ${map(this._completedDemands, d => html `<status-view-item .demand=${d}></status-view-item>`)}
          </div>
        `)}
      ${when(this._processingDemands.length > 0, () => html `
          <div id="processing-dmds-ctr" class="dmds-ctr medium-border">
            <span><b>${msg('Processing Demand(s)')}</b></span>
            ${map(this._processingDemands, d => html `<status-view-item .demand=${d}></status-view-item>`)}
          </div>
        `)}
      ${when(this._cancelledDemands.length > 0, () => html `
          <div id="cancelled-dmds-ctr" class="dmds-ctr medium-border">
            <span><b>${msg('Cancelled Demand(s)')}</b></span>
            ${map(this._cancelledDemands, d => html `<status-view-item .demand=${d}></status-view-item>`)}
          </div>
        `)}
      <div id="nav-btns-ctr">
        <button
          class="status-nav-btn link-btn dark-font underline"
          @click=${this.handleBackClick}
        >
          ${msg('Back to my Requests')}
        </button>
        <button
          class="status-nav-btn link-btn dark-font underline"
          @click=${this.handleNewRequestClick}
        >
          ${msg('Submit a new Privacy Request')}
        </button>
      </div>
    `;
    }
};
StatusView.styles = [
    containerStyles,
    buttonStyles,
    textStyles,
    css `
      :host {
        display: grid;
        row-gap: 40px;
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
        margin: 0;
        padding: 0;
      }
    `,
];
__decorate([
    property({ type: String, attribute: 'request-id' })
], StatusView.prototype, "requestId", void 0);
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

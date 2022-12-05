import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { CoreConfigurationMixin, ComputationAPI, PrItem } from '@blindnet/core';
import { msg, localized } from '@lit/localize';
import { LitElement, html, css } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import './bldn-submitted-requests-list.js';
import './bldn-request-status.js';

const backSvg = new URL(new URL('../assets/eva_arrow-back-outline.svg', import.meta.url).href, import.meta.url).href;
var RequestViewerUIState;
(function (RequestViewerUIState) {
    RequestViewerUIState[RequestViewerUIState["requestsList"] = 0] = "requestsList";
    RequestViewerUIState[RequestViewerUIState["requestStatus"] = 1] = "requestStatus";
})(RequestViewerUIState || (RequestViewerUIState = {}));
let BldnRequestViewer = class BldnRequestViewer extends CoreConfigurationMixin(LitElement) {
    constructor() {
        super(...arguments);
        this._requestFilter = 'all';
        this._uiState = RequestViewerUIState.requestsList;
    }
    handleRequestsCategoryChange(e) {
        e.stopPropagation();
        const { value } = e.detail;
        this._requestFilter = value;
    }
    handleRequestClick(e) {
        e.stopPropagation();
        const { value } = e.detail;
        this._selectedRequest = value;
        this._uiState = RequestViewerUIState.requestStatus;
    }
    handleBackClick() {
        this._uiState = RequestViewerUIState.requestsList;
        this.getRequests();
    }
    /**
     * Get submitted requests once we have a token
     */
    getRequests() {
        ComputationAPI.getInstance()
            .getRequestHistory()
            .then(submittedRequests => {
            var _a;
            this._requests = (_a = submittedRequests.history) !== null && _a !== void 0 ? _a : [];
        });
    }
    getRequestsToDisplay() {
        if (this._requests !== undefined) {
            switch (this._requestFilter) {
                case 'all':
                    return this._requests;
                case 'pending':
                    return this._requests.filter(r => r.status === PrItem.status.IN_PROCESSING);
                case 'answered':
                    return this._requests.filter(r => r.status === PrItem.status.COMPLETED);
                case 'canceled':
                    return this._requests.filter(r => r.status === PrItem.status.CANCELED);
                default:
                    return this._requests;
            }
        }
        return this._requests;
    }
    goToStatus() {
        this._selectedRequest = this.requestId;
        this._uiState = RequestViewerUIState.requestStatus;
    }
    willUpdate(_changedProperties) {
        if (_changedProperties.has('apiToken') && this.apiToken)
            this.getRequests();
        if (_changedProperties.has('requestId') && this.requestId)
            this.goToStatus();
    }
    connectedCallback() {
        // eslint-disable-next-line wc/guard-super-call
        super.connectedCallback();
        if (ComputationAPI.getInstance().apiTokenSet())
            this.getRequests();
    }
    render() {
        return html `
      ${when(this._uiState === RequestViewerUIState.requestsList, () => html `
          <bldn-horizontal-list
            .choices=${[
            {
                value: 'all',
                display: msg('All'),
            },
            {
                value: 'pending',
                display: msg('Pending'),
            },
            {
                value: 'answered',
                display: msg('Answered'),
            },
            {
                value: 'canceled',
                display: msg('Canceled'),
            },
        ]}
            @bldn-horizontal-list:choice-change=${this
            .handleRequestsCategoryChange}
          ></bldn-horizontal-list>
          <bldn-submitted-requests-list
            .requests=${this.getRequestsToDisplay()}
            @bldn-submitted-requests-list:request-click=${this
            .handleRequestClick}
          >
          </bldn-submitted-requests-list>
        `, () => html `
        <bldn-button mode='link-icon' underline-mode='none' @bldn-button:click=${this.handleBackClick}>
          <img src=${backSvg} alt='back to requests'></img>
          <span id='back-button'><b>${msg('Back to Requests')}</b></span>
        </bldn-button>
        <bldn-request-status
          .requestId=${this._selectedRequest}
        ></bldn-request-status>
      `)}
    `;
    }
};
BldnRequestViewer.styles = css `
    :host {
      display: block;
    }

    bldn-horizontal-list {
      margin-bottom: 1.75em;
    }

    #back-button {
      color: var(--color-darkest);
    }

    bldn-request-status {
      margin-top: 1.75em;
    }
  `;
__decorate([
    property({ type: String, attribute: 'request-id' })
], BldnRequestViewer.prototype, "requestId", void 0);
__decorate([
    state()
], BldnRequestViewer.prototype, "_requests", void 0);
__decorate([
    state()
], BldnRequestViewer.prototype, "_requestFilter", void 0);
__decorate([
    state()
], BldnRequestViewer.prototype, "_uiState", void 0);
__decorate([
    state()
], BldnRequestViewer.prototype, "_selectedRequest", void 0);
BldnRequestViewer = __decorate([
    localized(),
    customElement('bldn-request-viewer')
], BldnRequestViewer);

export { BldnRequestViewer };
//# sourceMappingURL=bldn-request-viewer.js.map

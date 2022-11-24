import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { CoreConfigurationMixin, bldnStyles } from '@blindnet/core';
import { msg, localized } from '@lit/localize';
import { LitElement, html, css } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import './bldn-request-builder.js';
import './bldn-submitted-requests.js';
import { setLocale } from './localization.js';

var DefaultDataCategories;
(function (DefaultDataCategories) {
    DefaultDataCategories["ALL"] = "*";
    DefaultDataCategories["AFFILIATION"] = "AFFILIATION";
    DefaultDataCategories["BEHAVIOR"] = "BEHAVIOR";
    DefaultDataCategories["BIOMETRIC"] = "BIOMETRIC";
    DefaultDataCategories["CONTACT"] = "CONTACT";
    DefaultDataCategories["DEMOGRAPHIC"] = "DEMOGRAPHIC";
    DefaultDataCategories["DEVICE"] = "DEVICE";
    DefaultDataCategories["FINANCIAL"] = "FINANCIAL";
    DefaultDataCategories["GENETIC"] = "GENETIC";
    DefaultDataCategories["HEALTH"] = "HEALTH";
    DefaultDataCategories["IMAGE"] = "IMAGE";
    DefaultDataCategories["LOCATION"] = "LOCATION";
    DefaultDataCategories["NAME"] = "NAME";
    DefaultDataCategories["PROFILING"] = "PROFILING";
    DefaultDataCategories["RELATIONSHIPS"] = "RELATIONSHIPS";
    DefaultDataCategories["UID"] = "UID";
    DefaultDataCategories["OTHER-DATA"] = "OTHER-DATA";
})(DefaultDataCategories || (DefaultDataCategories = {}));
var PRCIUIState;
(function (PRCIUIState) {
    PRCIUIState[PRCIUIState["createRequest"] = 0] = "createRequest";
    PRCIUIState[PRCIUIState["submittedRequests"] = 1] = "submittedRequests";
})(PRCIUIState || (PRCIUIState = {}));
let BldnPrivRequest = class BldnPrivRequest extends CoreConfigurationMixin(LitElement) {
    constructor() {
        super();
        /** @prop */
        this.actions = [];
        /** @prop */
        this.dataCategories = Object.values(DefaultDataCategories);
        this._uiState = PRCIUIState.createRequest;
        // Set locale if current one is supported
        try {
            setLocale(navigator.language);
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.log(`Could not set locale to ${navigator.language}.`);
        }
        // Check if a requestId passed
        const url = new URL(window.location.href);
        const requestId = url.searchParams.get('requestId');
        if (requestId) {
            // Remove requestId from the URL after setting it
            this.requestId = requestId;
            url.searchParams.delete('requestId');
            window.history.replaceState({}, '', url.href);
        }
    }
    handleRequestIdChange() {
        this._uiState = PRCIUIState.submittedRequests;
    }
    handleRequestSent(e) {
        const { requestId } = e.detail;
        this.requestId = requestId;
    }
    handleNavClick(e) {
        const { value } = e.detail;
        if (value === 'create') {
            this._uiState = PRCIUIState.createRequest;
        }
        else {
            this.requestId = undefined;
            this._uiState = PRCIUIState.submittedRequests;
        }
    }
    /**
     * Set the apiToken property when component catches the set event
     * @param e CustomEvent containing the token in the details object
     */
    handleApiTokenEvent(e) {
        const { token } = e.detail;
        if (token) {
            this.apiToken = token;
        }
    }
    willUpdate(_changedProperties) {
        super.willUpdate(_changedProperties);
        if (_changedProperties.has('requestId'))
            this.handleRequestIdChange();
    }
    connectedCallback() {
        // eslint-disable-next-line wc/guard-super-call
        super.connectedCallback();
        this.addEventListener('bldn-priv-request-api-token:set', this.handleApiTokenEvent);
    }
    disconnectedCallback() {
        // eslint-disable-next-line wc/guard-super-call
        super.disconnectedCallback();
        this.removeEventListener('bldn-priv-request-api-token:set', this.handleApiTokenEvent);
    }
    render() {
        return html `
      <bldn-nav-toggle
        .left=${{
            label: msg('Submit a Request'),
            value: 'create',
            checked: this._uiState === PRCIUIState.createRequest,
        }}
        .right=${{
            label: msg('Submitted Requests'),
            value: 'submitted',
            checked: this._uiState === PRCIUIState.submittedRequests,
        }}
        @bldn-nav-toggle:click=${this.handleNavClick}
      ></bldn-nav-toggle>
      ${choose(this._uiState, [
            [
                PRCIUIState.createRequest,
                () => html `
              <bldn-request-builder
                api-token=${ifDefined(this.apiToken)}
                data-categories=${JSON.stringify(this.dataCategories)}
                actions=${JSON.stringify(this.actions)}
                @bldn-request-builder:request-sent=${this.handleRequestSent}
              ></bldn-request-builder>
            `,
            ],
            [
                PRCIUIState.submittedRequests,
                () => html `
            <bldn-submitted-requests
              request-id=${ifDefined(this.requestId)}
            ></bldn-submitted-requests>
          `,
            ],
        ])}
    `;
    }
};
BldnPrivRequest.styles = [
    bldnStyles,
    css `
      :host {
        display: block;
        width: 100%;
        background: var(--bldn-privacy-request-background, var(--background));
      }

      bldn-request-builder,
      bldn-submitted-requests {
        margin-top: 2.5em;
      }

      bldn-submitted-requests {
        padding: 0 10%;
      }
    `,
];
__decorate([
    property({ type: Array })
], BldnPrivRequest.prototype, "actions", void 0);
__decorate([
    property({ type: Array, attribute: 'data-categories' })
], BldnPrivRequest.prototype, "dataCategories", void 0);
__decorate([
    property({ type: Array })
], BldnPrivRequest.prototype, "requestId", void 0);
__decorate([
    state()
], BldnPrivRequest.prototype, "_uiState", void 0);
BldnPrivRequest = __decorate([
    localized(),
    customElement('bldn-priv-request')
], BldnPrivRequest);

export { BldnPrivRequest };
//# sourceMappingURL=bldn-priv-request.js.map

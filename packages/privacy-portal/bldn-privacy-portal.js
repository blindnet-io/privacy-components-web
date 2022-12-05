import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { CoreConfigurationMixin } from '@blindnet/core';
import { bldnStyles } from '@blindnet/core-ui';
import { msg, localized } from '@lit/localize';
import { LitElement, html, css } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import './request-builder/bldn-request-builder.js';
import './request-viewer/bldn-request-viewer.js';
import { choose } from 'lit/directives/choose.js';
import { when } from 'lit/directives/when.js';
import { setLocale } from './localization.js';
import { BldnRequestAddon } from './request-builder/request-modules/bldn-request-addon.js';

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
var PrivacyPortalUIState;
(function (PrivacyPortalUIState) {
    PrivacyPortalUIState[PrivacyPortalUIState["createRequest"] = 0] = "createRequest";
    PrivacyPortalUIState[PrivacyPortalUIState["submittedRequests"] = 1] = "submittedRequests";
})(PrivacyPortalUIState || (PrivacyPortalUIState = {}));
let BldnPrivacyPortal = class BldnPrivacyPortal extends CoreConfigurationMixin(LitElement) {
    constructor() {
        super();
        /** @prop */
        this.actions = [];
        /** @prop */
        this.dataCategories = Object.values(DefaultDataCategories);
        this._uiState = PrivacyPortalUIState.createRequest;
        this._preAddons = [];
        this._postAddons = [];
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
        this._uiState = PrivacyPortalUIState.submittedRequests;
    }
    handleRequestSent(e) {
        const { requestId } = e.detail;
        this.requestId = requestId;
    }
    handleNavClick(e) {
        const { value } = e.detail;
        if (value === 'create') {
            this._uiState = PrivacyPortalUIState.createRequest;
        }
        else {
            this.requestId = undefined;
            this._uiState = PrivacyPortalUIState.submittedRequests;
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
    handlePreAddonSlotChange(e) {
        const slots = e.target.assignedElements();
        // Check if any addons were slotted
        if (this._preAddons.length === 0 &&
            slots.length !== 0 &&
            slots.every(slot => slot instanceof BldnRequestAddon)) {
            this._preAddons = slots;
        }
    }
    handlePostAddonSlotChange(e) {
        const slots = e.target.assignedElements();
        // Check if any addons were slotted
        if (this._postAddons.length === 0 &&
            slots.length !== 0 &&
            slots.every(slot => slot instanceof BldnRequestAddon)) {
            this._postAddons = slots;
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
            checked: this._uiState === PrivacyPortalUIState.createRequest,
        }}
        .right=${{
            label: msg('Submitted Requests'),
            value: 'submitted',
            checked: this._uiState === PrivacyPortalUIState.submittedRequests,
        }}
        @bldn-nav-toggle:click=${this.handleNavClick}
      ></bldn-nav-toggle>
      ${choose(this._uiState, [
            [
                PrivacyPortalUIState.createRequest,
                () => html `
            <bldn-request-builder
              api-token=${ifDefined(this.apiToken)}
              data-categories=${JSON.stringify(this.dataCategories)}
              actions=${JSON.stringify(this.actions)}
              @bldn-request-builder:request-sent=${this.handleRequestSent}
            >
              ${when(this._preAddons.length > 0, () => html ` ${this._preAddons} `, () => html `
                  <slot
                    name="preFormAddon"
                    slot="preFormAddon"
                    @slotchange=${this.handlePreAddonSlotChange}
                    ><span><!-- Default Slot Content --></span></slot
                  >
                `)}
              ${when(this._postAddons.length > 0, () => html ` ${this._postAddons} `, () => html `
                  <slot
                    name="postFormAddon"
                    slot="postFormAddon"
                    @slotchange=${this.handlePostAddonSlotChange}
                    ><span><!-- Default Slot Content --></span></slot
                  >
                `)}
            </bldn-request-builder>
          `,
            ],
            [
                PrivacyPortalUIState.submittedRequests,
                () => html `
            <bldn-request-viewer
              request-id=${ifDefined(this.requestId)}
            ></bldn-request-viewer>
          `,
            ],
        ])}
    `;
    }
};
BldnPrivacyPortal.styles = [
    bldnStyles,
    css `
      :host {
        display: block;
        width: 100%;
        background: var(--bldn-privacy-request-background, var(--background));
      }

      bldn-request-builder,
      bldn-request-viewer {
        margin-top: 2.5em;
      }

      bldn-request-viewer {
        padding: 0 10%;
      }
    `,
];
__decorate([
    property({ type: Array })
], BldnPrivacyPortal.prototype, "actions", void 0);
__decorate([
    property({ type: Array, attribute: 'data-categories' })
], BldnPrivacyPortal.prototype, "dataCategories", void 0);
__decorate([
    property({ type: Array })
], BldnPrivacyPortal.prototype, "requestId", void 0);
__decorate([
    state()
], BldnPrivacyPortal.prototype, "_uiState", void 0);
__decorate([
    state()
], BldnPrivacyPortal.prototype, "_preAddons", void 0);
__decorate([
    state()
], BldnPrivacyPortal.prototype, "_postAddons", void 0);
BldnPrivacyPortal = __decorate([
    localized(),
    customElement('bldn-privacy-portal')
], BldnPrivacyPortal);

export { BldnPrivacyPortal };
//# sourceMappingURL=bldn-privacy-portal.js.map

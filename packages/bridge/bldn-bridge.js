import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { msg, localized } from '@lit/localize';
import { LitElement, html, css } from 'lit';
import { state, customElement } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import '@blindnet/core-ui';
import './bldn-bridge-requests.js';
import './bldn-bridge-alerts.js';
import { CoreConfigurationMixin, ComputationAPI } from '@blindnet/core';
import { setLocale } from './localization.js';

var BridgeUIState;
(function (BridgeUIState) {
    BridgeUIState[BridgeUIState["requests"] = 0] = "requests";
    BridgeUIState[BridgeUIState["alerts"] = 1] = "alerts";
})(BridgeUIState || (BridgeUIState = {}));
let BldnBridge = class BldnBridge extends CoreConfigurationMixin(LitElement) {
    constructor() {
        super();
        this._uiState = BridgeUIState.requests;
        this._demands = [];
        // Set locale if current one is supported
        try {
            setLocale(navigator.language);
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.log(`Could not set locale to ${navigator.language}.`);
        }
    }
    handleViewToggleChange(e) {
        const { newValue } = e.detail;
        this._uiState =
            newValue === 'Alerts' ? BridgeUIState.alerts : BridgeUIState.requests;
    }
    connectedCallback() {
        // eslint-disable-next-line wc/guard-super-call
        super.connectedCallback();
    }
    willUpdate(_changedProperties) {
        if (_changedProperties.has('adminToken') && this.adminToken) {
            ComputationAPI.getInstance()
                .getPendingDemands(this.adminToken)
                .then(demands => {
                this._demands = demands;
            });
        }
    }
    render() {
        return html `
      <bldn-toggle-button
        left=${msg('Requests')}
        right=${msg('Alerts')}
        @bldn-toggle-button-change=${this.handleViewToggleChange}
      ></bldn-toggle-button>
      ${choose(this._uiState, [
            [
                BridgeUIState.requests,
                () => html `<bldn-bridge-requests
              demands=${JSON.stringify(this._demands)}
            ></bldn-bridge-requests>`,
            ],
            [
                BridgeUIState.alerts,
                () => html `<bldn-bridge-alerts></bldn-bridge-alerts>`,
            ],
        ])}
    `;
    }
};
BldnBridge.styles = css `
    :host {
      display: block;
      width: 100%;
    }
    bldn-toggle-button {
      padding-bottom: 4vh;
    }
  `;
__decorate([
    state()
], BldnBridge.prototype, "_uiState", void 0);
__decorate([
    state()
], BldnBridge.prototype, "_demands", void 0);
BldnBridge = __decorate([
    localized(),
    customElement('bldn-bridge')
], BldnBridge);

export { BldnBridge };
//# sourceMappingURL=bldn-bridge.js.map

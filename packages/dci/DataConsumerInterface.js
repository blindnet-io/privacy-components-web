import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { localized } from '@lit/localize';
import { LitElement, html, css } from 'lit';
import { state, customElement } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { CoreConfigurationMixin, ComputationAPI } from '@blindnet/core';
import { setLocale } from './utils/localization.js';

var DCIUIState;
(function (DCIUIState) {
    DCIUIState[DCIUIState["requests"] = 0] = "requests";
    DCIUIState[DCIUIState["alerts"] = 1] = "alerts";
})(DCIUIState || (DCIUIState = {}));
let DataConsumerInterface = class DataConsumerInterface extends CoreConfigurationMixin(LitElement) {
    constructor() {
        super();
        this._uiState = DCIUIState.requests;
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
            newValue === 'Alerts' ? DCIUIState.alerts : DCIUIState.requests;
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
        left="Requests"
        right="Alerts"
        @bldn-toggle-button-change=${this.handleViewToggleChange}
      ></bldn-toggle-button>
      ${choose(this._uiState, [
            [
                DCIUIState.requests,
                () => html `<bldn-data-consum-requests
              demands=${JSON.stringify(this._demands)}
            ></bldn-data-consum-requests>`,
            ],
            [
                DCIUIState.alerts,
                () => html `<bldn-data-consum-alerts></bldn-data-consum-alerts>`,
            ],
        ])}
    `;
    }
};
DataConsumerInterface.styles = css `
    :host {
      width: 100%;
    }
    bldn-toggle-button {
      padding-bottom: 4vh;
    }
  `;
__decorate([
    state()
], DataConsumerInterface.prototype, "_uiState", void 0);
__decorate([
    state()
], DataConsumerInterface.prototype, "_demands", void 0);
DataConsumerInterface = __decorate([
    customElement('bldn-data-consum'),
    localized()
], DataConsumerInterface);

export { DataConsumerInterface };
//# sourceMappingURL=DataConsumerInterface.js.map

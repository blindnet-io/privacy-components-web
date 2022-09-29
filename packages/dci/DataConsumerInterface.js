import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { localized } from '@lit/localize';
import { LitElement, html, css } from 'lit';
import { state, customElement } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { CoreConfigurationMixin, ComputationAPI } from '@blindnet/core';

var DCIUIState;
(function (DCIUIState) {
    DCIUIState[DCIUIState["requests"] = 0] = "requests";
    DCIUIState[DCIUIState["alerts"] = 1] = "alerts";
})(DCIUIState || (DCIUIState = {}));
let DataConsumerInterface = class DataConsumerInterface extends CoreConfigurationMixin(LitElement) {
    constructor() {
        super(...arguments);
        this._uiState = DCIUIState.requests;
        this._demands = [];
    }
    handleViewToggleChange(e) {
        const { newValue } = e.detail;
        this._uiState =
            newValue === 'Alerts' ? DCIUIState.alerts : DCIUIState.requests;
    }
    connectedCallback() {
        // eslint-disable-next-line wc/guard-super-call
        super.connectedCallback();
        ComputationAPI.getInstance()
            .getPendingDemands()
            .then(demands => {
            this._demands = demands;
        });
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

import { localized } from '@lit/localize';
import { css, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';

import {
  ComputationAPI,
  CoreConfigurationMixin,
  PendingDemandPayload,
} from '@blindnet/core';
import { setLocale } from './utils/localization.js';

enum DCIUIState {
  requests,
  alerts,
}

@customElement('bldn-data-consum')
@localized()
export class DataConsumerInterface extends CoreConfigurationMixin(LitElement) {
  @state() _uiState: DCIUIState = DCIUIState.requests;

  @state() _demands: PendingDemandPayload[] = [];

  constructor() {
    super();

    // Set locale if current one is supported
    try {
      setLocale(navigator.language);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`Could not set locale to ${navigator.language}.`);
    }
  }

  handleViewToggleChange(e: CustomEvent) {
    const { newValue } = e.detail;
    this._uiState =
      newValue === 'Alerts' ? DCIUIState.alerts : DCIUIState.requests;
  }

  connectedCallback() {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();
  }

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has('adminToken') && this.adminToken) {
      ComputationAPI.getInstance()
        .getPendingDemands(this.adminToken)
        .then(demands => {
          this._demands = demands;
        });
    }
  }

  render() {
    return html`
      <bldn-toggle-button
        left="Requests"
        right="Alerts"
        @bldn-toggle-button-change=${this.handleViewToggleChange}
      ></bldn-toggle-button>
      ${choose(this._uiState, [
        [
          DCIUIState.requests,
          () =>
            html`<bldn-data-consum-requests
              demands=${JSON.stringify(this._demands)}
            ></bldn-data-consum-requests>`,
        ],
        [
          DCIUIState.alerts,
          () => html`<bldn-data-consum-alerts></bldn-data-consum-alerts>`,
        ],
      ])}
    `;
  }

  static styles = css`
    :host {
      width: 100%;
    }
    bldn-toggle-button {
      padding-bottom: 4vh;
    }
  `;
}

import { localized, msg } from '@lit/localize';
import { css, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';

import '@blindnet/core-ui';
import './bldn-bridge-requests.js';
import './bldn-bridge-alerts.js';

import {
  ComputationAPI,
  CoreConfigurationMixin,
  PendingDemandPayload,
} from '@blindnet/core';
import { setLocale } from './localization.js';

enum BridgeUIState {
  requests,
  alerts,
}

/**
 * Webcomponent for responding to privacy requests.
 *
 * @element bldn-bridge
 */
@localized()
@customElement('bldn-bridge')
export class BldnBridge extends CoreConfigurationMixin(LitElement) {
  @state() _uiState: BridgeUIState = BridgeUIState.requests;

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
      newValue === 'Alerts' ? BridgeUIState.alerts : BridgeUIState.requests;
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
        left=${msg('Requests')}
        right=${msg('Alerts')}
        @bldn-toggle-button-change=${this.handleViewToggleChange}
      ></bldn-toggle-button>
      ${choose(this._uiState, [
        [
          BridgeUIState.requests,
          () =>
            html`<bldn-bridge-requests
              demands=${JSON.stringify(this._demands)}
            ></bldn-bridge-requests>`,
        ],
        [
          BridgeUIState.alerts,
          () => html`<bldn-bridge-alerts></bldn-bridge-alerts>`,
        ],
      ])}
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }
    bldn-toggle-button {
      padding-bottom: 4vh;
    }
  `;
}

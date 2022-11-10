import {
  CoreConfigurationMixin,
  PrivacyRequestDemand,
  bldnStyles,
} from '@blindnet/core';
import { localized } from '@lit/localize';
import { css, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import './bldn-request-builder.js';
import './bldn-submitted-requests.js';
import { setLocale, getLocale } from './utils/localization.js';

enum PRCIUIState {
  createRequest,
  submittedRequests,
}

@localized()
@customElement('bldn-priv-request')
export class BldnPrivRequest extends CoreConfigurationMixin(LitElement) {
  /** @prop */
  @property({ type: Array }) actions: PrivacyRequestDemand.action[] = [];

  /** @prop */
  @property({ type: Array, attribute: 'data-categories' })
  dataCategories: string[] = [];

  /** @prop */
  @property({ type: Array }) requestId: undefined | string;

  @state() _uiState: PRCIUIState = PRCIUIState.createRequest;

  constructor() {
    super();

    // Set locale if current one is supported
    try {
      setLocale(navigator.language).then(() => {
        console.log(`Set locale to ${getLocale()}`);
      });
    } catch (e) {
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

  handleRequestSent(e: Event) {
    const { requestId } = (e as CustomEvent).detail;
    this.requestId = requestId;
  }

  handleNavClick(e: Event) {
    const { value } = (e as CustomEvent).detail;
    if (value === 'create') {
      this._uiState = PRCIUIState.createRequest;
    } else {
      this.requestId = undefined;
      this._uiState = PRCIUIState.submittedRequests;
    }
  }

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has('requestId')) this.handleRequestIdChange();
  }

  render() {
    return html`
      <bldn-nav-toggle
        .left=${{
          label: 'Submit a Request',
          value: 'create',
          checked: this._uiState === PRCIUIState.createRequest,
        }}
        .right=${{
          label: 'Submitted Requests',
          value: 'submitted',
          checked: this._uiState === PRCIUIState.submittedRequests,
        }}
        @bldn-nav-toggle:click=${this.handleNavClick}
      ></bldn-nav-toggle>
      ${choose(this._uiState, [
        [
          PRCIUIState.createRequest,
          () =>
            html`
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
          () => html`
            <bldn-submitted-requests
              request-id=${ifDefined(this.requestId)}
            ></bldn-submitted-requests>
          `,
        ],
      ])}
    `;
  }

  static styles = [
    bldnStyles,
    css`
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
}

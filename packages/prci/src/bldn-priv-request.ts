import {
  CoreConfigurationMixin,
  PrivacyRequestDemand,
  bldnStyles,
} from '@blindnet/core';
import { localized } from '@lit/localize';
import { css, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';

import './bldn-request-builder.js';
import './bldn-submitted-requests.js';
import { ifDefined } from 'lit/directives/if-defined.js';

enum PRCIUIState {
  createRequest,
  submittedRequests,
}

@localized()
@customElement('bldn-priv-request')
export class BldnPrivRequest extends CoreConfigurationMixin(LitElement) {
  /** @prop */
  @property({ type: Array }) actions: PrivacyRequestDemand.action[] =
    Object.values(PrivacyRequestDemand.action);

  /** @prop */
  @property({ type: Array }) dataCategories: string[] = [];

  /** @prop */
  @property({ type: Array }) requestId: undefined | string;

  @state() _uiState: PRCIUIState = PRCIUIState.createRequest;

  handleActionsChange() {}

  handleDataCategoriesChange() {}

  handleRequestIdChange() {}

  goToStatus(e: Event) {
    const { requestId } = (e as CustomEvent).detail;
    console.log(requestId);
    this._uiState = PRCIUIState.submittedRequests;
    this.requestId = requestId;
  }

  handleNavClick(e: Event) {
    const { value } = (e as CustomEvent).detail;
    if (value === 'create') {
      this._uiState = PRCIUIState.createRequest;
    } else {
      this._uiState = PRCIUIState.submittedRequests;
    }
  }

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has('actions')) this.handleActionsChange();
    if (_changedProperties.has('dataCategories'))
      this.handleDataCategoriesChange();
    if (_changedProperties.has('requestId')) this.handleRequestIdChange();
  }

  render() {
    return html`
      <bldn-nav-toggle
        .left=${{ label: 'Submit a Request', value: 'create' }}
        .right=${{ label: 'Submitted Requests', value: 'submitted' }}
        @bldn-nav-toggle:click=${this.handleNavClick}
      ></bldn-nav-toggle>
      ${choose(this._uiState, [
        [
          PRCIUIState.createRequest,
          () =>
            html`
              <bldn-request-builder
                api-token=${ifDefined(this.apiToken)}
                @bldn-request-builder:request-sent=${this.goToStatus}
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
        padding: 0 20%;
      }
    `,
  ];
}

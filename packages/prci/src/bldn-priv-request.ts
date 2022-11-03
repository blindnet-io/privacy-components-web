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
import './bldn-nav-wrapper.js';
import { ifDefined } from 'lit/directives/if-defined.js';

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
  @property({ type: Array }) dataCategories: string[] = [];

  /** @prop */
  @property({ type: Array }) requestId: undefined | string;

  @state() _uiState: PRCIUIState = PRCIUIState.createRequest;

  handleActionsChange() {}

  handleDataCategoriesChange() {}

  handleRequestIdChange() {}

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
        .left=${{ label: 'Submit a Request', value: 'submit' }}
        .right=${{ label: 'Submitted Requests', value: 'requests' }}
      ></bldn-nav-toggle>
      ${choose(this._uiState, [
        [
          PRCIUIState.createRequest,
          () =>
            html`
              <bldn-request-builder
                api-token=${ifDefined(this.apiToken)}
              ></bldn-request-builder>
            `,
        ],
        [
          PRCIUIState.submittedRequests,
          () => html` <bldn-submitted-requests></bldn-submitted-requests> `,
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
    `,
  ];
}

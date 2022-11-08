import { ComputationAPI, CoreConfigurationMixin, PrItem } from '@blindnet/core';
import { msg } from '@lit/localize';
import { css, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import './bldn-submitted-requests-list.js';
import './bldn-request-status.js';

const backSvg = new URL(
  './assets/icons/eva_arrow-back-outline.svg',
  import.meta.url
).href;

enum RequestsUIState {
  requestsList,
  requestStatus,
}

const filterOptions = [
  {
    value: 'all',
    display: msg('All'),
  },
  {
    value: 'pending',
    display: msg('Pending'),
  },
  {
    value: 'answered',
    display: msg('Answered'),
  },
  {
    value: 'canceled',
    display: msg('Canceled'),
  },
];

@customElement('bldn-submitted-requests')
export class BldnSubmittedRequests extends CoreConfigurationMixin(LitElement) {
  @state() _requests: PrItem[] = [];

  @state() _requestFilter: 'all' | 'pending' | 'answered' | 'canceled' = 'all';

  @state() _uiState: RequestsUIState = RequestsUIState.requestsList;

  @state() _selectedRequest: string | undefined;

  handleRequestsCategoryChange(e: Event) {
    e.stopPropagation();
    const { value } = (e as CustomEvent).detail;
    this._requestFilter = value;
  }

  handleRequestClick(e: Event) {
    e.stopPropagation();
    const { value } = (e as CustomEvent).detail;
    this._selectedRequest = value;
    this._uiState = RequestsUIState.requestStatus;
  }

  /**
   * Get submitted requests once we have a token
   */
  getRequests() {
    ComputationAPI.getInstance()
      .getRequestHistory()
      .then(submittedRequests => {
        this._requests = submittedRequests.history ?? [];
      });
  }

  getRequestsToDisplay() {
    switch (this._requestFilter) {
      case 'all':
        return this._requests;

      case 'pending':
        return this._requests.filter(
          r => r.status === PrItem.status.IN_PROCESSING
        );

      case 'answered':
        return this._requests.filter(r => r.status === PrItem.status.COMPLETED);

      case 'canceled':
        return this._requests.filter(r => r.status === PrItem.status.CANCELED);

      default:
        return this._requests;
    }
  }

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has('apiToken') && this.apiToken) this.getRequests();
  }

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();
    if (ComputationAPI.getInstance().apiTokenSet()) this.getRequests();
  }

  render() {
    return html`
      ${when(
        this._uiState === RequestsUIState.requestsList,
        () => html`
          <bldn-horizontal-list
            .choices=${filterOptions}
            @bldn-horizontal-list:choice-change=${this
              .handleRequestsCategoryChange}
          ></bldn-horizontal-list>
          <bldn-submitted-requests-list
            .requests=${this.getRequestsToDisplay()}
            @bldn-submitted-requests-list:request-click=${this
              .handleRequestClick}
          >
          </bldn-submitted-requests-list>
        `,
        () => html`
        <bldn-button mode='link-icon' underline-mode='none' @bldn-button:click=${() => {
          this._uiState = RequestsUIState.requestsList;
        }}>
          <img src=${backSvg} alt='back to requests'></img>
          <span id='back-button'><b>${msg('Back to Requests')}</b></span>
        </bldn-button>
        <bldn-request-status
          .requestId=${this._selectedRequest}
        ></bldn-request-status>
      `
      )}
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    bldn-horizontal-list {
      margin-bottom: 1.75em;
    }

    #back-button {
      color: var(--color-darkest);
    }

    bldn-request-status {
      margin-top: 1.75em;
    }
  `;
}
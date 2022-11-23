import {
  CoreConfigurationMixin,
  PrivacyRequestDemand,
  bldnStyles,
} from '@blindnet/core';
import { localized, msg } from '@lit/localize';
import { css, html, LitElement, PropertyValueMap } from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { map } from 'lit/directives/map.js';

import './bldn-request-builder.js';
import { BldnRequestModule } from './bldn-request-module.js';
import './bldn-submitted-requests.js';
import { setLocale } from './localization.js';

enum DefaultDataCategories {
  'ALL' = '*',
  'AFFILIATION' = 'AFFILIATION',
  'BEHAVIOR' = 'BEHAVIOR',
  'BIOMETRIC' = 'BIOMETRIC',
  'CONTACT' = 'CONTACT',
  'DEMOGRAPHIC' = 'DEMOGRAPHIC',
  'DEVICE' = 'DEVICE',
  'FINANCIAL' = 'FINANCIAL',
  'GENETIC' = 'GENETIC',
  'HEALTH' = 'HEALTH',
  'IMAGE' = 'IMAGE',
  'LOCATION' = 'LOCATION',
  'NAME' = 'NAME',
  'PROFILING' = 'PROFILING',
  'RELATIONSHIPS' = 'RELATIONSHIPS',
  'UID' = 'UID',
  'OTHER-DATA' = 'OTHER-DATA',
}

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
  dataCategories: string[] = Object.values(DefaultDataCategories);

  /** @prop */
  @property({ type: Array }) requestId: undefined | string;

  @state() _uiState: PRCIUIState = PRCIUIState.createRequest;

  @queryAssignedElements({ slot: 'preFormModule' })
  _preFormModules!: Array<HTMLElement>;

  @queryAssignedElements({ slot: 'postFormModule' })
  _postFormModules!: Array<HTMLElement>;

  constructor() {
    super();

    // Set locale if current one is supported
    try {
      setLocale(navigator.language);
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

  /**
   * Set the apiToken property when component catches the set event
   * @param e CustomEvent containing the token in the details object
   */
  handleApiTokenEvent(e: Event) {
    const { token } = (e as CustomEvent).detail;
    if (token) {
      this.apiToken = token;
    }
  }

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has('requestId')) this.handleRequestIdChange();
  }

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();

    this.addEventListener(
      'bldn-priv-request-api-token:set',
      this.handleApiTokenEvent
    );
  }

  disconnectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.disconnectedCallback();

    this.removeEventListener(
      'bldn-priv-request-api-token:set',
      this.handleApiTokenEvent
    );
  }

  render() {
    console.log(this._preFormModules);
    if (this._preFormModules.length > 0) {
      console.log((this._preFormModules[0] as BldnRequestModule).isValid());
    }
    return html`
      <slot name="preFormModule" slot="preFormModule"></slot>
      <slot name="postFormModule" slot="postFormModule"></slot>
      <bldn-nav-toggle
        .left=${{
          label: msg('Submit a Request'),
          value: 'create',
          checked: this._uiState === PRCIUIState.createRequest,
        }}
        .right=${{
          label: msg('Submitted Requests'),
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
              >
                ${map(this._preFormModules, module => module)}
              </bldn-request-builder>
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

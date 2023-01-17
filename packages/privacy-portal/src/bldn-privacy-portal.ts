import { CoreConfigurationMixin, PrivacyRequestDemand } from '@blindnet/core';
import { bldnStyles } from '@blindnet/core-ui';
import { localized, msg } from '@lit/localize';
import { css, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import './request-builder/bldn-request-builder.js';
import './request-viewer/bldn-request-viewer.js';
import { choose } from 'lit/directives/choose.js';
import { when } from 'lit/directives/when.js';
import { setLocale } from './localization.js';
import { BldnRequestAddon } from './request-builder/request-modules/bldn-request-addon.js';

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

enum PrivacyPortalUIState {
  createRequest,
  submittedRequests,
}

/**
 * Webcomponent for creating and monitoring privacy requests.
 *
 * @element bldn-privacy-portal
 *
 * @slot preFormAddon - A <bldn-request-addon> to occur after the action menu, before the request form
 * @slot postFormAddon - A <bldn-request-addon> to occur after the action menu, after the request form, before submitting
 *
 */
@localized()
@customElement('bldn-privacy-portal')
export class BldnPrivacyPortal extends CoreConfigurationMixin(LitElement) {
  /** @prop {Array} actions - List of allowed PRIV actions for the request builder */
  @property({ type: Array }) actions: PrivacyRequestDemand.action[] = [];

  /** @prop {Array} dataCategories - List of allowed data categories for the request builder */
  @property({ type: Array, attribute: 'data-categories' })
  dataCategories: string[] = Object.values(DefaultDataCategories);

  /**
   * @prop {Array} requestId - ID of a previous request. If set, the portal will immediately
   * display the status page for this request.
   */
  @property({ type: Array }) requestId: undefined | string;

  @state() _uiState: PrivacyPortalUIState = PrivacyPortalUIState.createRequest;

  @state() _preAddons: Element[] = [];

  @state() _postAddons: Element[] = [];

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
    this._uiState = PrivacyPortalUIState.submittedRequests;
  }

  handleRequestSent(e: Event) {
    const { requestId } = (e as CustomEvent).detail;
    this.requestId = requestId;
  }

  handleNavClick(e: Event) {
    const { value } = (e as CustomEvent).detail;
    if (value === 'create') {
      this._uiState = PrivacyPortalUIState.createRequest;
    } else {
      this.requestId = undefined;
      this._uiState = PrivacyPortalUIState.submittedRequests;
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

  handlePreAddonSlotChange(e: Event) {
    const slots = (e.target as HTMLSlotElement).assignedElements();
    // Check if any addons were slotted
    if (
      this._preAddons.length === 0 &&
      slots.length !== 0 &&
      slots.every(slot => slot instanceof BldnRequestAddon)
    ) {
      this._preAddons = slots;
    }
  }

  handlePostAddonSlotChange(e: Event) {
    const slots = (e.target as HTMLSlotElement).assignedElements();
    // Check if any addons were slotted
    if (
      this._postAddons.length === 0 &&
      slots.length !== 0 &&
      slots.every(slot => slot instanceof BldnRequestAddon)
    ) {
      this._postAddons = slots;
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
    return html`
      <bldn-nav-toggle
        .left=${{
          label: msg('Submit a Request'),
          value: 'create',
          checked: this._uiState === PrivacyPortalUIState.createRequest,
        }}
        .right=${{
          label: msg('Submitted Requests'),
          value: 'submitted',
          checked: this._uiState === PrivacyPortalUIState.submittedRequests,
        }}
        @bldn-nav-toggle:click=${this.handleNavClick}
      ></bldn-nav-toggle>
      ${choose(this._uiState, [
        [
          PrivacyPortalUIState.createRequest,
          () => html`
            <bldn-request-builder
              api-token=${ifDefined(this.apiToken)}
              data-categories=${JSON.stringify(this.dataCategories)}
              actions=${JSON.stringify(this.actions)}
              @bldn-request-builder:request-sent=${this.handleRequestSent}
            >
              ${when(
                this._preAddons.length > 0,
                () => html` ${this._preAddons} `,
                () => html`
                  <slot
                    name="preFormAddon"
                    slot="preFormAddon"
                    @slotchange=${this.handlePreAddonSlotChange}
                    ><span><!-- Default Slot Content --></span></slot
                  >
                `
              )}
              ${when(
                this._postAddons.length > 0,
                () => html` ${this._postAddons} `,
                () => html`
                  <slot
                    name="postFormAddon"
                    slot="postFormAddon"
                    @slotchange=${this.handlePostAddonSlotChange}
                    ><span><!-- Default Slot Content --></span></slot
                  >
                `
              )}
            </bldn-request-builder>
          `,
        ],
        [
          PrivacyPortalUIState.submittedRequests,
          () => html`
            <bldn-request-viewer
              request-id=${ifDefined(this.requestId)}
            ></bldn-request-viewer>
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
      bldn-request-viewer {
        margin-top: 2.5em;
      }

      bldn-request-viewer {
        padding: 0 10%;
      }
    `,
  ];
}

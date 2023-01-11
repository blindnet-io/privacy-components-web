import { css, html, LitElement, PropertyValueMap, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import {
  ComputationAPI,
  CoreConfigurationMixin,
  CreatePrivacyRequestPayload,
  PrivacyRequestDemand,
  PrivacyScopeRestriction,
} from '@blindnet/core';
import { ifDefined } from 'lit/directives/if-defined.js';

import '@blindnet/core-ui';
import './bldn-request-review.js';
import { localized } from '@lit/localize';
import { BldnRequestAddon } from './request-modules/bldn-request-addon.js';
import './action-forms/index.js';
import { ACTION_DESCRIPTIONS, ACTION_TITLES } from '../utils/dictionary.js';

/**
 * Decode a base64url string
 * @param input String to decode
 * @returns Decoded string
 */
function decode(input: string) {
  let output = (input || '').replace(/-/g, '+').replace(/_/g, '/');

  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw Error('Illegal base64url string!');
  }
  return atob(output);
}

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

enum RequestBuilderUIState {
  preModules,
  menu,
  edit,
  postModules,
  review,
}

/**
 * Interface for building privacy requests
 *
 * @event {CustomEvent} bldn-request-builder:request-created Event containing request object in details
 * @event {CustomEvent} bldn-request-builder:request-sent Event containing request ID in details.
 *     Only emitted if using with PCE.
 */
@localized()
@customElement('bldn-request-builder')
export class BldnRequestBuilder extends CoreConfigurationMixin(LitElement) {
  /** @prop */
  @property({ type: Array }) actions: PrivacyRequestDemand.action[] =
    Object.values(PrivacyRequestDemand.action);

  /** @prop */
  @property({ type: Array, attribute: 'data-categories' })
  dataCategories: string[] = Object.values(DefaultDataCategories);

  @state() _uiState: RequestBuilderUIState = RequestBuilderUIState.menu;

  @state() _action: undefined | PrivacyRequestDemand.action;

  @state() _demandGroupIndex: undefined | number;

  @state() _demandGroups: PrivacyRequestDemand[][] = [];

  @state() _allowedActions: PrivacyRequestDemand.action[] = Object.values(
    PrivacyRequestDemand.action
  );

  @state() _allowedDataCategories: string[] = [];

  @state() _preAddons: Element[] = [];

  @state() _postAddons: Element[] = [];

  @state() _currentPreAddon: number = 0;

  @state() _currentPostAddon: number = 0;

  /**
   * Factory method to get the action form for a specific action
   * @param action Action of the form to return
   * @returns Template with an action form
   */
  private getActionForm(
    action: PrivacyRequestDemand.action
  ): TemplateResult<1 | 2> {
    return html`
      ${choose(action, [
        [
          PrivacyRequestDemand.action.ACCESS,
          () => html`
            <bldn-access-form
              data-categories=${JSON.stringify(this._allowedDataCategories)}
              .demands=${this._demandGroupIndex !== undefined
                ? this._demandGroups[this._demandGroupIndex]
                : ifDefined(undefined)}
              demand-group-index=${ifDefined(this._demandGroupIndex)}
            ></bldn-access-form>
          `,
        ],
        [
          PrivacyRequestDemand.action.DELETE,
          () => html`
            <bldn-delete-form
              data-categories=${JSON.stringify(this._allowedDataCategories)}
              .demands=${this._demandGroupIndex !== undefined
                ? this._demandGroups[this._demandGroupIndex]
                : ifDefined(undefined)}
              demand-group-index=${ifDefined(this._demandGroupIndex)}
            ></bldn-delete-form>
          `,
        ],
        [
          PrivacyRequestDemand.action.MODIFY,
          () => html`
            <bldn-modify-form
              data-categories=${JSON.stringify(this._allowedDataCategories)}
              .demands=${this._demandGroupIndex !== undefined
                ? this._demandGroups[this._demandGroupIndex]
                : ifDefined(undefined)}
              demand-group-index=${ifDefined(this._demandGroupIndex)}
            ></bldn-modify-form>
          `,
        ],
        [
          PrivacyRequestDemand.action.OBJECT,
          () => html`
            <bldn-object-form
              data-categories=${JSON.stringify(this._allowedDataCategories)}
              processing-categories=${JSON.stringify(
                Object.values(PrivacyScopeRestriction.pc)
              )}
              purposes=${JSON.stringify(
                Object.values(PrivacyScopeRestriction.pp)
              )}
              .demands=${this._demandGroupIndex !== undefined
                ? this._demandGroups[this._demandGroupIndex]
                : ifDefined(undefined)}
              demand-group-index=${ifDefined(this._demandGroupIndex)}
            ></bldn-object-form>
          `,
        ],
        [
          PrivacyRequestDemand.action.PORTABILITY,
          () => html`
            <bldn-portability-form
              data-categories=${JSON.stringify(this._allowedDataCategories)}
              .demands=${this._demandGroupIndex !== undefined
                ? this._demandGroups[this._demandGroupIndex]
                : ifDefined(undefined)}
              demand-group-index=${ifDefined(this._demandGroupIndex)}
            ></bldn-portability-form>
          `,
        ],
        [
          PrivacyRequestDemand.action.RESTRICT,
          () => html`
            <bldn-restrict-form
              data-categories=${JSON.stringify(this._allowedDataCategories)}
              processing-categories=${JSON.stringify(
                Object.values(PrivacyScopeRestriction.pc)
              )}
              purposes=${JSON.stringify(
                Object.values(PrivacyScopeRestriction.pp)
              )}
              .demands=${this._demandGroupIndex !== undefined
                ? this._demandGroups[this._demandGroupIndex]
                : ifDefined(undefined)}
              demand-group-index=${ifDefined(this._demandGroupIndex)}
            ></bldn-restrict-form>
          `,
        ],
        [
          PrivacyRequestDemand.action.TRANSPARENCY,
          () => html`
            <bldn-transparency-form
              .transparencyActions=${this._allowedActions.filter(a =>
                a.includes('TRANSPARENCY')
              )}
              .demands=${this._demandGroupIndex !== undefined
                ? this._demandGroups[this._demandGroupIndex]
                : ifDefined(undefined)}
              demand-group-index=${ifDefined(this._demandGroupIndex)}
            ></bldn-transparency-form>
          `,
        ],
        [
          PrivacyRequestDemand.action.REVOKE_CONSENT,
          () => html`
            <bldn-revoke-consent-form
              data-categories=${JSON.stringify(this._allowedDataCategories)}
              .demands=${this._demandGroupIndex !== undefined
                ? this._demandGroups[this._demandGroupIndex]
                : ifDefined(undefined)}
              demand-group-index=${ifDefined(this._demandGroupIndex)}
            ></bldn-revoke-consent-form>
          `,
        ],
        [
          PrivacyRequestDemand.action.OTHER_DEMAND,
          () => html`
            <bldn-other-form
              data-categories=${JSON.stringify(this._allowedDataCategories)}
              .demands=${this._demandGroupIndex !== undefined
                ? this._demandGroups[this._demandGroupIndex]
                : ifDefined(undefined)}
              demand-group-index=${ifDefined(this._demandGroupIndex)}
            ></bldn-other-form>
          `,
        ],
      ])}
    `;
  }

  /**
   * Go to request builder after an action is clicked
   * @param e CustomEvent containing the clicked action
   */
  private selectAction(e: Event) {
    e.stopPropagation();
    const { value } = (e as CustomEvent).detail;
    if (Object.values(PrivacyRequestDemand.action).includes(value)) {
      this._action = value as PrivacyRequestDemand.action;

      // We want the request builder for a new demand group (not editing existing)
      this._demandGroupIndex = undefined;
      this._uiState = RequestBuilderUIState.preModules;
    }
  }

  /**
   * Add a new demand group or update an existing one
   * @param e CustomEvent containing demands info
   */
  private setDemands(e: Event) {
    e.stopPropagation();
    const { demandGroupIndex, demands } = (e as CustomEvent).detail;
    if (demandGroupIndex !== undefined) {
      this._demandGroups[demandGroupIndex] = demands;
    } else {
      this._demandGroups.push(demands);
    }
  }

  /**
   * Delete an existing demand group
   * @param e Event containing the index of the demand group to delete
   */
  private deleteDemands(e: Event) {
    e.stopPropagation();
    const { demandGroupIndex } = (e as CustomEvent).detail;
    this._demandGroups.splice(demandGroupIndex, 1);
    // Note: For now, we only support a single demand so when one is deleted
    // we can just open the menu
    this._uiState = RequestBuilderUIState.menu;
  }

  private editDemands(e: Event) {
    e.stopPropagation();
    const { demandGroupIndex } = (e as CustomEvent).detail;
    this._demandGroupIndex = demandGroupIndex;
    this._currentPostAddon = 0;
    this._uiState = RequestBuilderUIState.edit;
  }

  private handleReviewBack(e: Event) {
    e.stopPropagation();
    const { demandGroupIndex } = (e as CustomEvent).detail;
    this._demandGroupIndex = demandGroupIndex;
    this._uiState =
      this._postAddons.length === 0
        ? RequestBuilderUIState.edit
        : RequestBuilderUIState.postModules;
  }

  private handleSubmitRequest(e: Event) {
    e.stopPropagation();

    const { target } = (e as CustomEvent).detail;

    // Build privacy request object
    const request: CreatePrivacyRequestPayload = {
      demands: this._demandGroups.flat(),
      ...(target !== undefined && { target }),
    };

    // Add data subject if we have a token
    if (ComputationAPI.getInstance().apiTokenSet()) {
      const decodedToken = JSON.parse(decode(this.apiToken.split('.')[1]));
      request.data_subject = [
        {
          id: decodedToken.uid,
          schema: 'dsid',
        },
      ];
    }

    // Emit privacy request
    this.dispatchEvent(
      new CustomEvent('bldn-request-builder:request-created', {
        bubbles: true,
        composed: true,
        detail: {
          request,
        },
      })
    );

    // Send request and emit event with ID, if using with PCE
    if (ComputationAPI.getInstance().apiTokenSet()) {
      ComputationAPI.getInstance()
        .sendPrivacyRequest(request)
        .then(response => {
          this.dispatchEvent(
            new CustomEvent('bldn-request-builder:request-sent', {
              bubbles: true,
              composed: true,
              detail: {
                requestId: response.request_id,
              },
            })
          );
        });
    } else {
      // Reset states and go back to menu if not using with PCE
      this._action = undefined;
      this._demandGroupIndex = undefined;
      this._demandGroups = [];
      this._uiState = RequestBuilderUIState.menu;
    }
  }

  private handleBackClick(e: Event) {
    e.stopPropagation();
    if (this._preAddons.length === 0) {
      // Reset states and go back to menu
      this._action = undefined;
      this._demandGroupIndex = undefined;
      this._demandGroups = [];
      this._uiState = RequestBuilderUIState.menu;
    } else {
      // Go back to last pre-module
      this._uiState = RequestBuilderUIState.preModules;
    }
  }

  private handleReviewClick(e: Event) {
    e.stopPropagation();
    this._uiState = RequestBuilderUIState.postModules;
  }

  private handleModuleBack(e: Event) {
    e.stopPropagation();
    const moduleType = (e.composedPath()[0] as BldnRequestAddon).slot;
    if (moduleType === 'preFormAddon') {
      if (this._currentPreAddon === 0) {
        // Reset states and go back to menu
        this._action = undefined;
        this._demandGroupIndex = undefined;
        this._demandGroups = [];
        this._uiState = RequestBuilderUIState.menu;
      } else {
        this._currentPreAddon -= 1;
      }
    } else if (moduleType === 'postFormAddon') {
      if (this._currentPostAddon === 0) {
        this._uiState = RequestBuilderUIState.edit;
      } else {
        this._currentPostAddon -= 1;
      }
    }
  }

  private handleModuleNext(e: Event) {
    e.stopPropagation();
    const moduleType = (e.composedPath()[0] as BldnRequestAddon).slot;
    if (moduleType === 'preFormAddon') {
      if (this._currentPreAddon === this._preAddons.length - 1) {
        this._uiState = RequestBuilderUIState.edit;
      } else {
        this._currentPreAddon += 1;
      }
    } else if (moduleType === 'postFormAddon') {
      if (this._currentPostAddon === this._postAddons.length - 1) {
        this._uiState = RequestBuilderUIState.review;
      } else {
        this._currentPostAddon += 1;
      }
    }
  }

  private updateDataCategories() {
    // FIXME: For now, use default data categories
    // eslint-disable-next-line no-constant-condition
    if (this.apiToken && false) {
      ComputationAPI.getInstance()
        .getDataCategories()
        .then(response => {
          const allDataCategories: string[] = response.map(
            dc => dc.data_category
          );

          // Filter all possible data categories to only include those from the dataCategories property
          if (this.dataCategories.length > 0) {
            this._allowedDataCategories = allDataCategories.filter(dc =>
              this.dataCategories.includes(dc)
            );
          } else {
            // If data categories to allow was not specified, include all non-subcategories
            this._allowedDataCategories = allDataCategories.filter(
              dc => !dc.includes('.')
            );
          }
        });
    } else {
      this._allowedDataCategories = Object.values(DefaultDataCategories);
      // TODO: Set to some default data categories
    }

    // Compare all allowed data categories with those passed in
    const lowerCaseDataCategories = this.dataCategories.map(dc =>
      dc.toLowerCase()
    );
    const selectedCategories = this._allowedDataCategories.filter(
      dc => lowerCaseDataCategories.includes(dc.toLowerCase()) || dc === '*'
    );
    if (selectedCategories.length > 0) {
      this._allowedDataCategories = selectedCategories;
    }
  }

  /**
   * Filter our list of actions based on those passed in
   */
  private handleActionsChange() {
    const lowerCaseActions = this.actions.map(a => a.toLowerCase());
    const selectedActions = this._allowedActions.filter(a =>
      lowerCaseActions.includes(a.toLowerCase())
    );
    if (selectedActions.length > 0) {
      this._allowedActions = selectedActions;
    }
  }

  private handleTokenChange() {
    this.updateDataCategories();
  }

  handlePreAddonSlotChange(e: Event) {
    const slots = (e.target as HTMLSlotElement).assignedElements();
    if (slots[0] instanceof HTMLSlotElement) {
      const nestedSlots = (slots[0] as HTMLSlotElement).assignedElements();
      // Check if any modules were passed to bldn-priv-request
      if (
        this._preAddons.length === 0 &&
        nestedSlots.length !== 0 &&
        nestedSlots.every(slot => slot instanceof BldnRequestAddon)
      ) {
        this._preAddons = nestedSlots;
      }
      // Check if any modules were passed to bldn-request-builder
    } else if (
      this._preAddons.length === 0 &&
      slots.length !== 0 &&
      slots.every(slot => slot instanceof BldnRequestAddon)
    ) {
      this._preAddons = slots;
    }

    // Switch to action form if there are no modules
    if (this._preAddons.length === 0) {
      this._uiState = RequestBuilderUIState.edit;
    }
  }

  handlePostAddonSlotChange(e: Event) {
    const slots = (e.target as HTMLSlotElement).assignedElements();
    if (slots[0] instanceof HTMLSlotElement) {
      const nestedSlots = (slots[0] as HTMLSlotElement).assignedElements();
      // Check if any modules were passed to bldn-priv-request
      if (
        this._postAddons.length === 0 &&
        nestedSlots.length !== 0 &&
        nestedSlots.every(slot => slot instanceof BldnRequestAddon)
      ) {
        this._postAddons = nestedSlots;
      }
      // Check if any modules were passed to bldn-request-builder
    } else if (
      this._postAddons.length === 0 &&
      slots.length !== 0 &&
      slots.every(slot => slot instanceof BldnRequestAddon)
    ) {
      this._postAddons = slots;
    }

    // Switch to review if there are no modules
    if (this._postAddons.length === 0) {
      this._uiState = RequestBuilderUIState.review;
    }
  }

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();

    // Action menu listeners
    this.addEventListener('bldn-tile-menu:tile-click', this.selectAction);

    // Module listeners
    this.addEventListener('bldn-request-addon:back', this.handleModuleBack);
    this.addEventListener('bldn-request-addon:complete', this.handleModuleNext);

    // Action form listeners
    this.addEventListener('bldn-action-form:set-demands', this.setDemands);
    this.addEventListener('bldn-action-form:back-click', this.handleBackClick);
    this.addEventListener(
      'bldn-action-form:next-click',
      this.handleReviewClick
    );

    // Request review listeners
    this.addEventListener(
      'bldn-request-review:delete-demands',
      this.deleteDemands
    );
    this.addEventListener('bldn-request-review:edit-demands', this.editDemands);
    this.addEventListener(
      'bldn-request-review:back-click',
      this.handleReviewBack
    );
    this.addEventListener(
      'bldn-request-review:submit-request',
      this.handleSubmitRequest
    );
  }

  disconnectedCallback(): void {
    this.removeEventListener('bldn-tile-menu:tile-click', this.selectAction);
    this.removeEventListener('bldn-request-addon:back', this.handleModuleBack);
    this.removeEventListener(
      'bldn-request-addon:complete',
      this.handleModuleNext
    );
    this.removeEventListener('bldn-action-form:set-demands', this.setDemands);
    this.removeEventListener(
      'bldn-request-review:delete-demands',
      this.deleteDemands
    );
    this.removeEventListener(
      'bldn-request-review:edit-demands',
      this.editDemands
    );
    this.removeEventListener(
      'bldn-request-review:back-click',
      this.handleReviewBack
    );
    this.removeEventListener(
      'bldn-request-review:submit-request',
      this.handleSubmitRequest
    );
    this.removeEventListener(
      'bldn-action-form:back-click',
      this.handleBackClick
    );
    this.removeEventListener(
      'bldn-action-form:next-click',
      this.handleReviewClick
    );
  }

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has('actions')) this.handleActionsChange();
    if (_changedProperties.has('dataCategories')) this.updateDataCategories();
    if (_changedProperties.has('apiToken')) this.handleTokenChange();
  }

  render() {
    return html`
      ${choose(this._uiState, [
        [
          RequestBuilderUIState.menu,
          () => html`
            <bldn-tile-menu
              .tiles=${this._allowedActions
                .filter(a => !a.includes('.'))
                .map(a => ({
                  title: ACTION_TITLES[a](),
                  description: ACTION_DESCRIPTIONS[a](),
                  value: a,
                }))}
            ></bldn-tile-menu>
          `,
        ],
        [
          RequestBuilderUIState.preModules,
          () => {
            if (this._preAddons.length > 0) {
              return html`${this._preAddons[this._currentPreAddon]}`;
            }

            return html`
              <slot
                name="preFormAddon"
                @slotchange=${this.handlePreAddonSlotChange}
                ><span><!-- Default Slot Content --></span></slot
              >
            `;
          },
        ],
        [
          RequestBuilderUIState.edit,
          () =>
            this.getActionForm(
              this._action ?? PrivacyRequestDemand.action.ACCESS
            ),
        ],
        [
          RequestBuilderUIState.postModules,
          () => {
            if (this._postAddons.length > 0) {
              return html`${this._postAddons[this._currentPostAddon]}`;
            }

            return html`
              <slot
                name="postFormAddon"
                @slotchange=${this.handlePostAddonSlotChange}
                ><span><!-- Default Slot Content --></span></slot
              >
            `;
          },
        ],
        [
          RequestBuilderUIState.review,
          () => html`
            <bldn-request-review
              .demandGroups=${this._demandGroups}
            ></bldn-request-review>
          `,
        ],
      ])}
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }
  `;
}

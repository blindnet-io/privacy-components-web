import { css, html, LitElement, PropertyValueMap, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ComputationAPI, PrivacyRequestDemand } from '@blindnet/core';
import { choose } from 'lit/directives/choose.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import './bldn-tile-menu.js';
import './bldn-request-review.js';
import './action-forms/bldn-access-form.js';
import './action-forms/bldn-delete-form.js';
import './action-forms/bldn-object-form.js';
import './action-forms/bldn-restrict-form.js';
import './action-forms/bldn-revoke-consent-form.js';
import './action-forms/bldn-transparency-form.js';
import './action-forms/bldn-other-form.js';
import { ACTION_DESCRIPTIONS, ACTION_TITLES } from './utils/dictionary.js';

enum RequestBuilderUIState {
  menu,
  edit,
  review,
}

@customElement('bldn-request-builder')
export class BldnRequestBuilder extends LitElement {
  /** @prop */
  @property({ type: Array }) actions: PrivacyRequestDemand.action[] =
    Object.values(PrivacyRequestDemand.action).filter(a => !a.includes('.'));

  /** @prop */
  @property({ type: Array }) dataCategories: string[] = [];

  @state() _uiState: RequestBuilderUIState = RequestBuilderUIState.menu;

  @state() _demandGroups: PrivacyRequestDemand[][] = [];

  @state() _action: undefined | PrivacyRequestDemand.action;

  @state() _demandGroupIndex: undefined | number;

  @state() _allowedActions: PrivacyRequestDemand.action[] = [];

  @state() _allowedDataCategories: string[] = [];

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
              demands=${ifDefined(this._demandGroupIndex) ??
              this._demandGroups[this._demandGroupIndex ?? 0]}
              demand-group-index=${ifDefined(this._demandGroupIndex)}
            ></bldn-access-form>
          `,
        ],
        [
          PrivacyRequestDemand.action.DELETE,
          () => html`
            <bldn-delete-form
              data-categories=${JSON.stringify(this._allowedDataCategories)}
              demand-group-index=${ifDefined(this._demandGroupIndex)}
              demands=${ifDefined(this._demandGroupIndex) ??
              this._demandGroups[this._demandGroupIndex ?? 0]}
            ></bldn-delete-form>
          `,
        ],
        [
          PrivacyRequestDemand.action.MODIFY,
          () => html`
            <bldn-modify-form
              data-categories=${JSON.stringify(this._allowedDataCategories)}
              demand-group-index=${ifDefined(this._demandGroupIndex)}
              demands=${ifDefined(this._demandGroupIndex) ??
              this._demandGroups[this._demandGroupIndex ?? 0]}
            ></bldn-modify-form>
          `,
        ],
        [
          PrivacyRequestDemand.action.OBJECT,
          () => html`
            <bldn-object-form
              data-categories=${JSON.stringify(this._allowedDataCategories)}
              demand-group-index=${ifDefined(this._demandGroupIndex)}
              demands=${ifDefined(this._demandGroupIndex) ??
              this._demandGroups[this._demandGroupIndex ?? 0]}
            ></bldn-object-form>
          `,
        ],
        [
          PrivacyRequestDemand.action.RESTRICT,
          () => html`
            <bldn-restrict-form
              data-categories=${JSON.stringify(this._allowedDataCategories)}
              demand-group-index=${ifDefined(this._demandGroupIndex)}
              demands=${ifDefined(this._demandGroupIndex) ??
              this._demandGroups[this._demandGroupIndex ?? 0]}
            ></bldn-restrict-form>
          `,
        ],
        [
          PrivacyRequestDemand.action.TRANSPARENCY,
          () => html`
            <bldn-transparency-form
              data-categories=${JSON.stringify(this._allowedDataCategories)}
              demand-group-index=${ifDefined(this._demandGroupIndex)}
              demands=${ifDefined(this._demandGroupIndex) ??
              this._demandGroups[this._demandGroupIndex ?? 0]}
            ></bldn-transparency-form>
          `,
        ],
        [
          PrivacyRequestDemand.action.REVOKE_CONSENT,
          () => html`
            <bldn-revoke-form
              data-categories=${JSON.stringify(this._allowedDataCategories)}
              demand-group-index=${ifDefined(this._demandGroupIndex)}
              demands=${ifDefined(this._demandGroupIndex) ??
              this._demandGroups[this._demandGroupIndex ?? 0]}
            ></bldn-revoke-form>
          `,
        ],
        [
          PrivacyRequestDemand.action.OTHER,
          () => html`
            <bldn-other-form
              data-categories=${JSON.stringify(this._allowedDataCategories)}
              demand-group-index=${ifDefined(this._demandGroupIndex)}
              demands=${ifDefined(this._demandGroupIndex) ??
              this._demandGroups[this._demandGroupIndex ?? 0]}
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
      this._uiState = RequestBuilderUIState.edit;
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
  }

  private goToMenu(e: Event) {
    e.stopPropagation();
    this._uiState = RequestBuilderUIState.menu;
  }

  private goToReview(e: Event) {
    e.stopPropagation();
    this._uiState = RequestBuilderUIState.review;
  }

  private handleDataCategoriesChange() {
    ComputationAPI.getInstance()
      .getDataCategories()
      .then(response => {
        const allDataCategories: string[] = response.map(
          dc => dc.data_category
        );

        // TODO: Have some default list of data categories in case there is no PCE

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
  }

  private handleActionsChange() {}

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();

    // Action menu listeners
    this.addEventListener('bldn-tile-menu:tile-click', this.selectAction);

    // Request builder listeners
    this.addEventListener('bldn-action-form:set-demands', this.setDemands);
    this.addEventListener(
      'bldn-action-form:delete-demands',
      this.deleteDemands
    );
    this.addEventListener('bldn-action-form:back-click', this.goToMenu);
    this.addEventListener('bldn-action-form:next-click', this.goToReview);
  }

  disconnectedCallback(): void {
    this.removeEventListener('bldn-tile-menu:tile-click', this.selectAction);
    this.removeEventListener('bldn-action-form:set-demands', this.setDemands);
    this.removeEventListener(
      'bldn-action-form:delete-demands',
      this.deleteDemands
    );
    this.removeEventListener('bldn-action-form:back-click', this.goToMenu);
    this.removeEventListener('bldn-action-form:next-click', this.goToReview);
  }

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has('actions')) this.handleActionsChange();
    if (_changedProperties.has('dataCategories'))
      this.handleDataCategoriesChange();
  }

  render() {
    return html`
      ${choose(this._uiState, [
        [
          RequestBuilderUIState.menu,
          () => html`
            <bldn-tile-menu
              .tiles=${this.actions.map(a => ({
                title: ACTION_TITLES[a](),
                description: ACTION_DESCRIPTIONS[a](),
                value: a,
              }))}
            ></bldn-tile-menu>
          `,
        ],
        [
          RequestBuilderUIState.edit,
          () =>
            this.getActionForm(
              this._action ?? PrivacyRequestDemand.action.ACCESS
            ),
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
    }
  `;
}

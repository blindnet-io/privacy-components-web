import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { LitElement, html, css } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { CoreConfigurationMixin, PrivacyRequestDemand, PrivacyScopeRestriction, ComputationAPI } from '@blindnet/core';
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
import { ACTION_TITLES, ACTION_DESCRIPTIONS } from './utils/dictionary.js';

/**
 * Decode a base64url string
 * @param input String to decode
 * @returns Decoded string
 */
function decode(input) {
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
var DefaultDataCategories;
(function (DefaultDataCategories) {
    DefaultDataCategories["ALL"] = "*";
    DefaultDataCategories["AFFILIATION"] = "AFFILIATION";
    DefaultDataCategories["BEHAVIOR"] = "BEHAVIOR";
    DefaultDataCategories["BIOMETRIC"] = "BIOMETRIC";
    DefaultDataCategories["CONTACT"] = "CONTACT";
    DefaultDataCategories["DEMOGRAPHIC"] = "DEMOGRAPHIC";
    DefaultDataCategories["DEVICE"] = "DEVICE";
    DefaultDataCategories["FINANCIAL"] = "FINANCIAL";
    DefaultDataCategories["GENETIC"] = "GENETIC";
    DefaultDataCategories["HEALTH"] = "HEALTH";
    DefaultDataCategories["IMAGE"] = "IMAGE";
    DefaultDataCategories["LOCATION"] = "LOCATION";
    DefaultDataCategories["NAME"] = "NAME";
    DefaultDataCategories["PROFILING"] = "PROFILING";
    DefaultDataCategories["RELATIONSHIPS"] = "RELATIONSHIPS";
    DefaultDataCategories["UID"] = "UID";
    DefaultDataCategories["OTHER-DATA"] = "OTHER-DATA";
})(DefaultDataCategories || (DefaultDataCategories = {}));
var RequestBuilderUIState;
(function (RequestBuilderUIState) {
    RequestBuilderUIState[RequestBuilderUIState["menu"] = 0] = "menu";
    RequestBuilderUIState[RequestBuilderUIState["edit"] = 1] = "edit";
    RequestBuilderUIState[RequestBuilderUIState["review"] = 2] = "review";
})(RequestBuilderUIState || (RequestBuilderUIState = {}));
let BldnRequestBuilder = class BldnRequestBuilder extends CoreConfigurationMixin(LitElement) {
    constructor() {
        super(...arguments);
        /** @prop */
        this.actions = Object.values(PrivacyRequestDemand.action);
        /** @prop */
        this.dataCategories = [];
        this._uiState = RequestBuilderUIState.menu;
        this._demandGroups = [];
        this._allowedActions = Object.values(PrivacyRequestDemand.action);
        this._allowedDataCategories = [];
    }
    /**
     * Factory method to get the action form for a specific action
     * @param action Action of the form to return
     * @returns Template with an action form
     */
    getActionForm(action) {
        return html `
      ${choose(action, [
            [
                PrivacyRequestDemand.action.ACCESS,
                () => html `
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
                () => html `
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
                () => html `
            <bldn-other-form
              data-categories=${JSON.stringify(this._allowedDataCategories)}
              .demands=${this._demandGroupIndex !== undefined
                    ? this._demandGroups[this._demandGroupIndex]
                    : ifDefined(undefined)}
              demand-group-index=${ifDefined(this._demandGroupIndex)}
            ></bldn-other-form>
          `,
            ],
            [
                PrivacyRequestDemand.action.OBJECT,
                () => html `
            <bldn-object-form
              data-categories=${JSON.stringify(this._allowedDataCategories)}
              processing-categories=${JSON.stringify(Object.values(PrivacyScopeRestriction.pc))}
              purposes=${JSON.stringify(Object.values(PrivacyScopeRestriction.pp))}
              .demands=${this._demandGroupIndex !== undefined
                    ? this._demandGroups[this._demandGroupIndex]
                    : ifDefined(undefined)}
              demand-group-index=${ifDefined(this._demandGroupIndex)}
            ></bldn-object-form>
          `,
            ],
            [
                PrivacyRequestDemand.action.PORTABILITY,
                () => html `
            <bldn-other-form
              data-categories=${JSON.stringify(this._allowedDataCategories)}
              .demands=${this._demandGroupIndex !== undefined
                    ? this._demandGroups[this._demandGroupIndex]
                    : ifDefined(undefined)}
              demand-group-index=${ifDefined(this._demandGroupIndex)}
            ></bldn-other-form>
          `,
            ],
            [
                PrivacyRequestDemand.action.RESTRICT,
                () => html `
            <bldn-restrict-form
              data-categories=${JSON.stringify(this._allowedDataCategories)}
              processing-categories=${JSON.stringify(Object.values(PrivacyScopeRestriction.pc))}
              purposes=${JSON.stringify(Object.values(PrivacyScopeRestriction.pp))}
              .demands=${this._demandGroupIndex !== undefined
                    ? this._demandGroups[this._demandGroupIndex]
                    : ifDefined(undefined)}
              demand-group-index=${ifDefined(this._demandGroupIndex)}
            ></bldn-restrict-form>
          `,
            ],
            [
                PrivacyRequestDemand.action.TRANSPARENCY,
                () => html `
            <bldn-transparency-form
              .transparencyActions=${this._allowedActions.filter(a => a.includes('TRANSPARENCY'))}
              .demands=${this._demandGroupIndex !== undefined
                    ? this._demandGroups[this._demandGroupIndex]
                    : ifDefined(undefined)}
              demand-group-index=${ifDefined(this._demandGroupIndex)}
            ></bldn-transparency-form>
          `,
            ],
            [
                PrivacyRequestDemand.action.REVOKE_CONSENT,
                () => html `
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
                PrivacyRequestDemand.action.OTHER,
                () => html `
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
    selectAction(e) {
        e.stopPropagation();
        const { value } = e.detail;
        if (Object.values(PrivacyRequestDemand.action).includes(value)) {
            this._action = value;
            // We want the request builder for a new demand group (not editing existing)
            this._demandGroupIndex = undefined;
            this._uiState = RequestBuilderUIState.edit;
        }
    }
    /**
     * Add a new demand group or update an existing one
     * @param e CustomEvent containing demands info
     */
    setDemands(e) {
        e.stopPropagation();
        const { demandGroupIndex, demands } = e.detail;
        if (demandGroupIndex !== undefined) {
            this._demandGroups[demandGroupIndex] = demands;
        }
        else {
            this._demandGroups.push(demands);
        }
    }
    /**
     * Delete an existing demand group
     * @param e Event containing the index of the demand group to delete
     */
    deleteDemands(e) {
        e.stopPropagation();
        const { demandGroupIndex } = e.detail;
        this._demandGroups.splice(demandGroupIndex, 1);
    }
    editDemands(e) {
        e.stopPropagation();
        const { demandGroupIndex } = e.detail;
        this._demandGroupIndex = demandGroupIndex;
        this._uiState = RequestBuilderUIState.edit;
    }
    cancelRequest(e) {
        e.stopPropagation();
        // Reset states
        this._action = undefined;
        this._demandGroupIndex = undefined;
        this._demandGroups = [];
        this._uiState = RequestBuilderUIState.menu;
    }
    submitRequest(e) {
        e.stopPropagation();
        const { target } = e.detail;
        // Build privacy request object
        const request = {
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
        this.dispatchEvent(new CustomEvent('bldn-request-builder:request-created', {
            bubbles: true,
            composed: true,
            detail: {
                request,
            },
        }));
        // Send request and emit event with ID
        ComputationAPI.getInstance()
            .sendPrivacyRequest(request)
            .then(response => {
            this.dispatchEvent(new CustomEvent('bldn-request-builder:request-sent', {
                bubbles: true,
                composed: true,
                detail: {
                    requestId: response.request_id,
                },
            }));
        });
    }
    goToMenu(e) {
        e.stopPropagation();
        this._uiState = RequestBuilderUIState.menu;
    }
    goToReview(e) {
        e.stopPropagation();
        this._uiState = RequestBuilderUIState.review;
    }
    updateDataCategories() {
        // FIXME: For now, use default data categories
        // eslint-disable-next-line no-constant-condition
        if (this.apiToken && false) {
            ComputationAPI.getInstance()
                .getDataCategories()
                .then(response => {
                const allDataCategories = response.map(dc => dc.data_category);
                // Filter all possible data categories to only include those from the dataCategories property
                if (this.dataCategories.length > 0) {
                    this._allowedDataCategories = allDataCategories.filter(dc => this.dataCategories.includes(dc));
                }
                else {
                    // If data categories to allow was not specified, include all non-subcategories
                    this._allowedDataCategories = allDataCategories.filter(dc => !dc.includes('.'));
                }
            });
        }
        else {
            this._allowedDataCategories = Object.values(DefaultDataCategories);
            // TODO: Set to some default data categories
        }
        // Compare all allowed data categories with those passed in
        const lowerCaseDataCategories = this.dataCategories.map(dc => dc.toLowerCase());
        const selectedCategories = this._allowedDataCategories.filter(dc => lowerCaseDataCategories.includes(dc.toLowerCase()) || dc === '*');
        if (selectedCategories.length > 0) {
            this._allowedDataCategories = selectedCategories;
        }
    }
    /**
     * Filter our list of actions based on those passed in
     */
    handleActionsChange() {
        const lowerCaseActions = this.actions.map(a => a.toLowerCase());
        const selectedActions = this._allowedActions.filter(a => lowerCaseActions.includes(a.toLowerCase()));
        if (selectedActions.length > 0) {
            this._allowedActions = selectedActions;
        }
    }
    handleTokenChange() {
        this.updateDataCategories();
    }
    connectedCallback() {
        // eslint-disable-next-line wc/guard-super-call
        super.connectedCallback();
        // Action menu listeners
        this.addEventListener('bldn-tile-menu:tile-click', this.selectAction);
        // Request builder listeners
        this.addEventListener('bldn-action-form:set-demands', this.setDemands);
        this.addEventListener('bldn-action-form:back-click', this.goToMenu);
        this.addEventListener('bldn-action-form:next-click', this.goToReview);
        // Request review listeners
        this.addEventListener('bldn-request-review:delete-demands', this.deleteDemands);
        this.addEventListener('bldn-request-review:edit-demands', this.editDemands);
        this.addEventListener('bldn-request-review:cancel-request', this.cancelRequest);
        this.addEventListener('bldn-request-review:submit-request', this.submitRequest);
    }
    disconnectedCallback() {
        this.removeEventListener('bldn-tile-menu:tile-click', this.selectAction);
        this.removeEventListener('bldn-action-form:set-demands', this.setDemands);
        this.removeEventListener('bldn-request-review:delete-demands', this.deleteDemands);
        this.removeEventListener('bldn-request-review:edit-demands', this.editDemands);
        this.removeEventListener('bldn-request-review:cancel-request', this.cancelRequest);
        this.removeEventListener('bldn-request-review:submit-request', this.submitRequest);
        this.removeEventListener('bldn-action-form:back-click', this.goToMenu);
        this.removeEventListener('bldn-action-form:next-click', this.goToReview);
    }
    willUpdate(_changedProperties) {
        super.willUpdate(_changedProperties);
        if (_changedProperties.has('actions'))
            this.handleActionsChange();
        if (_changedProperties.has('dataCategories'))
            this.updateDataCategories();
        if (_changedProperties.has('apiToken'))
            this.handleTokenChange();
    }
    render() {
        return html `
      ${choose(this._uiState, [
            [
                RequestBuilderUIState.menu,
                () => html `
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
                RequestBuilderUIState.edit,
                () => {
                    var _a;
                    return this.getActionForm((_a = this._action) !== null && _a !== void 0 ? _a : PrivacyRequestDemand.action.ACCESS);
                },
            ],
            [
                RequestBuilderUIState.review,
                () => html `
            <bldn-request-review
              .demandGroups=${this._demandGroups}
            ></bldn-request-review>
          `,
            ],
        ])}
    `;
    }
};
BldnRequestBuilder.styles = css `
    :host {
      display: block;
      width: 100%;
    }
  `;
__decorate([
    property({ type: Array })
], BldnRequestBuilder.prototype, "actions", void 0);
__decorate([
    property({ type: Array, attribute: 'data-categories' })
], BldnRequestBuilder.prototype, "dataCategories", void 0);
__decorate([
    state()
], BldnRequestBuilder.prototype, "_uiState", void 0);
__decorate([
    state()
], BldnRequestBuilder.prototype, "_action", void 0);
__decorate([
    state()
], BldnRequestBuilder.prototype, "_demandGroupIndex", void 0);
__decorate([
    state()
], BldnRequestBuilder.prototype, "_demandGroups", void 0);
__decorate([
    state()
], BldnRequestBuilder.prototype, "_allowedActions", void 0);
__decorate([
    state()
], BldnRequestBuilder.prototype, "_allowedDataCategories", void 0);
BldnRequestBuilder = __decorate([
    customElement('bldn-request-builder')
], BldnRequestBuilder);

export { BldnRequestBuilder };
//# sourceMappingURL=bldn-request-builder.js.map

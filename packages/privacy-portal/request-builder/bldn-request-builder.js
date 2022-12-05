import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { LitElement, html, css } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { CoreConfigurationMixin, PrivacyRequestDemand, PrivacyScopeRestriction, ComputationAPI } from '@blindnet/core';
import { ifDefined } from 'lit/directives/if-defined.js';
import '@blindnet/core-ui';
import './bldn-request-review.js';
import { localized } from '@lit/localize';
import { BldnRequestAddon } from './request-modules/bldn-request-addon.js';
import './action-forms/bldn-access-form.js';
import './action-forms/bldn-delete-form.js';
import './action-forms/bldn-modify-form.js';
import './action-forms/bldn-object-form.js';
import './action-forms/bldn-portability-form.js';
import './action-forms/bldn-restrict-form.js';
import './action-forms/bldn-revoke-consent-form.js';
import './action-forms/bldn-transparency-form.js';
import './action-forms/bldn-other-form.js';
import { ACTION_TITLES, ACTION_DESCRIPTIONS } from '../utils/dictionary.js';

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
    RequestBuilderUIState[RequestBuilderUIState["preModules"] = 0] = "preModules";
    RequestBuilderUIState[RequestBuilderUIState["menu"] = 1] = "menu";
    RequestBuilderUIState[RequestBuilderUIState["edit"] = 2] = "edit";
    RequestBuilderUIState[RequestBuilderUIState["postModules"] = 3] = "postModules";
    RequestBuilderUIState[RequestBuilderUIState["review"] = 4] = "review";
})(RequestBuilderUIState || (RequestBuilderUIState = {}));
/**
 * Interface for building privacy requests
 *
 * @event {CustomEvent} bldn-request-builder:request-created Event containing request object in details
 * @event {CustomEvent} bldn-request-builder:request-sent Event containing request ID in details.
 *     Only emitted if using with PCE.
 */
let BldnRequestBuilder = class BldnRequestBuilder extends CoreConfigurationMixin(LitElement) {
    constructor() {
        super(...arguments);
        /** @prop */
        this.actions = Object.values(PrivacyRequestDemand.action);
        /** @prop */
        this.dataCategories = Object.values(DefaultDataCategories);
        this._uiState = RequestBuilderUIState.menu;
        this._demandGroups = [];
        this._allowedActions = Object.values(PrivacyRequestDemand.action);
        this._allowedDataCategories = [];
        this._preAddons = [];
        this._postAddons = [];
        this._currentPreAddon = 0;
        this._currentPostAddon = 0;
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
            this._uiState = RequestBuilderUIState.preModules;
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
        // Note: For now, we only support a single demand so when one is deleted
        // we can just open the menu
        this._uiState = RequestBuilderUIState.menu;
    }
    editDemands(e) {
        e.stopPropagation();
        const { demandGroupIndex } = e.detail;
        this._demandGroupIndex = demandGroupIndex;
        this._currentPostAddon = 0;
        this._uiState = RequestBuilderUIState.edit;
    }
    handleReviewBack(e) {
        e.stopPropagation();
        const { demandGroupIndex } = e.detail;
        this._demandGroupIndex = demandGroupIndex;
        this._uiState =
            this._postAddons.length === 0
                ? RequestBuilderUIState.edit
                : RequestBuilderUIState.postModules;
    }
    handleSubmitRequest(e) {
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
        // Send request and emit event with ID, if using with PCE
        if (ComputationAPI.getInstance().apiTokenSet()) {
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
        else {
            // Reset states and go back to menu if not using with PCE
            this._action = undefined;
            this._demandGroupIndex = undefined;
            this._demandGroups = [];
            this._uiState = RequestBuilderUIState.menu;
        }
    }
    handleBackClick(e) {
        e.stopPropagation();
        if (this._preAddons.length === 0) {
            // Reset states and go back to menu
            this._action = undefined;
            this._demandGroupIndex = undefined;
            this._demandGroups = [];
            this._uiState = RequestBuilderUIState.menu;
        }
        else {
            // Go back to last pre-module
            this._uiState = RequestBuilderUIState.preModules;
        }
    }
    handleReviewClick(e) {
        e.stopPropagation();
        this._uiState = RequestBuilderUIState.postModules;
    }
    handleModuleBack(e) {
        e.stopPropagation();
        const moduleType = e.composedPath()[0].slot;
        if (moduleType === 'preFormAddon') {
            if (this._currentPreAddon === 0) {
                // Reset states and go back to menu
                this._action = undefined;
                this._demandGroupIndex = undefined;
                this._demandGroups = [];
                this._uiState = RequestBuilderUIState.menu;
            }
            else {
                this._currentPreAddon -= 1;
            }
        }
        else if (moduleType === 'postFormAddon') {
            if (this._currentPostAddon === 0) {
                this._uiState = RequestBuilderUIState.edit;
            }
            else {
                this._currentPostAddon -= 1;
            }
        }
    }
    handleModuleNext(e) {
        e.stopPropagation();
        const moduleType = e.composedPath()[0].slot;
        if (moduleType === 'preFormAddon') {
            if (this._currentPreAddon === this._preAddons.length - 1) {
                this._uiState = RequestBuilderUIState.edit;
            }
            else {
                this._currentPreAddon += 1;
            }
        }
        else if (moduleType === 'postFormAddon') {
            if (this._currentPostAddon === this._postAddons.length - 1) {
                this._uiState = RequestBuilderUIState.review;
            }
            else {
                this._currentPostAddon += 1;
            }
        }
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
    handlePreAddonSlotChange(e) {
        const slots = e.target.assignedElements();
        if (slots[0] instanceof HTMLSlotElement) {
            const nestedSlots = slots[0].assignedElements();
            // Check if any modules were passed to bldn-priv-request
            if (this._preAddons.length === 0 &&
                nestedSlots.length !== 0 &&
                nestedSlots.every(slot => slot instanceof BldnRequestAddon)) {
                this._preAddons = nestedSlots;
            }
            // Check if any modules were passed to bldn-request-builder
        }
        else if (this._preAddons.length === 0 &&
            slots.length !== 0 &&
            slots.every(slot => slot instanceof BldnRequestAddon)) {
            this._preAddons = slots;
        }
        // Switch to action form if there are no modules
        if (this._preAddons.length === 0) {
            this._uiState = RequestBuilderUIState.edit;
        }
    }
    handlePostAddonSlotChange(e) {
        const slots = e.target.assignedElements();
        if (slots[0] instanceof HTMLSlotElement) {
            const nestedSlots = slots[0].assignedElements();
            // Check if any modules were passed to bldn-priv-request
            if (this._postAddons.length === 0 &&
                nestedSlots.length !== 0 &&
                nestedSlots.every(slot => slot instanceof BldnRequestAddon)) {
                this._postAddons = nestedSlots;
            }
            // Check if any modules were passed to bldn-request-builder
        }
        else if (this._postAddons.length === 0 &&
            slots.length !== 0 &&
            slots.every(slot => slot instanceof BldnRequestAddon)) {
            this._postAddons = slots;
        }
        // Switch to review if there are no modules
        if (this._postAddons.length === 0) {
            this._uiState = RequestBuilderUIState.review;
        }
    }
    connectedCallback() {
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
        this.addEventListener('bldn-action-form:next-click', this.handleReviewClick);
        // Request review listeners
        this.addEventListener('bldn-request-review:delete-demands', this.deleteDemands);
        this.addEventListener('bldn-request-review:edit-demands', this.editDemands);
        this.addEventListener('bldn-request-review:back-click', this.handleReviewBack);
        this.addEventListener('bldn-request-review:submit-request', this.handleSubmitRequest);
    }
    disconnectedCallback() {
        this.removeEventListener('bldn-tile-menu:tile-click', this.selectAction);
        this.removeEventListener('bldn-request-addon:back', this.handleModuleBack);
        this.removeEventListener('bldn-request-addon:complete', this.handleModuleNext);
        this.removeEventListener('bldn-action-form:set-demands', this.setDemands);
        this.removeEventListener('bldn-request-review:delete-demands', this.deleteDemands);
        this.removeEventListener('bldn-request-review:edit-demands', this.editDemands);
        this.removeEventListener('bldn-request-review:back-click', this.handleReviewBack);
        this.removeEventListener('bldn-request-review:submit-request', this.handleSubmitRequest);
        this.removeEventListener('bldn-action-form:back-click', this.handleBackClick);
        this.removeEventListener('bldn-action-form:next-click', this.handleReviewClick);
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
                RequestBuilderUIState.preModules,
                () => {
                    if (this._preAddons.length > 0) {
                        return html `${this._preAddons[this._currentPreAddon]}`;
                    }
                    return html `
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
                () => {
                    var _a;
                    return this.getActionForm((_a = this._action) !== null && _a !== void 0 ? _a : PrivacyRequestDemand.action.ACCESS);
                },
            ],
            [
                RequestBuilderUIState.postModules,
                () => {
                    if (this._postAddons.length > 0) {
                        return html `${this._postAddons[this._currentPostAddon]}`;
                    }
                    return html `
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
__decorate([
    state()
], BldnRequestBuilder.prototype, "_preAddons", void 0);
__decorate([
    state()
], BldnRequestBuilder.prototype, "_postAddons", void 0);
__decorate([
    state()
], BldnRequestBuilder.prototype, "_currentPreAddon", void 0);
__decorate([
    state()
], BldnRequestBuilder.prototype, "_currentPostAddon", void 0);
BldnRequestBuilder = __decorate([
    localized(),
    customElement('bldn-request-builder')
], BldnRequestBuilder);

export { BldnRequestBuilder };
//# sourceMappingURL=bldn-request-builder.js.map

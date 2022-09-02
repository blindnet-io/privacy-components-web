import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { css, LitElement, html } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { map } from 'lit/directives/map.js';
import { localized, msg } from '@lit/localize';
import '@lrnwebcomponents/simple-icon/lib/simple-icons.js';
import '@lrnwebcomponents/simple-icon/simple-icon.js';
import '@lrnwebcomponents/simple-icon/lib/simple-icon-button.js';
import './FrequentRequestsMenu.js';
import './ReviewView.js';
import './ActionMenu.js';
import './RequestsView.js';
import './StatusView.js';
import './demand-forms/TransparencyForm.js';
import './demand-forms/AccessForm.js';
import './demand-forms/DeleteForm.js';
import { ACTION, TARGET } from './models/priv-terms.js';
import { ComponentState } from './utils/states.js';
import { getDefaultActions, getDefaultDemands, getDefaultDemand } from './utils/utils.js';
import { buttonStyles, textStyles, containerStyles } from './styles.js';
import { PRCI_CONFIG } from './utils/conf.js';
import { sendPrivacyRequest } from './utils/privacy-request-api.js';

/**
 * Top level component encapsulating a single PrivacyRequest. Contains one or
 * more DemandBuilder elements, each for a single demand action type.
 */
let BldnPrivRequest = class BldnPrivRequest extends LitElement {
    constructor() {
        super();
        // JSON string of actions to display
        this.actions = '';
        // Array of actions, given by actions attribute if a valid list was passed, otherwise includes the 9 defaults
        this._includedActions = getDefaultActions();
        // State of the PRCI component
        this._componentState = ComponentState.MENU;
        // Currently selected action
        this._selectedAction = ACTION.TRANSPARENCY;
        // Privacy request object, empty until some demands are added
        this._privacyRequest = {
            demands: [],
            data_subject: [
                {
                    // FIXME: For now we hardcode this, but will come from token once auth added
                    id: 'fdfc95a6-8fd8-4581-91f7-b3d236a6a10e',
                    schema: 'dsid',
                },
            ],
            email: '',
            target: TARGET.PARTNERS,
        };
        // Map of demand group ids to sets of demands
        this._demands = new Map();
        this._currentDemandGroupId = '';
        this._currentRequestId = '';
        this._config = PRCI_CONFIG;
        // Initialize demands and current demand group to the same uuid
        const initialGroup = self.crypto.randomUUID();
        this._demands.set(initialGroup, []);
        this._currentDemandGroupId = initialGroup;
        // State change listener
        this.addEventListener('component-state-change', e => {
            const details = e.detail;
            this._componentState = details.newState;
            switch (this._componentState) {
                case ComponentState.EDIT:
                    this._selectedAction = details.newAction;
                    if (details.demandGroupId !== undefined) {
                        this._currentDemandGroupId = details.demandGroupId;
                    }
                    break;
                case ComponentState.SUBMITTED:
                    break;
                case ComponentState.MENU:
                    // For now, going back to the menu means we reset. This will change
                    // when supporting multiple demands.
                    this._demands.set(this._currentDemandGroupId, []);
                    break;
                case ComponentState.STATUS:
                    this._currentRequestId = details.requestId;
                    break;
            }
        });
        // Demand update listener
        this.addEventListener('demand-set-multiple', e => {
            const { demandGroupId, demands } = e.detail;
            this._demands.set(demandGroupId, demands);
        });
        this.addEventListener('demand-set', e => {
            const { demandGroupId, demand } = e.detail;
            this._demands.set(demandGroupId, [demand]);
        });
        this.addEventListener('demand-delete', e => {
            const { demandGroupId } = e.detail;
            this._demands.delete(demandGroupId);
            this.requestUpdate();
        });
        // Request target listener
        this.addEventListener('request-target-change', e => {
            const { id } = e.detail;
            this._privacyRequest.target = id;
        });
        // Submit request listener
        this.addEventListener('submit-request', () => {
            const allDemands = Array.from(this._demands.values()).reduce((dmds, dmdGroup) => dmds.concat(dmdGroup), []);
            this._privacyRequest.demands = allDemands.map((d, i) => {
                d.id = i.toString();
                return d;
            });
            sendPrivacyRequest(this._privacyRequest, false).then(response => {
                // eslint-disable-next-line no-console
                console.log(response);
                this.dispatchEvent(new CustomEvent('component-state-change', {
                    detail: {
                        newState: ComponentState.STATUS,
                        requestId: response.request_id,
                    },
                }));
            });
        });
    }
    /**
     * Reset most states
     * // TODO: Remove this and use something like getDefaultDemand() from the forms
     */
    handleRestartClick() {
        this._privacyRequest = {
            demands: [],
            data_subject: [
                {
                    // FIXME: For now we hardcode this, but will come from token once auth added
                    id: 'fdfc95a6-8fd8-4581-91f7-b3d236a6a10e',
                    schema: 'dsid',
                },
            ],
            email: '',
            target: TARGET.PARTNERS,
        };
        this._demands = new Map();
    }
    /**
     * Return a form based on action type with either default or prepopulated demand data
     * @param action PRIV action for which to return a form
     * @returns
     */
    actionFormFactory(action) {
        const currentDemand = this._demands.get(this._currentDemandGroupId);
        // Handle the transparency action case where we have multiple demands per form
        if (action === ACTION.TRANSPARENCY) {
            // Decide if we should use the default demand or not
            const multiDemand = currentDemand && currentDemand.length !== 0
                ? currentDemand
                : getDefaultDemands(action);
            return html `
        <transparency-form
          .demands=${multiDemand}
          .demandGroupId=${this._currentDemandGroupId}
          .restrictions=${multiDemand[0].restrictions}
        ></transparency-form>
      `;
        }
        // Decide if we should use the default demand or not
        const demand = currentDemand && currentDemand.length !== 0
            ? currentDemand[0]
            : getDefaultDemand(action);
        // Get the form for all other action types
        return html `
      ${choose(action, [
            [
                ACTION.ACCESS,
                () => html `
              <access-form
                .demand=${demand}
                .demandGroupId=${this._currentDemandGroupId}
                .allowedDataCategories=${this._config['access-allowed-data-categories']}
              ></access-form>
            `,
            ],
            [
                ACTION.DELETE,
                () => html `
              <delete-form
                .demand=${demand}
                .demandGroupId=${this._currentDemandGroupId}
                .allowedDataCategories=${this._config['access-allowed-data-categories']}
              ></delete-form>
            `,
            ],
            [ACTION.MODIFY, () => html ``],
            [ACTION.OBJECT, () => html ``],
            [ACTION.PORTABILITY, () => html ``],
            [ACTION.RESTRICT, () => html ``],
            [ACTION.REVOKE, () => html ``],
            [ACTION['OTHER.DEMAND'], () => html ``],
        ], () => html `${msg('Error: Invalid Action')}`)}
    `;
    }
    getHeadingString(componentState) {
        switch (componentState) {
            case ComponentState.REQUESTS:
                return html `${msg('My Submitted Privacy Request(s)')}`;
            case ComponentState.STATUS:
                return html `${msg('My Privacy Request Status')}`;
            default:
                return html `${msg('My Privacy Request')}`;
        }
    }
    // Hook into willUpdate lifecycle method to set the included actions state if a valid list of actions is passed as an attribute
    willUpdate(_changedProperties) {
        if (_changedProperties.has('actions') && this.actions) {
            try {
                const actionsList = Array.from(JSON.parse(this.actions)).map(a => a.toLocaleLowerCase());
                const validActionsList = getDefaultActions().filter(a => actionsList.includes(a.toLocaleLowerCase()));
                // If a valid list of actions has been passed, use it
                if (validActionsList.length > 0) {
                    this._includedActions = validActionsList;
                }
            }
            catch (_a) {
                this._includedActions = getDefaultActions();
            }
        }
    }
    render() {
        return html `
      <div id="prci-ctr">
        <div id="heading-ctr">
          <span class="req-hdr"
            >${this.getHeadingString(this._componentState)}</span
          >
        </div>
        ${choose(this._componentState, [
            [
                ComponentState.MENU,
                () => html `
              <div>
                <action-menu
                  .includedActions=${this._includedActions}
                ></action-menu>
              </div>
            `,
            ],
            [
                ComponentState.EDIT,
                () => html `
              <div class="medium-border view-ctr">
                ${this.actionFormFactory(this._selectedAction)}
              </div>
            `,
            ],
            [
                ComponentState.REVIEW,
                () => html `
              <div class="medium-border view-ctr">
                ${map(this._demands.entries(), ([groupId, demands]) => html `<review-view
                    .demandGroupId=${groupId}
                    .demands=${demands}
                  ></review-view>`)}
              </div>
            `,
            ],
            [
                ComponentState.REQUESTS,
                () => html ` <requests-view></requests-view> `,
            ],
            [
                ComponentState.STATUS,
                () => html ` <status-view
                request-id=${this._currentRequestId}
              ></status-view>`,
            ],
            [
                ComponentState.SUBMITTED,
                () => html `
              <p class="ctr-txt">
                <b>${msg('Your Privacy Request has been sent!')} 🎉</b>
              </p>
              <p class="ctr-txt">
                ${msg('You may track the status of your request below.')}
              </p>
            `,
            ],
            [ComponentState.AUTH, () => html ` <auth-view></auth-view> `],
        ])}
      </div>
    `;
    }
};
BldnPrivRequest.styles = [
    buttonStyles,
    textStyles,
    containerStyles,
    css `
      :host {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 16;
        background-color: white;
        text-align: left;
      }

      :host button {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }

      :host p {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        margin: 0px;
      }

      :host span {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }

      #prci-ctr {
        padding: 20px;
        max-width: 1350px;
      }

      #nav-bar {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        padding: 0px 0px 20px 0px;
      }

      #new-dmd-ctr {
        display: flex;
        column-gap: 10px;
        padding: 20px;
        align-items: center;
        justify-content: center;
      }

      #request-progress-indicator {
        background-color: red;
      }

      #frequent-requests {
        background-color: green;
      }

      #restart-btn {
        background: #fafafa;
        border: none;
        width: fit-content;
        height: fit-content;
        text-decoration: underline;
        margin: 20px 0px;
      }

      #req-sent-hdr {
        padding: 40px 0px;
      }

      #other-dmd-btn {
        margin: 20px 0px 0px 0px;
        float: right;
      }

      #heading-ctr {
        padding: 0px 0px 40px 0px;
      }

      .req-hdr {
        display: block;
        font-weight: bold;
        font-size: 24px;
        grid-column: 2/3;
        text-align: center;
      }

      .new-dmd-btn {
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }

      button:disabled {
        /* background-color: #d9d9d9; */
        background-color: #a9d1ff;
      }

      .ctr-btn {
        justify-self: center;
      }

      .demand-builder-next-btn {
        grid-column: 2/3;
        padding-bottom: -50px;
        margin-bottom: -50px;
      }

      .ctr-txt {
        text-align: center;
      }
    `,
];
__decorate([
    property({ type: String, attribute: 'actions' })
], BldnPrivRequest.prototype, "actions", void 0);
__decorate([
    state()
], BldnPrivRequest.prototype, "_includedActions", void 0);
__decorate([
    state()
], BldnPrivRequest.prototype, "_componentState", void 0);
__decorate([
    state()
], BldnPrivRequest.prototype, "_selectedAction", void 0);
__decorate([
    state()
], BldnPrivRequest.prototype, "_privacyRequest", void 0);
__decorate([
    state()
], BldnPrivRequest.prototype, "_demands", void 0);
__decorate([
    state()
], BldnPrivRequest.prototype, "_currentDemandGroupId", void 0);
__decorate([
    state()
], BldnPrivRequest.prototype, "_currentRequestId", void 0);
__decorate([
    state()
], BldnPrivRequest.prototype, "_config", void 0);
BldnPrivRequest = __decorate([
    customElement('bldn-priv-request'),
    localized()
], BldnPrivRequest);

export { BldnPrivRequest };
//# sourceMappingURL=BldnPrivRequest.js.map

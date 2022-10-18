import { CoreConfigurationMixin, PrivacyRequestDemand } from "@blindnet/core";
import { localized } from "@lit/localize";
import { css, html, LitElement, PropertyValueMap } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { choose } from "lit/directives/choose.js";

enum PRCIUIState {
  createRequest,
  submittedRequests
}

@localized()
@customElement('bldn-priv-request')
export class BldnPrivRequest extends CoreConfigurationMixin(LitElement) {
  
  /** @prop */
  @property({ type: Array }) actions: PrivacyRequestDemand.action[] = []

  /** @prop */
  @property({ type: Array }) dataCategories: string[] = []

  /** @prop */
  @property({ type: Array }) requestId: undefined | string

  @state() _uiState: PRCIUIState = PRCIUIState.createRequest

  @state() _allowedActions: PrivacyRequestDemand.action[] = []

  @state() _allowedDataCategories: string[] = []

  handleActionsChange() {

  }

  handleDataCategoriesChange() {

  }

  handleRequestIdChange() {

  }

  protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('actions')) this.handleActionsChange()
    if (_changedProperties.has('dataCategories')) this.handleDataCategoriesChange()
    if (_changedProperties.has('requestId')) this.handleRequestIdChange()
  }

  render() {
    return html`
      <bldn-nav-toggle .left=${{label: 'Submit a Request', value: 'submit'}} .right=${{label: 'Submitted Requests', value: 'requests'}}></bldn-nav-toggle>
      ${choose(this._uiState, [
        [PRCIUIState.createRequest, () => html`
          <bldn-request-builder></bldn-request-builder>
        `],
        [PRCIUIState.submittedRequests, () => html`
          <bldn-submitted-requests></bldn-submitted-requests>
        `],
      ])}
    `
  }

  static styles = css`
    h1 {
      font-size: var(--font-size-large);
    }

    h2 {
      font-size: var(--font-size-medium);
    }

    h3 {
      font-size: var(--font-size-large);
    }
  `

}

// import { html, css, LitElement, PropertyValueMap, TemplateResult } from 'lit';
// import { customElement, property, state } from 'lit/decorators.js';
// import { choose } from 'lit/directives/choose.js';
// import { map } from 'lit/directives/map.js';
// import { localized, msg } from '@lit/localize';
// import {
//   DATA_CATEGORY,
//   TARGET,
//   Demand,
//   PrivacyRequest,
//   ComputationAPI,
//   CoreConfigurationMixin,
//   ACTION,
// } from '@blindnet/core';
// import { ComponentState } from './utils/states.js';
// import {
//   getDefaultActions,
//   getDefaultDataCategories,
//   getDefaultDemands,
// } from './utils/utils.js';
// import { PRCI_CONFIG } from './utils/conf.js';
// import { PRCIStyles } from './styles.js';

// import './FrequentRequestsMenu.js';
// import './ReviewView.js';
// import './ActionMenuView.js';
// import './RequestsView.js';
// import './StatusView.js';
// import './demand-forms/TransparencyForm.js';
// import './demand-forms/AccessForm.js';
// import './demand-forms/DeleteForm.js';
// import './demand-forms/RevokeConsentForm.js';

// enum PRCIUIState {
//   actionMenu,
//   buildRequest,
//   reviewRequest,
//   requestsList,
//   requestStatus
// }

// /** */
// @customElement('bldn-priv-request')
// @localized()
// export class BldnPrivRequest extends CoreConfigurationMixin(LitElement) {
//   /** JSON list of allowed actions */
//   @property({ type: String }) actions = '';

//   /** JSON list of allowed data categories */
//   @property({ type: String, attribute: 'data-categories' })
//   dataCategories: string = '';

//   /** @prop {string} requestId - a request ID. If provided, the initial PRCI view will be the status page for the provided request ID */
//   @property({ type: String, attribute: 'request-id' }) requestId: string = '';

//   // Array of available actions, given by actions property if a valid list was passed
//   @state() _includedActions: ACTION[] = getDefaultActions();

//   // Array of available data categories, given by dataCategories property if a valid list was passed
//   @state() _includedDataCategories: DATA_CATEGORY[] =
//     getDefaultDataCategories();

//   // @state() _currentRequestId: string = '';

//   // @state() _currentDemandGroupId: string = '';

//   // @state() _currentAction: ACTION = ACTION.TRANSPARENCY;

//   // Privacy request object, empty until some demands are added
//   @state() _privacyRequest: PrivacyRequest = {
//     demands: [],
//     data_subject: [
//       {
//         // FIXME: For now we hardcode this, but will come from token once auth added
//         // id: 'fdfc95a6-8fd8-4581-91f7-b3d236a6a10e',
//         // TODO: remove this when auth is implemented
//         id: localStorage.getItem('priv_user_id') || 'john.doe@example.com',
//         schema: 'dsid',
//       },
//     ],
//     email: '',
//     target: TARGET.PARTNERS,
//   };

//   // Map of demand group ids to sets of demands
//   @state() _demands: Map<string, Demand[]> = new Map<string, Demand[]>();

//   @state() _config = PRCI_CONFIG;

//   // UI state indicating which view to show
//   @state() _componentState: ComponentState = ComponentState.MENU;

//   constructor() {
//     super();

//     const params = new URLSearchParams(window.location.search);
//     const requestId = params.get('requestId');
//     if (requestId) {
//       this._currentRequestId = requestId;
//       this._componentState = ComponentState.STATUS;
//     }

//     // Initialize demands and current demand group to the same uuid
//     const initialGroup = crypto.randomUUID();
//     this._demands.set(initialGroup, []);
//     this._currentDemandGroupId = initialGroup;

//     // State change listener
//     this.addEventListener('component-state-change', e => {
//       const details = (e as CustomEvent).detail;
//       this._componentState = details.newState;

//       switch (this._componentState) {
//         case ComponentState.EDIT:
//           this._currentAction = details.newAction;
//           if (details.demandGroupId !== undefined) {
//             this._currentDemandGroupId = details.demandGroupId;
//           }
//           break;
//         case ComponentState.SUBMITTED:
//           break;
//         case ComponentState.MENU:
//           // For now, going back to the menu means we reset. This will change
//           // when supporting multiple demands.
//           this._demands.set(this._currentDemandGroupId, []);
//           break;
//         case ComponentState.STATUS:
//           this._currentRequestId = details.requestId;
//           break;
//         default:
//           break;
//       }
//     });
//   }

//   private setMultipleDemands = (e: Event) => {
//     if (e instanceof CustomEvent) {
//       const { demandGroupId, demands } = e.detail;
//       this._demands.set(demandGroupId, demands);
//     }
//   };

//   private setDemand = (e: Event) => {
//     if (e instanceof CustomEvent) {
//       const { demandGroupId, demand } = e.detail;
//       this._demands.set(demandGroupId, [demand]);
//     }
//   };

//   private deleteDemand = (e: Event) => {
//     if (e instanceof CustomEvent) {
//       const { demandGroupId } = e.detail;
//       this._demands.delete(demandGroupId);
//       this.requestUpdate();
//     }
//   };

//   private changeRequestTarget = (e: Event) => {
//     if (e instanceof CustomEvent) {
//       const { id } = e.detail;
//       this._privacyRequest.target = id as TARGET;
//     }
//   };

//   private submitRequest = async () => {
//     const allDemands = Array.from(this._demands.values()).reduce(
//       (dmds, dmdGroup) => dmds.concat(dmdGroup),
//       []
//     );
//     this._privacyRequest.demands = allDemands.map((d, i) => {
//       // eslint-disable-next-line no-param-reassign
//       d.id = i.toString();
//       return d;
//     });

//     const response = await ComputationAPI.getInstance().sendPrivacyRequest(
//       this._privacyRequest
//     );

//     this.dispatchEvent(
//       new CustomEvent('component-state-change', {
//         detail: {
//           newState: ComponentState.STATUS,
//           requestId: response.request_id,
//         },
//       })
//     );
//   };

//   connectedCallback(): void {
//     // eslint-disable-next-line wc/guard-super-call
//     super.connectedCallback();

//     // Demand update listener
//     this.addEventListener('demand-set-multiple', this.setMultipleDemands);
//     this.addEventListener('demand-set', this.setDemand);
//     this.addEventListener('demand-delete', this.deleteDemand);

//     // Request target listener
//     this.addEventListener('request-target-change', this.changeRequestTarget);

//     // Submit request listener
//     this.addEventListener('submit-request', this.submitRequest);
//   }

//   disconnectedCallback(): void {
//     this.removeEventListener('demand-set-multiple', this.setMultipleDemands);
//     this.removeEventListener('demand-set', this.setDemand);
//     this.removeEventListener('demand-delete', this.deleteDemand);
//     this.removeEventListener('request-target-change', this.changeRequestTarget);
//     this.removeEventListener('submit-request', this.submitRequest);
//   }

//   /**
//    * Reset most states
//    * // TODO: Remove this and use something like getDefaultDemand() from the forms
//    */
//   handleRestartClick() {
//     this._privacyRequest = {
//       demands: [],
//       data_subject: [
//         {
//           // FIXME: For now we hardcode this, but will come from token once auth added
//           // id: 'fdfc95a6-8fd8-4581-91f7-b3d236a6a10e',
//           // TODO: remove this when auth is implemented
//           id: localStorage.getItem('priv_user_id') || 'john.doe@example.com',
//           schema: 'dsid',
//         },
//       ],
//       email: '',
//       target: TARGET.PARTNERS,
//     };
//     this._demands = new Map<string, Demand[]>();
//   }

//   /**
//    * Return a form based on action type with either default or prepopulated demand data
//    * @param action PRIV action for which to return a form
//    * @returns
//    */
//   actionFormFactory(action: ACTION) {
//     const demandGroup = this._demands.get(this._currentDemandGroupId);

//     // Use one of the multi demand forms
//     if (action === ACTION.TRANSPARENCY) {
//       // Decide if we should use the default demand or not
//       const multiDemand =
//         demandGroup && demandGroup.length !== 0
//           ? demandGroup
//           : getDefaultDemands(action);
//       return html`
//         <transparency-form
//           .demands=${multiDemand}
//           .demandGroupId=${this._currentDemandGroupId}
//           .restrictions=${multiDemand[0].restrictions}
//         ></transparency-form>
//       `;
//     }

//     // Use one of the single demand forms
//     const demand =
//       demandGroup && demandGroup.length !== 0 ? demandGroup[0] : undefined;
//     const useDefault = !demandGroup || demandGroup.length === 0;
//     // Get the form for all other action types
//     return html`
//       ${choose(
//         action,
//         [
//           [
//             ACTION.ACCESS,
//             () => html`
//               <access-form
//                 .demand=${demandGroup ?? ''}
//                 .demandGroupId=${this._currentDemandGroupId}
//                 .allowedDataCategories=${this._includedDataCategories}
//                 .default=${useDefault}
//               ></access-form>
//             `,
//           ],
//           [
//             ACTION.DELETE,
//             () => html`
//               <delete-form
//                 .demand=${demand}
//                 .demandGroupId=${this._currentDemandGroupId}
//                 .allowedDataCategories=${this._includedDataCategories}
//                 .default=${useDefault}
//               ></delete-form>
//             `,
//           ],
//           [ACTION.MODIFY, () => html``],
//           [ACTION.OBJECT, () => html``],
//           [ACTION.PORTABILITY, () => html``],
//           [ACTION.RESTRICT, () => html``],
//           [
//             ACTION.REVOKE,
//             () => html`
//               <revoke-consent-form
//                 .demand=${demand}
//                 .demandGroupId=${this._currentDemandGroupId}
//               ></revoke-consent-form>
//             `,
//           ],
//           [ACTION['OTHER.DEMAND'], () => html``],
//         ],
//         () => html`${msg('Error: Invalid Action')}`
//       )}
//     `;
//   }

//   getHeadingString(componentState: ComponentState): TemplateResult<1 | 2> {
//     switch (componentState) {
//       case ComponentState.REQUESTS:
//         return html`${msg('My Submitted Privacy Request(s)')}`;
//       case ComponentState.STATUS:
//         return html`${msg('My Privacy Request Status')}`;
//       default:
//         return html`${msg('My Privacy Request')}`;
//     }
//   }

//   // Hook into willUpdate lifecycle method to set the included actions state if a valid list of actions is passed as an attribute
//   protected willUpdate(
//     _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
//   ): void {
//     super.willUpdate(_changedProperties);
//     if (_changedProperties.has('actions') && this.actions) {
//       try {
//         // Select the valid actions from those passed in
//         const actionsList = (
//           Array.from(JSON.parse(this.actions)) as string[]
//         ).map(a => a.toLocaleLowerCase());
//         const validActionsList = getDefaultActions().filter(a =>
//           actionsList.includes(a.toLocaleLowerCase())
//         );
//         // If any valid actions were passed in, use them
//         if (validActionsList.length > 0) {
//           this._includedActions = validActionsList;
//         }
//       } catch {
//         this._includedActions = getDefaultActions();
//       }
//     }

//     if (_changedProperties.has('dataCategories') && this.dataCategories) {
//       try {
//         // Select the valid data categories from those passed in
//         const dataCategoriesList = (
//           Array.from(JSON.parse(this.dataCategories)) as string[]
//         ).map(dc => dc.toLocaleLowerCase());
//         const validDataCategories = getDefaultDataCategories().filter(dc =>
//           dataCategoriesList.includes(dc.toLocaleLowerCase())
//         );
//         // If any valid data categories were passed in, use them
//         if (validDataCategories.length > 0) {
//           this._includedDataCategories = validDataCategories;
//         }
//       } catch {
//         this._includedDataCategories = getDefaultDataCategories();
//       }
//     }
//   }

//   render() {
//     return html`
//       <bldn-nav-toggle .left=${{label: 'Submit a Request', value: 'submit'}} .right=${{label: 'Submitted Requests', value: 'requests'}}></bldn-nav-toggle>
//       ${choose(this._uiState, [
//         [PRCIUIState.actionMenu, () => html`
//           <bldn-tile-menu></bldn-tile-menu>
//         `],
//         [PRCIUIState.buildRequest, () => html`
//           <bldn-nav-wrapper left-button='Back' right-button='Next'>
//             <bldn-request-builder>
//               <slot name='pre-request-module'></slot> 
//               <slot name='post-request-module'></slot>
//             </bldn-request-builder>
//           </bldn-nav-wrapper>

//           <bldn-request-builder mode='build'>
//             <slot name='pre-request-module'></slot> 
//             <slot name='post-request-module'></slot>
//           </bldn-request-builder>
//         `],
//         [PRCIUIState.reviewRequest, () => html`
//           <bldn-nav-wrapper mode='single' center-button='Submit'>
//             <bldn-request-review></bldn-request-review>
//           </bldn-nav-wrapper>

//           <bldn-request-builder mode='review'>
//             <slot name='post-request-module'></slot>
//           </bldn-request-builder>
//         `],
//         [PRCIUIState.requestsList, () => html`
//           <bldn-submitted-requests></bldn-submitted-requests>
//         `],
//         [PRCIUIState.requestStatus, () => html`
//           <bldn-request-status></bldn-request-status>
//         `],
//       ])}
//     `
//   }

//   render() {
//     return html`
//       <div id="prci-ctr">
//         <div id="heading-ctr">
//           <span class="req-hdr"
//             >${this.getHeadingString(this._componentState)}</span
//           >
//         </div>
//         ${choose(this._componentState, [
//           [
//             ComponentState.MENU,
//             () => html`
//               <div>
//                 <action-menu-view
//                   .includedActions=${this._includedActions}
//                 ></action-menu-view>
//               </div>
//             `,
//           ],
//           [
//             ComponentState.EDIT,
//             () => html`
//               <div class="border--medium border--rounded view-ctr">
//                 ${this.actionFormFactory(this._currentAction)}
//               </div>
//             `,
//           ],
//           [
//             ComponentState.REVIEW,
//             () => html`
//               <div class="border--medium border--rounded view-ctr">
//                 ${map(
//                   this._demands.entries(),
//                   ([groupId, demands]) => html`<review-view
//                     .demandGroupId=${groupId}
//                     .demands=${demands}
//                   ></review-view>`
//                 )}
//               </div>
//             `,
//           ],
//           [
//             ComponentState.REQUESTS,
//             () => html`<requests-view></requests-view>`,
//           ],
//           [
//             ComponentState.STATUS,
//             () => html` <status-view
//               request-id=${this._currentRequestId}
//             ></status-view>`,
//           ],
//           [
//             ComponentState.SUBMITTED,
//             () => html`
//               <p>
//                 <b>${msg('Your Privacy Request has been sent!')} 🎉</b>
//               </p>
//               <p>${msg('You may track the status of your request below.')}</p>
//             `,
//           ],
//           [ComponentState.AUTH, () => html` <auth-view></auth-view> `],
//         ])}
//       </div>
//     `;
//   }

//   static styles = [
//     PRCIStyles,
//     css`
//       :host {     
    
//         display: flex;
//         justify-content: center;
//         justify-items: center;

//         font-family: var(
//           --prci-font-family,
//           -apple-system,
//           BlinkMacSystemFont,
//           'Segoe UI',
//           Roboto,
//           Oxygen,
//           Ubuntu,
//           Cantarell,
//           'Open Sans',
//           'Helvetica Neue',
//           sans-serif
//         );
//         color: var(--prci-font-color, #000000);
//         font-size: 16;
//         text-align: left;
//       }

//       #prci-ctr {
//         padding: 20px;
//         max-width: 1350px;
//       }

//       #heading-ctr {
//         padding: 0px 0px 40px 0px;
//         max-width: 1170px;
//       }

//       .req-hdr {
//         display: block;
//         font-weight: bold;
//         font-size: 24px;
//         grid-column: 2/3;
//         text-align: center;
//       }

//       button:disabled {
//         background-color: #a9d1ff;
//       }

//       h1 {
//        font-size: var(--font-size-large);
//       }

//       h2 {
//         font-size: var(--font-size-medium);
//       }

//       h3 {
//         font-size: var(--font-size-large);
//       }
//     `,
//   ];
// }

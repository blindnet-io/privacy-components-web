import {
  CreatePrivacyRequestPayload,
  PrivacyRequestDemand,
  PrivacyScopeRestriction,
} from '@blindnet/core';
import { msg } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

import './bldn-nav-wrapper.js';
import './bldn-dropdown.js';
import './bldn-radio-list.js';
import {
  DATA_CATEGORY_DESCRIPTIONS,
  TARGET_DESCRIPTIONS,
} from './utils/dictionary.js';

const editSvg = new URL('./assets/icons/akar-icons_edit.svg', import.meta.url)
  .href;

const deleteSvg = new URL(
  './assets/icons/akar-icons_trash-can.svg',
  import.meta.url
).href;

/**
 * @event {CustomEvent} bldn-request-review:edit-demands
 * @event {CustomEvent} bldn-request-review:delete-demands
 * @event {Event} bldn-request-review:cancel-request'
 * @event {Event} bldn-request-review:submit-request'
 */
@customElement('bldn-request-review')
export class BldnRequestReview extends LitElement {
  /** @prop */
  @property({ type: Array }) demandGroups: PrivacyRequestDemand[][] = [];

  getDataCategoryListTemplate(
    privacyScopes: undefined | PrivacyScopeRestriction[]
  ) {
    return html`
      ${when(
        privacyScopes,
        () => html`
          <ul>
            ${map(
              privacyScopes,
              scope => html`
                <li>
                  ${scope.dc === '*'
                    ? DATA_CATEGORY_DESCRIPTIONS[scope.dc]()
                    : html`<b>${scope.dc} Data:</b>
                        ${DATA_CATEGORY_DESCRIPTIONS[scope.dc]()}`}
                </li>
              `
            )}
          </ul>
        `,
        () => html` <p>${msg('No data categories selected!')}</p> `
      )}
    `;
  }

  getReviewTemplate(demandGroup: PrivacyRequestDemand[]) {
    if (demandGroup.length > 0) {
      return html`
        ${choose(
          demandGroup[0].action,
          [
            [
              PrivacyRequestDemand.action.ACCESS,
              () => html`
                <p>${msg('I want to access:')}</p>
                ${this.getDataCategoryListTemplate(
                  demandGroup[0].restrictions?.privacy_scope
                )}
              `,
            ],
            [
              PrivacyRequestDemand.action.DELETE,
              () => html`
                <p>${msg('I want to delete:')}</p>
                ${this.getDataCategoryListTemplate(
                  demandGroup[0].restrictions?.privacy_scope
                )}
              `,
            ],
            [PrivacyRequestDemand.action.MODIFY, () => html``],
            [PrivacyRequestDemand.action.OBJECT, () => html``],
            [PrivacyRequestDemand.action.RESTRICT, () => html``],
            [PrivacyRequestDemand.action.REVOKE_CONSENT, () => html``],
            [PrivacyRequestDemand.action.OTHER, () => html``],
          ],
          () => html`
            <!-- Transparency Template -->
            ${when(
              demandGroup[0].action.includes('TRANSPARENCY'),
              () => html``
            )}
          `
        )}
      `;
    }

    return html`${msg('No demands to review!')}`;
  }

  handleEditDemandGroupClick(demandGroupIndex: number) {
    this.dispatchEvent(
      new CustomEvent('bldn-request-review:edit-demands', {
        bubbles: true,
        composed: true,
        detail: {
          demandGroupIndex,
        },
      })
    );
  }

  handleDeleteDemandGroupClick(demandGroupIndex: number) {
    this.dispatchEvent(
      new CustomEvent('bldn-request-review:delete-demands', {
        bubbles: true,
        composed: true,
        detail: {
          demandGroupIndex,
        },
      })
    );
  }

  handleCancelClick() {
    this.dispatchEvent(
      new Event('bldn-request-review:cancel-request', {
        bubbles: true,
        composed: true,
      })
    );
  }

  handleSubmitClick() {
    this.dispatchEvent(
      new Event('bldn-request-review:submit-request', {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <bldn-nav-wrapper
        left-button="Cancel Request"
        right-button="Submit Request"
        @bldn-nav-wrapper:left-click=${this.handleCancelClick}
        @bldn-nav-wrapper:right-click=${this.handleSubmitClick}
      >
        <bldn-dropdown class="main-section" mode="major">
          <span slot="heading"><strong>${msg('Request Summary')}</strong></span>
          ${map(
            this.demandGroups,
            (group, i) => html`
              ${when(
                group.length > 0,
                () => html`
                  <bldn-dropdown>
                    <span slot="heading"
                      ><strong
                        >${group[0].action} ${msg('Demand')}</strong
                      >
                      <button class='img-button' @click=${() =>
                        this.handleEditDemandGroupClick(i)}>
                        <img src=${editSvg} alt='edit demand group'></img>
                      </button>
                      <button class='img-button' @click=${() =>
                        this.handleDeleteDemandGroupClick(i)}>
                        <img src=${deleteSvg} alt='delete demand group'></img>
                      </button>
                    </span>
                    ${this.getReviewTemplate(group)}
                  </bldn-dropdown>
                `
              )}
            `
          )}
        </bldn-dropdown>
        <bldn-dropdown id="request-target" class="main-section" mode="major">
          <span slot="heading"><strong>${msg('Request Target')}</strong></span>
          <p>${msg('I address my Privacy Request to:')}</p>
          <bldn-radio-list
            .choices=${Object.values(CreatePrivacyRequestPayload.target).map(
              target => ({
                display: TARGET_DESCRIPTIONS[target](),
                value: target,
                selected:
                  target === CreatePrivacyRequestPayload.target.PARTNERS,
              })
            )}
          ></bldn-radio-list>
        </bldn-dropdown>
      </bldn-nav-wrapper>
    `;
  }

  static styles = css`
    /* TODO: Update styles below so variables, etc. are unique to this component */

    :host {
      color: var(--bldn-request-review-font-color, var(--color-dark));
      text-align: left;
    }

    #request-target bldn-radio-list {
      padding-left: 1em;
    }

    li {
      margin: 1em 0;
    }

    .img-button {
      border: none;
      background: none;
    }

    bldn-dropdown.main-section {
      border: 2px solid
        var(--bldn-request-review-section-border-color, var(--color-light));
      border-radius: 20px;
      padding: 2.5em;
    }

    bldn-dropdown.main-section[open] {
      padding: 2.5em 2.5em 0.5em 2.5em;
    }

    bldn-dropdown.main-section:hover {
      border: 2px solid
        var(
          --bldn-request-review-section-border-color-hovered,
          var(--color-dark)
        );
      /* FIXME: This makes the border expansion jump weird */
      /* transition: 0.3s ease; */
    }

    bldn-dropdown span {
      display: inline-flex;
      align-items: center;
    }

    /* Font for main sections: Demand Details and Other Options */
    bldn-dropdown.main-section > span {
      font-size: var(
        --bldn-request-review-section-heading-font-size,
        var(--font-size-medium)
      );
      color: var(
        --bldn-request-review-section-heading-font-color,
        var(--color-dark)
      );
    }

    /* Padding in each other option dropdown */
    bldn-dropdown bldn-dropdown[open] {
      padding-bottom: 1em;
    }

    /* Font for other options headings */
    bldn-dropdown bldn-dropdown span {
      font-size: var(--font-size-small);
      color: var(
        --bldn-request-review-subsection-heading-font-color,
        var(--color-dark)
      );
    }

    /* Divider between other options dropdowns */
    bldn-dropdown {
      border-bottom: 2px solid
        var(
          --bldn-request-review-subsection-divider-color,
          var(--color-lightest)
        );
    }

    /* Last dropdown in other options should have no border */
    bldn-dropdown bldn-dropdown:last-child {
      border-bottom: none;
    }

    bldn-nav-wrapper {
      padding: 2.813em 2.813em 0em 2.813em;
    }
  `;
}

// /* eslint-disable lit/binding-positions */
// import { msg } from '@lit/localize';
// import { css, html, LitElement, PropertyValueMap } from 'lit';
// import { customElement, property, state } from 'lit/decorators.js';
// import { choose } from 'lit/directives/choose.js';
// import { map } from 'lit/directives/map.js';
// import { when } from 'lit/directives/when.js';
// import {
//   ACTION,
//   DATA_CATEGORY,
//   PROVENANCE,
//   TARGET,
//   Demand,
// } from '@blindnet/core';
// import { PRCIStyles } from './styles.js';
// import {
//   ACTION_DESCRIPTIONS,
//   ACTION_TITLES,
//   DATA_CATEGORY_DESCRIPTIONS,
//   PROVENANCE_DESCRIPTIONS,
//   TARGET_DESCRIPTIONS,
// } from './utils/dictionary.js';
// import { ComponentState } from './utils/states.js';

// const editSvg = new URL('./assets/icons/edit-fill.svg', import.meta.url).href;

// const trashSvg = new URL('./assets/icons/delete.svg', import.meta.url).href;

// @customElement('review-view')
// export class ReviewView extends LitElement {
//   static styles = [
//     PRCIStyles,
//     css`
//       :host {
//         display: grid;
//       }

//       :host([confirm-delete]) .dmd-review-ctr {
//         background: #c4c4c4;
//         opacity: 0.7;
//       }

//       #review-heading-row {
//         display: grid;
//         grid-area: 1/1/2/2;
//         grid-template-columns: repeat(2, 1fr);
//         z-index: 2;
//       }

//       .dmd-review-ctr {
//         display: grid;
//         padding: 40px;
//       }

//       #review-btns {
//         display: flex;
//         flex-direction: row;
//         justify-content: flex-end;
//         column-gap: 20px;
//       }

//       .review-btn {
//         width: 24px;
//         height: 24px;
//       }

//       #review-content {
//         display: grid;
//         grid-area: 2/1/3/2;
//         z-index: 1;
//       }

//       .extra-msg-txt {
//         padding: 0px 0px 0px 20px;
//       }

//       .review-list li:not(:last-child) {
//         margin: 0px 0px 20px 0px;
//       }

//       .review-list {
//         margin: 0px;
//       }

//       #request-settings {
//         margin: 20px 0px 0px 0px;
//       }

//       #delete-confirm-popup {
//         display: grid;
//         row-gap: 20px;
//         background: white;
//         padding: 40px;
//         z-index: 2;
//         grid-area: 1/1/3/2;
//         justify-self: center;
//         align-self: center;
//         width: 40%;
//         height: 150px;
//       }

//       .popup-txt {
//         text-align: center;
//       }

//       #popup-btns-ctr {
//         display: flex;
//         column-gap: 50px;
//         justify-content: center;
//       }

//       .popup-btn {
//         min-width: 30%;
//         max-width: 200px;
//         /* width: 30%; */
//         font-size: 18px;
//       }

//       #confirm-delete-btn {
//         background: red;
//         color: white;
//         border: none;
//       }

//       #cancel-delete-btn {
//         background: white;
//         color: black;
//         border: 2px solid #18a0fb;
//       }

//       #submit-btn {
//         transform: translateY(35px);
//       }

//       h2,
//       h3 {
//         margin-top: 0px;
//       }

//       h4 {
//         font-weight: normal;
//       }
//     `,
//   ];

//   @property({ attribute: false }) demandGroupId: string = '';

//   @property({ attribute: false }) demands: Demand[] = [];

//   @property({ attribute: false }) demand: Demand = { action: ACTION.ACCESS };

//   @property({ type: Boolean, reflect: true, attribute: 'confirm-delete' })
//   confirmDelete: boolean = false;

//   @property({ attribute: false }) target: TARGET = TARGET.PARTNERS;

//   @state() _action: ACTION = ACTION.ACCESS;

//   getAccessReviewTemplate() {
//     const from = this.demand.restrictions?.date_range?.from;
//     const to = this.demand.restrictions?.date_range?.to;
//     const provenance = this.demand.restrictions?.provenance;
//     const privacyScope = this.demand.restrictions?.privacy_scope;
//     return html`
//       <h4>${msg('I want to access:')}</h4>
//       <ul id="access-review-list" class="review-list">
//         ${when(
//           privacyScope &&
//             Object.values(DATA_CATEGORY)
//               .filter(dc => !dc.includes('.') && dc !== DATA_CATEGORY.ALL)
//               .every(dc => privacyScope.map(psr => psr.dc).includes(dc)),
//           () => html`
//             <li>${DATA_CATEGORY_DESCRIPTIONS[DATA_CATEGORY.ALL]()}</li>
//           `,
//           () => html`
//             ${map(
//               this.demand.restrictions?.privacy_scope,
//               psr => html`<li>${DATA_CATEGORY_DESCRIPTIONS[psr.dc]()}</li> `
//             )}
//           `
//         )}
//       </ul>
//       ${when(
//         from || to,
//         () => html`<p>${this.getDateRangeReviewTemplate(from, to)}</p>`
//       )}
//       ${when(
//         provenance?.term !== PROVENANCE.ALL,
//         () => html`
//           <p>
//             ${msg('For:')} <b>${PROVENANCE_DESCRIPTIONS[provenance!.term]()}</b>
//           </p>
//         `
//       )}
//       ${when(
//         provenance?.target !== TARGET.SYSTEM,
//         () => html`
//           <p>
//             ${msg('From:')} <b>${TARGET_DESCRIPTIONS[provenance!.target!]()}</b>
//           </p>
//         `
//       )}
//       ${when(
//         this.demand.message,
//         () => html`
//           <h4>${msg('Plus additional info:')}</h4>
//           <span class="extra-msg-txt"><i>${this.demand.message}</i></span>
//         `
//       )}
//     `;
//   }

//   getDeleteReviewTemplate() {
//     const from = this.demand.restrictions?.date_range?.from;
//     const to = this.demand.restrictions?.date_range?.to;
//     const provenance = this.demand.restrictions?.provenance;
//     const privacyScope = this.demand.restrictions?.privacy_scope;
//     return html`
//       <h4>${msg('I want to delete:')}</h4>
//       <ul id="delete-review-list" class="review-list">
//         ${when(
//           privacyScope &&
//             Object.values(DATA_CATEGORY)
//               .filter(dc => !dc.includes('.') && dc !== DATA_CATEGORY.ALL)
//               .every(dc => privacyScope.map(psr => psr.dc).includes(dc)),
//           () => html`
//             <li>${DATA_CATEGORY_DESCRIPTIONS[DATA_CATEGORY.ALL]()}</li>
//           `,
//           () => html`
//             ${map(
//               this.demand.restrictions?.privacy_scope,
//               psr => html`<li>${DATA_CATEGORY_DESCRIPTIONS[psr.dc]()}</li> `
//             )}
//           `
//         )}
//       </ul>
//       ${when(
//         from || to,
//         () => html`<p>${this.getDateRangeReviewTemplate(from, to)}</p>`
//       )}
//       ${when(
//         provenance?.term !== PROVENANCE.ALL,
//         () => html`
//           <p>
//             ${msg('For:')} <b>${PROVENANCE_DESCRIPTIONS[provenance!.term]()}</b>
//           </p>
//         `
//       )}
//       ${when(
//         provenance?.target !== TARGET.SYSTEM,
//         () => html`
//           <p>
//             ${msg('From:')} <b>${TARGET_DESCRIPTIONS[provenance!.target!]()}</b>
//           </p>
//         `
//       )}
//       ${when(
//         this.demand.message,
//         () => html`
//           <h4>${msg('Plus additional info:')}</h4>
//           <span class="extra-msg-txt"><i>${this.demand.message}</i></span>
//         `
//       )}
//     `;
//   }

//   getModifyReviewTemplate() {
//     return html``;
//   }

//   getObjectReviewTemplate() {
//     return html``;
//   }

//   getPortabilityReviewTemplate() {
//     return html``;
//   }

//   getRestrictReviewTemplate() {
//     return html``;
//   }

//   /**
//    * FIXME: Use actual revoke texts once the endpoint provides them
//    * @returns
//    */
//   getRevokeReviewTemplate() {
//     return html`
//       <h4>${msg('I no longer consent to:')}</h4>
//       <ul class="review-list">
//         ${map(
//           this.demands,
//           () => html`
//             <li>
//               The storage and processing of my data for the purposes of the
//               prize draw
//             </li>
//           `
//         )}
//       </ul>
//       ${when(
//         this.demands[0].message,
//         () => html`
//           <span>${msg('Plus additional info:')}</span>
//           <span class="extra-msg-txt"><i>${this.demands[0].message}</i></span>
//         `
//       )}
//     `;
//   }

//   getTransparencyReviewTemplate() {
//     const provenance = this.demands[0].restrictions?.provenance;
//     return html`
//       <h4>${msg('I want to know:')}</h4>
//       <ul id="transparency-review-list" class="review-list">
//         ${map(
//           this.demands,
//           d => html` <li><b>${ACTION_DESCRIPTIONS[d.action]()}</b></li> `
//         )}
//       </ul>
//       ${when(
//         provenance?.term !== PROVENANCE.ALL,
//         () => html`
//           <p>
//             ${msg('For:')} <b>${PROVENANCE_DESCRIPTIONS[provenance!.term]()}</b>
//           </p>
//         `
//       )}
//       ${when(
//         this.demands[0].message,
//         () => html`
//           <h4>${msg('Plus additional info:')}</h4>
//           <span class="extra-msg-txt"><i>${this.demands[0].message}</i></span>
//         `
//       )}
//     `;
//   }

//   getOtherDemandReviewTemplate() {
//     return html``;
//   }

//   getDateRangeReviewTemplate(from: Date | undefined, to: Date | undefined) {
//     if (from && to) {
//       return html`${msg('From')} <b>${from?.toLocaleDateString('en-GB')}</b> to
//         <b>${to?.toLocaleDateString('en-GB')}</b>`;
//     }
//     if (from) {
//       return html`${msg('Since')} <b>${from?.toLocaleDateString('en-GB')}</b>`;
//     }
//     if (to) {
//       return html`${msg('Up to')} <b>${to?.toLocaleDateString('en-GB')}</b>`;
//     }
//     return html``;
//   }

//   handleEditClick() {
//     this.dispatchEvent(
//       new CustomEvent('component-state-change', {
//         bubbles: true,
//         composed: true,
//         detail: {
//           newState: ComponentState.EDIT,
//           // Use transparency action for any of its subtypes
//           newAction: this.demands[0].action.includes('TRANSPARENCY')
//             ? ACTION.TRANSPARENCY
//             : this.demands[0].action,
//           demandGroupId: this.demandGroupId,
//         },
//       })
//     );
//   }

//   handleDeleteClick() {
//     this.confirmDelete = true;
//   }

//   handleConfirmDeleteClick() {
//     this.dispatchEvent(
//       new CustomEvent('demand-delete', {
//         bubbles: true,
//         composed: true,
//         detail: {
//           demandGroupId: this.demandGroupId,
//         },
//       })
//     );
//     this.dispatchEvent(
//       new CustomEvent('component-state-change', {
//         bubbles: true,
//         composed: true,
//         detail: {
//           newState: ComponentState.MENU,
//         },
//       })
//     );
//   }

//   handleCancelDeleteClick() {
//     this.confirmDelete = false;
//   }

//   handleTargetClick(e: Event) {
//     const { id } = (e as CustomEvent).target as HTMLInputElement;
//     this.target = id as TARGET;
//     this.dispatchEvent(
//       new CustomEvent('request-target-change', {
//         bubbles: true,
//         composed: true,
//         detail: { id },
//       })
//     );
//   }

//   handleSubmitClick() {
//     this.dispatchEvent(
//       new Event('submit-request', {
//         bubbles: true,
//         composed: true,
//       })
//     );
//   }

//   /**
//    * Determine the action to use for this review container whenever demands changes
//    * @param _changedProperties Properties that have changed in this update
//    */
//   protected willUpdate(
//     _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
//   ): void {
//     if (_changedProperties.has('demands') && this.demands.length > 0) {
//       this._action = this.demands[0].action;
//       if (this._action.includes('TRANSPARENCY')) {
//         this._action = ACTION.TRANSPARENCY;
//       } else {
//         [this.demand] = this.demands;
//       }
//     }
//   }

//   render() {
//     return html`
//       <h2><b>${msg('My demand(s):')}</b></h2>

//       <div class="dmd-review-ctr border--light border--rounded">
//         <div id="review-heading-row">
//           <h3 id="review-action-heading">${ACTION_TITLES[
//             this._action
//           ]()} Demand</h3>
//           <div id="review-btns">
//             <button class='svg-btn' @click=${this.handleEditClick}>
//               <img src=${editSvg} alt='edit'/>
//             </button>
//             <button class='svg-btn' @click=${this.handleDeleteClick}>
//               <img src=${trashSvg} alt='delete'/>
//             </button>
//           </div>
//         </div>
//         <div id="review-content">
//           ${choose(this._action, [
//             [ACTION.ACCESS, () => this.getAccessReviewTemplate()],
//             [ACTION.DELETE, () => this.getDeleteReviewTemplate()],
//             [ACTION.MODIFY, () => this.getModifyReviewTemplate()],
//             [ACTION.OBJECT, () => this.getObjectReviewTemplate()],
//             [ACTION.PORTABILITY, () => this.getPortabilityReviewTemplate()],
//             [ACTION.RESTRICT, () => this.getRestrictReviewTemplate()],
//             [ACTION.REVOKE, () => this.getRevokeReviewTemplate()],
//             [ACTION.TRANSPARENCY, () => this.getTransparencyReviewTemplate()],
//             [ACTION['OTHER.DEMAND'], () => this.getOtherDemandReviewTemplate()],
//           ])}
//         </div>
//         ${when(
//           this.confirmDelete,
//           () => html`
//             <div id="delete-confirm-popup" class="border--rounded">
//               <span class="popup-txt"
//                 >${msg('You are about to remove a demand')}</span
//               >
//               <span class="popup-txt"
//                 >${msg(html`Do you confirm <b>deleting this demand</b>?`)}</span
//               >
//               <div id="popup-btns-ctr">
//                 <button
//                   id="confirm-delete-btn"
//                   class="btn--curved popup-btn"
//                   @click=${this.handleConfirmDeleteClick}
//                 >
//                   ${msg('Delete')}
//                 </button>
//                 <button
//                   id="cancel-delete-btn"
//                   class="btn--curved popup-btn"
//                   @click=${this.handleCancelDeleteClick}
//                 >
//                   ${msg('Cancel')}
//                 </button>
//               </div>
//             </div>
//           `
//         )}
//         </div>

//       </div>
//       <!-- Uncomment when supporting multiple demands -->
//       <!-- <div id="new-dmd-ctr" class="border--medium border--rounded">
//         <span><b>${msg('I want to add another demand')}</b></span>
//         <button class="svg-btn">
//           <img src="packages/prci/src/assets/icons/add-circle.svg" alt="add icon"></img>
//         </button>
//       </div> -->
//       <!-- Submit button -->
//       <slotted-dropdown
//         id='request-settings'
//         .header=${msg('Privacy Request Advanced settings')}
//         include-buttons
//       >
//         <div>
//           <span> ${msg('I address my Privacy Request to:')} </span>
//           <fieldset class="provenance-restriction">
//             ${Object.values(TARGET)
//               .filter(t => t !== TARGET.ALL)
//               .map(
//                 t => html`
//                 <input
//                   id=${t}
//                   name='provenance-target'
//                   type='radio'
//                   ?checked=${this.target === t}
//                   @click=${this.handleTargetClick}>
//                 </input>
//                 <label for=${t}>${TARGET_DESCRIPTIONS[t]()}</label><br/>
//               `
//               )}
//           </fieldset>
//         </div>
//       </slotted-dropdown>
//       <button
//         id="submit-btn"
//         class="nav-btn btn--centered  btn--clickable"
//         @click=${this.handleSubmitClick}
//       >
//         ${msg('Submit Privacy Request')}
//       </button>
//     `;
//   }
// }

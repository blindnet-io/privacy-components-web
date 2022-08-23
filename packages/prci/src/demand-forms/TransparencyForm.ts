// import { msg } from '@lit/localize';
// import { css, html, TemplateResult } from 'lit';
// import { customElement, property, state } from 'lit/decorators.js';
// import { Demand } from '../models/demand.js';
// import { ACTION, PROVENANCE } from '../models/priv-terms.js';
// import {
//   buttonStyles,
//   containerStyles,
//   imgStyles,
//   textStyles,
// } from '../styles.js';
// import { enabledActions } from '../utils/conf.js';
// import {
//   ACTION_DESCRIPTIONS,
//   PROVENANCE_DESCRIPTIONS,
// } from '../utils/dictionary.js';
// import { ActionForm } from './ActionForm.js';
// import { FormComponentState } from '../utils/states.js';

// import '../SlottedDropdown.js';
// import '../AllChecklist.js';
// import { Restriction } from '../models/restrictions.js';

// /**
//  * ActionForm for the Transparency PRIV action. Includes a dropdown and text element.
//  *
//  * The transparency form follows a different pattern than the other actions, as each
//  * TRANSPARENCY.* actually represents a completely separate demand, but we display them
//  * all in one DemandBuilder element.
//  */
// @customElement('transparency-form')
// export class TransparencyForm extends ActionForm {
//   @property({ type: Array, attribute: false })
//   transparencyActions: ACTION[] = Object.values(ACTION).filter(a =>
//     a.includes('TRANSPARENCY.')
//   );

//   @property({ type: Array }) advancedSettings = [];

//   @state() _additionalMessage = '';

//   @state() _provenances: Set<Restriction> = new Set<Restriction>();

//   static styles = [
//     ActionForm.styles,
//     containerStyles,
//     buttonStyles,
//     textStyles,
//     imgStyles,
//     css`
//       :host {
//         display: grid;
//         row-gap: 35px;
//         align-content: flex-start;
//         margin: 0px;
//       }

//       .transparency-options {
//         padding: 40px 40px 20px 40px;
//       }

//       #dmd-ctr {
//         display: grid;
//         row-gap: 20px;
//       }

//       #dmd-ctr ul {
//         margin: 0;
//       }

//       #dmd-ctr li:not(:last-child) {
//         margin-bottom: 15px;
//       }

//       #edit-heading-1 {
//         font-weight: bold;
//         grid-column: 1/2;
//         padding: 0px;
//       }

//       p {
//         margin: 0px;
//       }

//       .additional-msg-ctr {
//         display: grid;
//         row-gap: 20px;
//         margin: 0px 0px 25px 0px;
//       }
//     `,
//   ];

//   constructor() {
//     super();

//     // Transparency action listeners
//     this.addEventListener('transparency-action-select', e => {
//       const details = (e as CustomEvent).detail;
//       const demand: Demand = {
//         action: details.id,
//         message: this._additionalMessage,
//         restrictions: this._provenances,
//       };
//       this.setDemand(demand);
//     });
//     this.addEventListener('transparency-action-deselect', e => {
//       const { id } = (e as CustomEvent).detail;
//       this.deleteDemand(id);
//     });

//     // Provenance listeners
//     this.addEventListener('provenance-select', e => {
//       const { id } = (e as CustomEvent).detail;
//       this._provenances.add(id);
//       this.demands.forEach(d => {
//         const demand = d;
//         demand.restrictions?.add(id);
//       });
//     });
//     this.addEventListener('provenance-deselect', e => {
//       const { id } = (e as CustomEvent).detail;
//       this._provenances.delete(id);
//       this.demands.forEach(d => {
//         const demand = d;
//         demand.restrictions?.delete(id);
//       });
//     });

//     // Additional message listener
//     this.addEventListener('text-element-change', e => {
//       this._additionalMessage = (e as CustomEvent).detail?.text;
//       this.demands.forEach(d => {
//         const demand = d;
//         demand.message = this._additionalMessage;
//       });
//     });
//   }

//   handleAdditionalMessageInput(e: Event) {
//     const event = new CustomEvent('text-element-change', {
//       bubbles: true,
//       composed: true,
//       detail: {
//         text: (e.target as HTMLTextAreaElement).value,
//       },
//     });
//     this.dispatchEvent(event);
//   }

//   validate(): boolean {
//     return true;
//   }

//   /**
//    * The defualt transparency demand contains all transparency actions
//    * @returns List of demands with each TRANSPARENCY.* action
//    */
//   getDefaultDemands(): Demand[] {
//     return Object.values(ACTION)
//       .filter(a => a.includes('TRANSPARENCY.'))
//       .map(a => ({
//         action: a,
//         restrictions: {
//           provenance: {
//             term: PROVENANCE.ALL
//           }
//         },
//       }));
//   }

//   getEditTemplate(demands: Demand[]): TemplateResult<1 | 2> {
//     const selectedActions = Object.values(demands).map(d => d.action);
//     return html`
//       <p id="edit-heading-1">
//         <b>${msg('Details of my TRANSPARENCY Demand')}</b>
//       </p>

//       <div class="light-border transparency-options">
//         <span slot="prompt"><b>${msg('I want to know:')}</b></span>
//         <all-checklist
//           .choices=${this.transparencyActions.map(a => ({
//             id: a,
//             description: ACTION_DESCRIPTIONS[a](),
//             checked: selectedActions.includes(a),
//             disabled: !enabledActions.get(a) ?? true,
//           }))}
//           all-message=${msg(
//             'ALL information related to data processing practices and know if the organization has data on me'
//           )}
//           component-mode=${FormComponentState.CLOSED}
//           event-prefix="transparency-action"
//           include-buttons
//         ></all-checklist>
//       </div>

//       <slotted-dropdown header=${msg('Advanced settings')} include-buttons>
//         <span slot="prompt"
//           ><b
//             >${msg(
//               'My demand applies to data from the following provenance:'
//             )}</b
//           ></span
//         >
//         <all-checklist
//           .choices=${Object.values(PROVENANCE).map(p => ({
//             id: p,
//             description: PROVENANCE_DESCRIPTIONS[p](),
//             checked: this.demands[0].restrictions?.has(p),
//             disabled: false,
//           }))}
//           all-message=${msg('All provenances')}
//           component-mode=${FormComponentState.OPEN}
//           event-prefix="provenance"
//         ></all-checklist>
//       </slotted-dropdown>
//       <slotted-dropdown
//         header=${msg('Additional message (optional)')}
//         include-buttons
//       >
//         <div class="additional-msg-ctr">
//           <span class="">${msg('My additional message:')}</span>
//           <span class="italic"
//             >${msg(
//               'Please note that adding a personalized message might lead to the demand taking longer to be processed'
//             )}</span
//           >
//           <textarea
//             id="additional-msg"
//             class="std-txt-area"
//             name="paragraph_text"
//             cols="50"
//             rows="10"
//             @input=${this.handleAdditionalMessageInput}
//             .value=${demands.length !== 0 ? demands[0].message ?? '' : ''}
//           ></textarea>
//         </div>
//       </slotted-dropdown>
//     `;
//   }
// }

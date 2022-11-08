/* eslint-disable camelcase */
import {
  CoreConfigurationMixin,
  PrivacyResponsePayload,
  ComputationAPI,
  LegalBase,
  PrivacyScopeTriple,
  RetentionPolicy,
  Provenance,
} from '@blindnet/core';
import { msg } from '@lit/localize';
import { css, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { classMap } from 'lit/directives/class-map.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

import './bldn-dropdown.js';
import {
  ACTION_DESCRIPTIONS,
  ACTION_TITLES,
  AFTER_TITLES,
  DEMAND_STATUS_DESCRIPTIONS,
  POLICY_TYPE_TITLES,
} from './utils/dictionary.js';

const linkSvg = new URL(
  './assets/icons/akar-icons_link-chain.svg',
  import.meta.url
).href;

const downloadSvg = new URL(
  './assets/icons/akar-icons_download.svg',
  import.meta.url
).href;

/**
 * Get a user friendly string for a retention policy
 * @param dataCategory Data category the policy pertains to
 * @param policy Type of the policy
 * @param duration String quantifying the duration, e.g. 10 months
 * @param after Point after which the data is kept
 * @returns String combining the provided information to represent a retention policy
 */
export function getRetentionPolicyString(
  dataCategory: string,
  policyType: RetentionPolicy.policy_type,
  duration: string,
  after: RetentionPolicy.after
) {
  // FIXME: For our first demo, we assume duration is in months
  return html`<i>${dataCategory.toLocaleUpperCase()}</i> data is kept
    <i>${POLICY_TYPE_TITLES[policyType]().toLocaleUpperCase()}</i>
    <i>${duration}</i> months after
    <i>${AFTER_TITLES[after]().toLocaleUpperCase()}</i>`;
}

/**
 * Get a link to the status page for the request denoted by requestId
 * @param requestId ID of the privacy request
 * @returns
 */
export function getRequestLink(requestId: string): URL {
  const url = new URL(document.URL);
  url.searchParams.set('requestId', requestId);
  return url;
}

@customElement('bldn-request-status')
export class BldnRequestStatus extends CoreConfigurationMixin(LitElement) {
  @property({ type: String }) requestId: string | undefined;

  @state() _requestDetails: PrivacyResponsePayload[] = [];

  getRequestDetails() {
    ComputationAPI.getInstance()
      .getRequest(this.requestId!)
      .then(requestDetails => {
        this._requestDetails = requestDetails;
      });
  }

  handleCopyLinkClick() {
    navigator.clipboard.writeText(getRequestLink(this.requestId!).toString());
  }

  handleDownloadClick(demand: PrivacyResponsePayload) {
    window.location.href = demand.data!;
  }

  handleCancelClick(demand: PrivacyResponsePayload) {
    ComputationAPI.getInstance()
      .cancelDemand(demand.demand_id)
      .then(() => {
        // eslint-disable-next-line no-param-reassign
        demand.status = PrivacyResponsePayload.status.CANCELED;
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
  }

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has('apiToken') && this.apiToken && this.requestId)
      this.getRequestDetails();

    if (
      _changedProperties.has('requestId') &&
      this.requestId &&
      ComputationAPI.getInstance().apiTokenSet()
    )
      this.getRequestDetails();
  }

  render() {
    return html`
      <bldn-dropdown class="main-section" mode="major" open>
        <span slot="heading"><strong>${msg(html`Request Summary - `)}
          <bldn-button mode='link-icon' underline-mode='none' @bldn-button:click=${
            this.handleCopyLinkClick
          }>
            <span id='copy-link'><b>${msg('Copy Link')}</b></span>
            <img src=${linkSvg} alt='copy link to request status page'></img>
          </bldn-button></strong>
        </span>
        ${this._requestDetails.map(demand => {
          const classes = {
            granted: demand.status === PrivacyResponsePayload.status.GRANTED,
            denied: demand.status === PrivacyResponsePayload.status.DENIED,
            partial:
              demand.status ===
                PrivacyResponsePayload.status.PARTIALLY_GRANTED ||
              demand.status === PrivacyResponsePayload.status.UNDER_REVIEW,
            canceled: demand.status === PrivacyResponsePayload.status.CANCELED,
          };
          return html`
            <bldn-dropdown>
              <span slot="heading"
                ><strong
                  >${msg(
                    html`${ACTION_TITLES[demand.requested_action]()} Demand`
                  )}&nbsp;&nbsp;&nbsp;<span class=${classMap(classes)}
                    >${DEMAND_STATUS_DESCRIPTIONS[demand.status]()}</span
                  ></strong
                ></span
              >
              ${this.getStatusTemplate(demand)}
            </bldn-dropdown>
          `;
        })}
      </bldn-dropdown>
    `;
  }

  getStatusTemplate(demand: PrivacyResponsePayload) {
    return html`
      <p>
        <b>${msg('Requested:')}</b> ${ACTION_DESCRIPTIONS[
          demand.requested_action
        ]()}
      </p>

      ${choose(demand.status, [
        [
          PrivacyResponsePayload.status.GRANTED,
          () => this.getGrantedResponseTemplate(demand),
        ],
        [
          PrivacyResponsePayload.status.DENIED,
          () => html`
            <p>
              ${msg('This demand has been denied. Reason: ')}<i
                >${demand.message}</i
              >
            </p>
          `,
        ],
        [
          PrivacyResponsePayload.status.PARTIALLY_GRANTED,
          () => html`<p>${msg('This demand has been partially granted.')}</p>`,
        ],
        [
          PrivacyResponsePayload.status.UNDER_REVIEW,
          () => html`
            <p>
              ${msg('This demand is still under review.')}
              <bldn-button
                mode="link"
                @bldn-button:click=${() => this.handleCancelClick(demand)}
              >
                <span class="cancel-demand">${msg('Cancel Demand')}</span>
              </bldn-button>
            </p>
          `,
        ],
        [
          PrivacyResponsePayload.status.CANCELED,
          () => html`<p>${msg('This demand has been cancelled.')}</p>`,
        ],
      ])}
    `;
  }

  getGrantedResponseTemplate(demand: PrivacyResponsePayload) {
    return html`
      ${choose(demand.requested_action, [
        [
          PrivacyResponsePayload.requested_action.ACCESS,
          () => html`
            ${when(
              demand.data,
              () => html`
                ${msg(
                  // NOTE: For now, we assume demand.data is a JSON file
                  html`
                <bldn-button mode='link-icon' @bldn-button:click=${() =>
                  this.handleDownloadClick(demand)}>
                  <img src=${downloadSvg} alt='download your data'></img>
                  <span>${msg('Download your data.')}</span>
                </bldn-button>
              `
                )}
              `,
              () =>
                html`<p>
                  ${msg(
                    'Obtaining data, please wait and refresh the page later.'
                  )}
                </p>`
            )}
          `,
        ],
        [
          PrivacyResponsePayload.requested_action.DELETE,
          () => html` <p>${msg('Your delete request has been granted.')}</p> `,
        ],
        [
          PrivacyResponsePayload.requested_action.MODIFY,
          () => html` <p>${msg('Your modify request has been granted.')}</p> `,
        ],
        [
          PrivacyResponsePayload.requested_action.OBJECT,
          () => html` <p>${msg('Your object request has been granted')}</p> `,
        ],
        [
          PrivacyResponsePayload.requested_action.OTHER,
          () => html` <p>${msg('Your request has been granted.')}</p> `,
        ],
        [
          PrivacyResponsePayload.requested_action.PORTABILITY,
          () => html`
            <p>${msg('Your portability request has been granted.')}</p>
          `,
        ],
        [
          PrivacyResponsePayload.requested_action.RESTRICT,
          () => html`
            <p>${msg('Your restrict request has been granted.')}</p>
          `,
        ],
        [
          PrivacyResponsePayload.requested_action.REVOKE_CONSENT,
          () => html`
            <p>${msg('Your revoke consent request has been granted.')}</p>
          `,
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY,
          () => html`
            <p>${msg('Your transparency request has been granted.')}</p>
          `,
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY_DATA_CATEGORIES,
          () => html`
            ${map(demand.answer as Array<string>, dc => html` ${dc}<br /> `)}
          `,
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY_DPO,
          () => html` <p>${demand.answer}</p> `,
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY_KNOWN,
          () => html` <p>${demand.answer}</p> `,
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY_LEGAL_BASES,
          () => html`
            <p>
              ${map(
                demand.answer as Array<LegalBase>,
                lb => html`
                  Type: ${lb.lb_type}<br />
                  Name: ${lb.name}<br />
                  Description: ${lb.description}<br /><br />
                `
              )}
            </p>
          `,
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY_ORGANIZATION,
          () => html` <p>${demand.answer}</p> `,
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY_POLICY,
          () => html` <p>${demand.answer}</p> `,
        ],
        [
          PrivacyResponsePayload.requested_action
            .TRANSPARENCY_PROCESSING_CATEGORIES,
          () => html`
            <p>
              ${map(
                demand.answer as Array<PrivacyScopeTriple.processing_category>,
                pc => html` ${pc}<br /> `
              )}
            </p>
          `,
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY_PROVENANCE,
          () => {
            const provs: [string, [Provenance]][] = Object.entries(
              demand.answer
            );
            return html`
              <p>
                ${map(
                  provs,
                  dc => html`
                    ${map(
                      dc[1],
                      prov => html`
                        ${msg(
                          html`<b>${dc[0]} Data:</b> Source
                            <i>${prov.provenance}</i> of the
                            <i>${prov.system}</i> system.<br />`
                        )}
                      `
                    )}
                  `
                )}
              </p>
            `;
          },
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY_PURPOSE,
          () => html`
            <p>
              ${map(
                demand.answer as Array<PrivacyScopeTriple.purpose>,
                purpose => html` ${purpose}<br /> `
              )}
            </p>
          `,
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY_RETENTION,
          () => {
            const answer = demand.answer as {
              NAME: RetentionPolicy[];
            };
            return html`
              <p>
                ${map(
                  answer.NAME,
                  rp =>
                    html`<p>
                      ${getRetentionPolicyString(
                        'Data',
                        rp.policy_type,
                        rp.duration,
                        rp.after
                      )}
                    </p>`
                )}
              </p>
            `;
          },
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY_WHERE,
          () => html`
            <p>
              ${map(
                demand.answer as Array<string>,
                where => html` ${where}<br /> `
              )}
            </p>
          `,
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY_WHO,
          () => html`
            <p>
              ${map(
                demand.answer as Array<string>,
                who => html` ${who}<br /> `
              )}
            </p>
          `,
        ],
      ])}
    `;
  }

  static styles = css`
    :host {
      display: block;
      text-align: left;
      color: var(--bldn-request-status-font-color, var(--color-dark));
    }

    bldn-dropdown.main-section {
      border: 2px solid
        var(--bldn-action-form-section-border-color, var(--color-light));
      border-radius: 20px;
      padding: 2.5em;
      /* FIXME: This makes the border expansion jump weird */
      /* transition: 0.3s ease-out; */
    }

    bldn-dropdown.main-section[open] {
      padding: 2.5em 2.5em 0.5em 2.5em;
    }

    bldn-dropdown.main-section:hover {
      border: 2px solid
        var(--bldn-action-form-section-border-color-hovered, var(--color-dark));
      /* FIXME: This makes the border expansion jump weird */
      /* transition: 0.3s ease; */
    }

    /* Font for main sections: Demand Details and Other Options */
    bldn-dropdown.main-section > span {
      font-size: var(
        --bldn-action-form-section-heading-font-size,
        var(--font-size-medium)
      );
      color: var(
        --bldn-action-form-section-heading-font-color,
        var(--color-dark)
      );
    }

    /* Font for other options headings */
    bldn-dropdown bldn-dropdown span {
      font-size: var(--font-size-small);
      color: var(
        --bldn-action-form-subsection-heading-font-color,
        var(--color-dark)
      );
    }

    bldn-dropdown bldn-dropdown span ~ * {
      padding-left: 1.25em;
    }

    /* Divider between other options dropdowns */
    bldn-dropdown {
      border-bottom: 2px solid
        var(--bldn-action-form-subsection-divider-color, var(--color-lightest));
    }

    /* Last dropdown in other options should have no border */
    bldn-dropdown bldn-dropdown:last-child {
      border-bottom: none;
    }

    #copy-link {
      color: var(--color-medium);
    }

    .granted {
      color: var(--color-positive);
    }

    .denied {
      color: var(--color-negative);
    }

    .partial {
      color: var(--color-warning);
    }

    .canceled {
      color: var(--color-light);
    }

    .cancel-demand {
      color: var(--color-negative);
    }
  `;
}

// import { msg, str } from '@lit/localize';
// import { css, html, LitElement, PropertyValueMap } from 'lit';
// import { customElement, property, state } from 'lit/decorators.js';
// import { map } from 'lit/directives/map.js';
// import { when } from 'lit/directives/when.js';
// import {
//   ACTION,
//   DEMAND_STATUS,
//   PrivacyResponseItem,
//   ComputationAPI,
// } from '@blindnet/core';

// import './StatusViewItem.js';
// import { ComponentState } from './utils/states.js';
// import { PRCIStyles } from './styles.js';
// import { getRequestLink, removeQueryParam } from './utils/utils.js';

// const linkSvg = new URL('./assets/icons/link.svg', import.meta.url).href;

// /**
//  * View the status of a Privacy Request
//  */
// @customElement('status-view')
// export class StatusView extends LitElement {
//   static styles = [
//     PRCIStyles,
//     css`
//       :host {
//         display: grid;
//         row-gap: 20px;
//         max-width: 900px;
//         text-align: center;
//         margin: auto;
//       }

//       .req-progress-ctr {
//         display: grid;
//         row-gap: 10px;
//       }

//       .dmds-ctr {
//         display: grid;
//         row-gap: 20px;
//         padding: 30px 40px 40px 40px;
//       }

//       .dmds-ctr span {
//         padding: 0px 0px 20px 0px;
//       }

//       #completed-dmds-ctr {
//         border: 1px solid #18a0fb;
//         background: rgba(24, 160, 251, 0.11);
//       }

//       #nav-btns-ctr {
//         display: flex;
//         /* grid-template-columns: repeat(2, 1fr); */
//         column-gap: 20px;
//         justify-content: center;
//         justify-items: center;
//       }

//       .status-nav-btn {
//         font-size: 18px;
//       }

//       p {
//         display: flex;
//         align-items: center;
//         justify-content: center;
//       }

//       button {
//         display: inline-flex;
//         align-items: center;
//       }
//     `,
//   ];

//   @property({ type: String, attribute: 'request-id' }) requestId: string = '';

//   @property({ type: Boolean }) newRequest: boolean = false;

//   @state() _requestDate: Date = new Date();

//   @state() _completedDemands: PrivacyResponseItem[] = [];

//   @state() _processingDemands: PrivacyResponseItem[] = [];

//   @state() _cancelledDemands: PrivacyResponseItem[] = [];

//   // eslint-disable-next-line no-undef
//   @state() _intervalId: any = undefined;

//   reloadRequest() {
//     ComputationAPI.getInstance()
//       .getRequest(this.requestId)
//       .then(response => {
//         if (response.length > 0) {
//           this._requestDate = new Date(response[0].date);
//           this._completedDemands = response.filter(d =>
//             [
//               DEMAND_STATUS.GRANTED,
//               DEMAND_STATUS['PARTIALLY-GRANTED'],
//               DEMAND_STATUS.DENIED,
//             ].includes(d.status)
//           );
//           this._processingDemands = response.filter(
//             d => d.status === DEMAND_STATUS['UNDER-REVIEW']
//           );
//           this._cancelledDemands = response.filter(
//             d => d.status === DEMAND_STATUS.CANCELED
//           );
//         }

//         // If no more demands are processing, the reload interval exists, and the data for
//         // all ACCESS responses has arrived, stop reloading the request.
//         if (
//           this._processingDemands.length === 0 &&
//           this._intervalId &&
//           !this._completedDemands.some(
//             d => d.requested_action === ACTION.ACCESS && !d.data
//           )
//         ) {
//           clearInterval(this._intervalId);
//           this._intervalId = undefined;
//         } else if (!this._intervalId && this._processingDemands.length !== 0) {
//           // FIXME: reload should happen after a user interaction, not automatically
//           // Setup an interval to get the status of processing demands every 3 seconds
//           this._intervalId = setInterval(() => this.reloadRequest(), 3000);
//         }
//       });
//   }

//   protected willUpdate(
//     _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
//   ): void {
//     if (_changedProperties.has('requestId') && this.requestId !== '') {
//       this.reloadRequest();
//     }
//   }

//   handleCopyIdClick() {
//     navigator.clipboard.writeText(this.requestId);
//   }

//   handleCopyLinkClick() {
//     navigator.clipboard.writeText(getRequestLink(this.requestId).toString());
//   }

//   handleBackClick() {
//     removeQueryParam('requestId');
//     this.dispatchEvent(
//       new CustomEvent('component-state-change', {
//         bubbles: true,
//         composed: true,
//         detail: {
//           newState: ComponentState.REQUESTS,
//         },
//       })
//     );
//   }

//   handleNewRequestClick() {
//     removeQueryParam('requestId');
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

//   render() {
//     return html`
//       ${when(
//         this._processingDemands.length > 0,
//         () => html`
//           <p>
//             ${msg(
//               str`Your Privacy Request, sent on
//               ${this._requestDate.toLocaleDateString('en-gb')}, is currently
//               being processed.`
//             )}
//           </p>
//           ${when(
//             this._completedDemands.length > 0,
//             () => html`
//               <div class="req-progress-ctr">
//                 <p>${msg('At the moment:')}</p>
//                 <p>
//                   <b
//                     >${msg(
//                       html`${this._completedDemands.length} demand(s) have been
//                       completed${when(
//                         this._cancelledDemands.length > 0,
//                         () =>
//                           html` and ${this._cancelledDemands.length} demand(s)
//                           have been cancelled`
//                       )}`
//                     )}</b
//                   >
//                 </p>
//                 <p>
//                   ${msg(
//                     html`${this._processingDemands.length} demand(s) are being
//                     processed`
//                   )}
//                 </p>
//               </div>
//             `
//           )}
//         `,
//         () => html`
//           <p>
//             ${msg(
//               html`Your Privacy Request, sent on
//               ${this._requestDate.toLocaleDateString('en-gb')}, has been
//               processed.`
//             )}
//           </p>
//         `
//       )}
//       <div>
//         <button class='svg-btn' @click=${this.handleCopyLinkClick}>
//           <img src=${linkSvg} alt='Copy status page link'></img>&nbsp;
//           <span class='text--underline'>${msg('Copy link to this page')}</span>
//         </button>
//       </div>
//       ${when(
//         this._completedDemands.length > 0,
//         () => html`
//           <div
//             id="completed-dmds-ctr"
//             class="dmds-ctr border--medium border--rounded"
//           >
//             <span><b>${msg('Completed Demand(s)')}</b></span>
//             ${map(
//               this._completedDemands,
//               d => html`<status-view-item .demand=${d}></status-view-item>`
//             )}
//           </div>
//         `
//       )}
//       ${when(
//         this._processingDemands.length > 0,
//         () => html`
//           <div
//             id="processing-dmds-ctr"
//             class="dmds-ctr border--medium border--rounded"
//           >
//             <span><b>${msg('Processing Demand(s)')}</b></span>
//             ${map(
//               this._processingDemands,
//               d => html`<status-view-item .demand=${d}></status-view-item>`
//             )}
//           </div>
//         `
//       )}
//       ${when(
//         this._cancelledDemands.length > 0,
//         () => html`
//           <div
//             id="cancelled-dmds-ctr"
//             class="dmds-ctr border--medium border--rounded"
//           >
//             <span><b>${msg('Cancelled Demand(s)')}</b></span>
//             ${map(
//               this._cancelledDemands,
//               d => html`<status-view-item .demand=${d}></status-view-item>`
//             )}
//           </div>
//         `
//       )}
//       <div id="nav-btns-ctr">
//         <button
//           class="status-nav-btn link-btn dark-font text--underline"
//           @click=${this.handleBackClick}
//         >
//           ${msg('Back to my Requests')}
//         </button>
//         <button
//           class="status-nav-btn link-btn dark-font text--underline"
//           @click=${this.handleNewRequestClick}
//         >
//           ${msg('Submit a new Privacy Request')}
//         </button>
//       </div>
//     `;
//   }
// }

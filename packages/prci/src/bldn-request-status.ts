/* eslint-disable camelcase */
import {
  CoreConfigurationMixin,
  PrivacyResponsePayload,
  ComputationAPI,
  LegalBase,
  PrivacyScopeTriple,
  RetentionPolicy,
  Provenance,
  PrivacyResponseAnswer,
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
  DATA_CATEGORY_TITLES_WITH_DATA,
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

const cancelSvg = new URL('./assets/icons/ic_round-cancel.svg', import.meta.url)
  .href;

const refreshSvg = new URL(
  './assets/icons/heroicons-solid_refresh.svg',
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
  return html`<i
      >${DATA_CATEGORY_TITLES_WITH_DATA[dataCategory.toLocaleUpperCase()]()}</i
    >
    ${msg('is kept for')}
    <i>${POLICY_TYPE_TITLES[policyType]().toLocaleUpperCase()}</i>
    <i>${duration}</i> ${msg('months after')}
    <i>${AFTER_TITLES[after]().toLocaleUpperCase()}</i>`;
}

/**
 * Get a user friendly string for a provenance in regard to some data category
 * @param dataCategory Data category the provenance pertains to
 * @param provenance Provenance object
 * @returns String combining the data category and provenance into a readable form
 */
function getProvenanceString(dataCategory: string, provenance: Provenance) {
  return html`
    ${choose(provenance.provenance, [
      [
        Provenance.provenance._,
        () => html`
          ${when(
            provenance.system,
            () => html`
              <b>${DATA_CATEGORY_TITLES_WITH_DATA[dataCategory]()}:</b> ${msg(
                html`Obtained from a user, another system and/or derived from
                  existing data, in the <i>${provenance.system}</i> system`
              )}
            `,
            () => html`
              <b>${DATA_CATEGORY_TITLES_WITH_DATA[dataCategory]()}:</b> ${msg(
                html`Obtained from a user, another system and/or derived from
                existing data, in some other system.`
              )}
            `
          )}
        `,
      ],
      [
        Provenance.provenance.USER,
        () => html`
          ${when(
            provenance.system,
            () => html`
              <b>${DATA_CATEGORY_TITLES_WITH_DATA[dataCategory]()}:</b> ${msg(
                html`Obtained from a user of the
                  <i>${provenance.system}</i> system`
              )}
            `,
            () => html`
              <b>${DATA_CATEGORY_TITLES_WITH_DATA[dataCategory]()}:</b> ${msg(
                html`Obtained from a user`
              )}
            `
          )}
        `,
      ],
      [
        Provenance.provenance.USER_DATA_SUBJECT,
        () => html`
          ${when(
            provenance.system,
            () => html`
              <b>${DATA_CATEGORY_TITLES_WITH_DATA[dataCategory]()}:</b> ${msg(
                html`Obtained from a user, providing data about theirself, in
                  the <i>${provenance.system}</i> system`
              )}
            `,
            () => html`
              <b>${DATA_CATEGORY_TITLES_WITH_DATA[dataCategory]()}:</b> ${msg(
                html`Obtained from a user, providing data about theirself`
              )}
            `
          )}
        `,
      ],
      [
        Provenance.provenance.TRANSFERRED,
        () => html`
          ${when(
            provenance.system,
            () => html`
              <b>${DATA_CATEGORY_TITLES_WITH_DATA[dataCategory]()}:</b> ${msg(
                html`Transfered from the <i>${provenance.system}</i> system`
              )}
            `,
            () => html`
              <b>${DATA_CATEGORY_TITLES_WITH_DATA[dataCategory]()}:</b> ${msg(
                html`Transfered from some other system`
              )}
            `
          )}
        `,
      ],
      [
        Provenance.provenance.DERIVED,
        () => html`
          ${when(
            provenance.system,
            () => html`
              <b>${DATA_CATEGORY_TITLES_WITH_DATA[dataCategory]()}:</b> ${msg(
                html`Derived from existing data in the
                  <i>${provenance.system}</i> system`
              )}
            `,
            () => html`
              <b>${DATA_CATEGORY_TITLES_WITH_DATA[dataCategory]()}:</b> ${msg(
                html`Derived from existing data in some other system`
              )}
            `
          )}
        `,
      ],
    ])}
  `;
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

  @state() _error: boolean = false;

  getRequestDetails() {
    ComputationAPI.getInstance()
      .getRequest(this.requestId!)
      .then(requestDetails => {
        this._requestDetails = requestDetails;
        this._error = false;
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.log(e);
        this._error = true;
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
        // Refetch request status after cancelling
        this.getRequestDetails();
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
  }

  handleRefreshClick() {
    this.getRequestDetails();
  }

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has('apiToken') && this.apiToken && this.requestId) {
      this.getRequestDetails();
    }

    if (_changedProperties.has('requestId')) {
      if (this.requestId && ComputationAPI.getInstance().apiTokenSet()) {
        this.getRequestDetails();
      } else if (this.requestId) {
        // Try waiting 2 seconds incase there is a delay in setting the api token,
        // such as in our demo
        setTimeout(() => {
          if (ComputationAPI.getInstance().apiTokenSet()) {
            this.getRequestDetails();
          }
        }, 2000);
      }
    }

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
        <span slot="heading" id='summary-heading'><b>${msg(
          html`Request Summary`
        )}</b>
          <bldn-button mode='link-icon' underline-mode='none' @bldn-button:click=${
            this.handleCopyLinkClick
          }>
            <span class='request-action'><b>${msg('Copy Link')}</b></span>
            <img src=${linkSvg} alt='copy link to request status page'></img>
          </bldn-button>
          <bldn-button id='refresh-request' mode='link-icon' underline-mode='none' @bldn-button:click=${
            this.handleRefreshClick
          }>
            <span class='request-action'><b>${msg('Refresh')}</b></span>
            <img src=${refreshSvg} alt='refresh this request'></img>
          </bldn-button>
        </span>
        ${when(
          this._requestDetails.length > 0,
          () => html`
            ${this._requestDetails.map(demand => {
              const classes = {
                granted:
                  demand.status === PrivacyResponsePayload.status.GRANTED,
                denied: demand.status === PrivacyResponsePayload.status.DENIED,
                partial:
                  demand.status ===
                    PrivacyResponsePayload.status.PARTIALLY_GRANTED ||
                  demand.status === PrivacyResponsePayload.status.UNDER_REVIEW,
                canceled:
                  demand.status === PrivacyResponsePayload.status.CANCELED,
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
                ${map(demand.includes, subDemand => {
                  const subClasses = {
                    granted:
                      subDemand.status ===
                      PrivacyResponsePayload.status.GRANTED,
                    denied:
                      subDemand.status === PrivacyResponsePayload.status.DENIED,
                    partial:
                      subDemand.status ===
                        PrivacyResponsePayload.status.PARTIALLY_GRANTED ||
                      subDemand.status ===
                        PrivacyResponsePayload.status.UNDER_REVIEW,
                    canceled:
                      subDemand.status ===
                      PrivacyResponsePayload.status.CANCELED,
                  };
                  return html`
                    <bldn-dropdown>
                      <span slot="heading"
                        ><strong
                          >${msg(
                            html`${ACTION_TITLES[subDemand.requested_action]()}
                            Demand`
                          )}&nbsp;&nbsp;&nbsp;<span
                            class=${classMap(subClasses)}
                            >${DEMAND_STATUS_DESCRIPTIONS[
                              subDemand.status
                            ]()}</span
                          ></strong
                        ></span
                      >
                      ${this.getStatusTemplate(subDemand)}
                    </bldn-dropdown>
                  `;
                })}
              `;
            })}
          `,
          () => html`
            <p id="loading-message">
              ${when(
                this._error,
                () => html`
                  ${msg('Error getting request details. Please refresh later.')}
                `,
                () => html` ${msg('Loading request details...')} `
              )}
            </p>
          `
        )}
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
                mode="link-icon"
                underline-mode='none'
                @bldn-button:click=${() => this.handleCancelClick(demand)}
              >
                <span class="cancel-demand">${msg('Cancel Demand')}</span>
                <img src=${cancelSvg} alt='cancel demand'></img>
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

  // NOTE: For now, we assume demand.data is a JSON file
  getGrantedResponseTemplate(demand: PrivacyResponsePayload) {
    const answer = JSON.parse(demand.answer);

    return html`
      ${choose(demand.requested_action, [
        [
          PrivacyResponsePayload.requested_action.ACCESS,
          () => html`
            ${when(
              demand.data,
              () => html`
                <bldn-button mode='link-icon' @bldn-button:click=${() =>
                  this.handleDownloadClick(demand)}>
                  <img src=${downloadSvg} alt='download your data'></img>
                  <span>${msg('Download your data.')}</span>
                </bldn-button>
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
          () => html` <p>${msg('Your delete demand has been granted.')}</p> `,
        ],
        [
          PrivacyResponsePayload.requested_action.MODIFY,
          () => html` <p>${msg('Your modify demand has been granted.')}</p> `,
        ],
        [
          PrivacyResponsePayload.requested_action.OBJECT,
          () => html` <p>${msg('Your object demand has been granted')}</p> `,
        ],
        [
          PrivacyResponsePayload.requested_action.OTHER,
          () => html` <p>${msg('Your demand has been granted.')}</p> `,
        ],
        [
          PrivacyResponsePayload.requested_action.PORTABILITY,
          () => html`
            <p>${msg('Your portability demand has been granted.')}</p>
          `,
        ],
        [
          PrivacyResponsePayload.requested_action.RESTRICT,
          () => html` <p>${msg('Your restrict demand has been granted.')}</p> `,
        ],
        [
          PrivacyResponsePayload.requested_action.REVOKE_CONSENT,
          () => html`
            <p>${msg('Your revoke consent demand has been granted.')}</p>
          `,
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY,
          () => html`
            <p>
              ${msg(
                'Your transparency demand has been granted and split into multiple demands below.'
              )}
            </p>
          `,
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY_DATA_CATEGORIES,
          () => html`
            <p>
              ${when(
                answer.length > 0,
                () => html`
                  ${map(
                    answer as PrivacyResponseAnswer.TRANSPARENCY_DATA_CATEGORIES,
                    dc => html` ${dc}<br /> `
                  )}
                `,
                () => html` ${msg('There are no categories of data on you.')} `
              )}
            </p>
          `,
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY_DPO,
          () => html`
            <p>
              ${when(
                answer,
                () => html`
                  ${answer as PrivacyResponseAnswer.TRANSPARENCY_DPO}
                `,
                () => html` ${msg('There is no listed DPO.')} `
              )}
            </p>
          `,
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY_KNOWN,
          () => html`
            <p>
              ${choose(
                answer as PrivacyResponseAnswer.TRANSPARENCY_KNOWN,
                [
                  [
                    'NO',
                    () =>
                      html`${msg(
                        html`The organization <strong>does not</strong> have
                          data on you.`
                      )}`,
                  ],
                  [
                    'YES',
                    () =>
                      html`${msg(
                        html`The organization <strong>does</strong> have data on
                          you.`
                      )}`,
                  ],
                ],
                () =>
                  html`${msg(
                    'There is no information regarding whether the organization has data on you.'
                  )}`
              )}
            </p>
          `,
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY_LEGAL_BASES,
          () => {
            const lbAnswer =
              answer as PrivacyResponseAnswer.TRANSPARENCY_LEGAL_BASES;
            return html`
              <p>
                ${when(
                  Object.keys(lbAnswer).length > 0,
                  () => html`
                    ${map(
                      lbAnswer,
                      lb => html`
                        <p>
                          ${msg('Name: ')}${lb.name}<br />
                          ${when(
                            lb.description,
                            () =>
                              html`${msg(
                                  'Description: '
                                )}${lb.description}<br />`
                          )}
                          ${msg('Type: ')}${lb.lb_type}<br />
                        </p>
                      `
                    )}
                  `,
                  () => html`
                    ${msg('There are no legal bases for processing your data.')}
                  `
                )}
              </p>
            `;
          },
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY_ORGANIZATION,
          () => html`
            <p>
              ${when(
                answer,
                () => html`
                  ${answer as PrivacyResponseAnswer.TRANSPARENCY_ORGANIZATION}
                `,
                () => html` ${msg('There is no organization information.')} `
              )}
            </p>
          `,
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY_POLICY,
          () => html`
            <p>
              ${when(
                answer,
                () => html`
                  ${answer as PrivacyResponseAnswer.TRANSPARENCY_POLICY}
                `,
                () => html` ${msg('There is no policy information.')} `
              )}
            </p>
          `,
        ],
        [
          PrivacyResponsePayload.requested_action
            .TRANSPARENCY_PROCESSING_CATEGORIES,
          () => html`
            <p>
              ${when(
                answer.length > 0,
                () => html`
                  ${map(
                    answer as PrivacyResponseAnswer.TRANSPARENCY_PROCESSING_CATEGORIES,
                    pc => html` ${pc}<br /> `
                  )}
                `,
                () =>
                  html`${msg(
                    'There are no categories of processing being done on your data.'
                  )}`
              )}
            </p>
          `,
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY_PROVENANCE,
          () => {
            const provAnswer =
              answer as PrivacyResponseAnswer.TRANSPARENCY_PROVENANCE;
            return html`
              <p>
                ${when(
                  Object.keys(provAnswer).length > 0,
                  () => html`
                    ${map(
                      Object.entries(provAnswer),
                      ([dc, provs]) => html`
                        ${map(
                          provs,
                          prov => html`
                            ${getProvenanceString(dc, { ...prov })}<br />
                          `
                        )}
                      `
                    )}
                  `,
                  () => html`
                    ${msg('There are no sources of data concerning you.')}
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
              ${when(
                answer.length > 0,
                () => html`
                  ${map(
                    answer as PrivacyResponseAnswer.TRANSPARENCY_PURPOSE,
                    purpose => html` ${purpose}<br /> `
                  )}
                `,
                () => html`
                  ${msg(
                    'There is no information about the purposes for processing your data.'
                  )}
                `
              )}
            </p>
          `,
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY_RETENTION,
          () => {
            const retAnswer =
              answer as PrivacyResponseAnswer.TRANSPARENCY_RETENTION;
            return html`
              <p>
                ${when(
                  Object.keys(retAnswer).length > 0,
                  () => html`
                    ${map(
                      Object.entries(retAnswer),
                      ([dc, rp]) => html`
                        ${map(
                          rp,
                          policy => html`
                            ${getRetentionPolicyString(
                              dc,
                              policy.policy_type,
                              policy.duration,
                              policy.after
                            )}<br />
                          `
                        )}
                      `
                    )}
                  `,
                  () => html`
                    ${msg(
                      'There is no information about how long your data is kept.'
                    )}
                  `
                )}
              </p>
            `;
          },
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY_WHERE,
          () => html`
            <p>
              ${when(
                answer.length > 0,
                () => html`
                  ${map(
                    answer as PrivacyResponseAnswer.TRANSPARENCY_WHERE,
                    where => html` ${where}<br /> `
                  )}
                `,
                () => html`
                  ${msg(
                    'There is no information about where your data is stored.'
                  )}
                `
              )}
            </p>
          `,
        ],
        [
          PrivacyResponsePayload.requested_action.TRANSPARENCY_WHO,
          () => html`
            <p>
              ${when(
                answer.length > 0,
                () => html`
                  ${map(
                    answer as PrivacyResponseAnswer.TRANSPARENCY_WHO,
                    who => html` ${who}<br /> `
                  )}
                `,
                () => html`
                  ${msg(
                    'There is no information about who has access to your data.'
                  )}
                `
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
        var(--bldn-action-form-section-border-color, var(--color-dark));
      border-radius: 20px;
      padding: 2.5em;
      /* FIXME: This makes the border expansion jump weird */
      /* transition: 0.3s ease-out; */
    }

    bldn-dropdown.main-section[open] {
      padding: 2.5em 2.5em 0.5em 2.5em;
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

    bldn-dropdown bldn-dropdown > span[slot='heading'] {
      padding-left: 0;
    }

    bldn-dropdown bldn-dropdown > * {
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

    #summary-heading {
      display: flex;
      gap: 1em;
    }

    #loading-message {
      margin: 0.8em 0em;
    }

    .request-action {
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

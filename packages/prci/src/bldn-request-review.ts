import {
  ComputationAPI,
  CreatePrivacyRequestPayload,
  GivenConsentsPayload,
  PrivacyRequestDemand,
  PrivacyScopeRestriction,
  ProvenanceRestriction,
} from '@blindnet/core';
import { msg, str } from '@lit/localize';
import { css, html, LitElement, PropertyValueMap, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

import './bldn-nav-wrapper.js';
import './bldn-dropdown.js';
import './bldn-radio-list.js';
import {
  ACTION_TITLES,
  ACTION_TITLES_WITH_DEMAND,
  DATA_CATEGORY_DESCRIPTIONS,
  DATA_CATEGORY_TITLES,
  PROCESSING_CATEGORIES,
  PROCESSING_CATEGORY_DESCRIPTIONS,
  PROVENANCE_DESCRIPTIONS,
  PURPOSES,
  PURPOSE_DESCRIPTIONS,
  TARGET_DESCRIPTIONS,
  TRANSPARENCY_ACTION_DESCRIPTIONS,
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

  @state() _consents: GivenConsentsPayload[] = [];

  @state() _target: undefined | CreatePrivacyRequestPayload.target;

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
      new CustomEvent('bldn-request-review:submit-request', {
        bubbles: true,
        composed: true,
        detail: {
          target: this._target,
        },
      })
    );
  }

  handleTargetChange(e: Event) {
    e.stopPropagation();
    const { value } = (e as CustomEvent).detail;
    this._target = value;
  }

  getListTemplate(items: TemplateResult<1 | 2>[]) {
    return html`
      <ul>
        ${map(items, item => html`<li>${item}</li>`)}
      </ul>
    `;
  }

  getPrivacyScopeListTemplate(
    privacyScopes: undefined | PrivacyScopeRestriction[]
  ) {
    // Get unique values for each field of the privacy scope
    const uniqueDataCategories = [...new Set(privacyScopes!.map(ps => ps.dc))];
    const uniqueProcessingCategories = [
      ...new Set(privacyScopes!.map(ps => ps.pc)),
    ];
    const uniquePurposes = [...new Set(privacyScopes!.map(ps => ps.pp))];

    return html`
      <p>${msg('Data Categories')}</p>
      ${this.getListTemplate(
        uniqueDataCategories.map(
          dc => html`
            ${dc === '*'
              ? DATA_CATEGORY_DESCRIPTIONS[dc]()
              : html`<b>${DATA_CATEGORY_TITLES[dc]()}</b>
                  ${DATA_CATEGORY_DESCRIPTIONS[dc]()}`}
          `
        )
      )}
      <p>${msg('Processing Categories')}</p>
      ${this.getListTemplate(
        uniqueProcessingCategories.map(
          pc => html`
            ${pc === PrivacyScopeRestriction.pc._
              ? PROCESSING_CATEGORY_DESCRIPTIONS[pc]()
              : html`<b>${PROCESSING_CATEGORIES[pc]()}:</b>
                  ${PROCESSING_CATEGORY_DESCRIPTIONS[pc]()}`}
          `
        )
      )}
      <p>${msg('Purposes')}</p>
      ${this.getListTemplate(
        uniquePurposes.map(
          pp => html`
            ${pp === '*'
              ? PURPOSE_DESCRIPTIONS[pp]()
              : html`<b>${PURPOSES[pp]()}:</b> ${PURPOSE_DESCRIPTIONS[pp]()}`}
          `
        )
      )}
    `;
  }

  getDateRestrictionTemplate(demandGroup: PrivacyRequestDemand[]) {
    const start = demandGroup[0].restrictions?.date_range?.from;
    const end = demandGroup[0].restrictions?.date_range?.to;

    if (start && end) {
      return html`<p>
        ${msg(
          str`From ${new Date(start).toLocaleDateString()} to ${new Date(
            end
          ).toLocaleDateString()}`
        )}
      </p>`;
    }
    if (start) {
      return html`<p>
        ${msg(str`Since ${new Date(start).toLocaleDateString()}`)}
      </p>`;
    }
    if (end) {
      return html`<p>
        ${msg(str`Up to ${new Date(end).toLocaleDateString()}`)}
      </p>`;
    }
    return html`${msg('No valid dates!')}`;
  }

  getReviewTemplate(demandGroup: PrivacyRequestDemand[]) {
    if (demandGroup.length > 0) {
      const hasDateRestriction =
        demandGroup[0].restrictions?.date_range?.to ||
        demandGroup[0].restrictions?.date_range?.from;

      const hasProvenanceRestriction =
        demandGroup[0].restrictions?.provenance?.term &&
        demandGroup[0].restrictions.provenance.term !==
          ProvenanceRestriction.term._;

      const hasAdditionalMessage =
        demandGroup[0].message &&
        demandGroup[0].action !== PrivacyRequestDemand.action.OTHER;

      return html`
        ${choose(
          demandGroup[0].action,
          [
            [
              PrivacyRequestDemand.action.ACCESS,
              () => html`
                <p>${msg('I want to access:')}</p>
                ${this.getListTemplate(
                  demandGroup[0].restrictions!.privacy_scope!.map(
                    scope => html`
                      ${scope.dc === '*'
                        ? DATA_CATEGORY_DESCRIPTIONS[scope.dc]()
                        : html`<b>${DATA_CATEGORY_TITLES[scope.dc]()} Data:</b>
                            ${DATA_CATEGORY_DESCRIPTIONS[scope.dc]()}`}
                    `
                  )
                )}
              `,
            ],
            [
              PrivacyRequestDemand.action.DELETE,
              () => html`
                <p>${msg('I want to delete:')}</p>
                ${this.getListTemplate(
                  demandGroup[0].restrictions!.privacy_scope!.map(
                    scope => html`
                      ${scope.dc === '*'
                        ? DATA_CATEGORY_DESCRIPTIONS[scope.dc]()
                        : html`<b>${DATA_CATEGORY_TITLES[scope.dc]()} Data:</b>
                            ${DATA_CATEGORY_DESCRIPTIONS[scope.dc]()}`}
                    `
                  )
                )}
              `,
            ],
            [PrivacyRequestDemand.action.MODIFY, () => html``],
            [
              PrivacyRequestDemand.action.OBJECT,
              () => html`
                <p>
                  ${msg(
                    'I object to the processing of my data within the following scope:'
                  )}
                </p>
                ${this.getPrivacyScopeListTemplate(
                  demandGroup[0].restrictions?.privacy_scope
                )}
              `,
            ],
            [
              PrivacyRequestDemand.action.RESTRICT,
              () => html`
                <p>
                  ${msg(
                    'I restrict the processing of my data to the following scope:'
                  )}
                </p>
                ${this.getPrivacyScopeListTemplate(
                  demandGroup[0].restrictions?.privacy_scope
                )}
              `,
            ],
            [
              PrivacyRequestDemand.action.REVOKE_CONSENT,
              () => html`
                <p>${msg('I revoke the following consents:')}</p>
                ${this.getListTemplate(
                  this._consents
                    .filter(
                      c =>
                        demandGroup.findIndex(
                          demand => demand.restrictions!.consent!.id === c.id
                        ) > -1
                    )
                    .map(
                      c =>
                        html`${c.name} -
                          <i
                            >${msg(
                              html`Given on ${new Date(c.date).toLocaleString()}`
                            )}</i
                          >`
                    )
                )}
              `,
            ],
            [
              PrivacyRequestDemand.action.OTHER,
              () => html`
                <p>${msg('Details of my demand:')}</p>
                <i>${demandGroup[0].message}</i>
              `,
            ],
          ],
          () => html`
            ${when(
              demandGroup[0].action.includes('TRANSPARENCY'),
              () => html`
                <p>${msg('I want to know:')}</p>
                ${this.getListTemplate(
                  demandGroup.map(
                    demand => html`
                      ${TRANSPARENCY_ACTION_DESCRIPTIONS[demand.action]()}
                    `
                  )
                )}
              `
            )}
          `
        )}
        <!-- Show other options selections if different than the default -->
        ${when(
          hasDateRestriction ||
            hasProvenanceRestriction ||
            hasAdditionalMessage,
          () => html`
            <p>${msg('Other options:')}</p>
            <ul>
              ${when(
                hasDateRestriction,
                () => html`
                  <li><p>${msg('Date Restriction')}</p></li>
                  ${this.getDateRestrictionTemplate(demandGroup)}
                `
              )}
              ${when(
                hasProvenanceRestriction,
                () => html`
                  <li><p>${msg('Provenance Restriction')}</p></li>
                  ${PROVENANCE_DESCRIPTIONS[
                    demandGroup[0].restrictions!.provenance!.term
                  ]()}
                `
              )}
              ${when(
                hasAdditionalMessage,
                () => html`
                  <li><p>${msg('Other Message')}</p></li>
                  ${demandGroup[0].message}
                `
              )}
            </ul>
          `
        )}
      `;
    }
    return html`${msg('No demands to review!')}`;
  }

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (
      _changedProperties.has('demandGroups') &&
      this.demandGroups.findIndex(
        group =>
          group.findIndex(
            d => d.action === PrivacyRequestDemand.action.REVOKE_CONSENT
          ) > 0
      ) > 0
    ) {
      // Get consents
      if (ComputationAPI.getInstance().apiTokenSet()) {
        ComputationAPI.getInstance()
          .getUserConsents()
          .then(consents => {
            this._consents = consents;
          });
      } else {
        // TODO: Set some error message here that is the same for all forms
        // eslint-disable-next-line no-console
        console.log('User must be authenticated!');
      }
    }
  }

  render() {
    return html`
      <bldn-nav-wrapper
        left-button="Cancel Request"
        right-button="Submit Request"
        @bldn-nav-wrapper:left-click=${this.handleCancelClick}
        @bldn-nav-wrapper:right-click=${this.handleSubmitClick}
      >
        <bldn-dropdown class="main-section" mode="major" open>
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
                        >${ACTION_TITLES_WITH_DEMAND[
                          group[0].action.split('.')[0]
                        ]()} ${msg('Demand', {
                  id: 'demand-used-after-action',
                })}</strong
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
                checked: target === CreatePrivacyRequestPayload.target.PARTNERS,
              })
            )}
            @bldn-radio-list:choice-change=${this.handleTargetChange}
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

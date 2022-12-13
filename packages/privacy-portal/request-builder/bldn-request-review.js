import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { PrivacyScopeRestriction, ProvenanceRestriction, PrivacyRequestDemand, ComputationAPI, CreatePrivacyRequestPayload } from '@blindnet/core';
import { msg, str } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { choose } from 'lit/directives/choose.js';
import './bldn-nav-wrapper.js';
import '@blindnet/core-ui';
import { DATA_CATEGORY_DESCRIPTIONS, DATA_CATEGORY_TITLES, PROCESSING_CATEGORY_DESCRIPTIONS, PROCESSING_CATEGORIES, PURPOSE_DESCRIPTIONS, PURPOSES, TRANSPARENCY_ACTION_DESCRIPTIONS, PROVENANCE_DESCRIPTIONS, ACTION_TITLES_WITH_DEMAND, TARGET_DESCRIPTIONS } from '../utils/dictionary.js';

const editSvg = new URL(new URL('../assets/akar-icons_edit.svg', import.meta.url).href, import.meta.url).href;
const deleteSvg = new URL(new URL('../assets/akar-icons_trash-can.svg', import.meta.url).href, import.meta.url).href;
/**
 * @event {CustomEvent} bldn-request-review:edit-demands
 * @event {CustomEvent} bldn-request-review:delete-demands
 * @event {CustomEvent} bldn-request-review:back-click'
 * @event {Event} bldn-request-review:submit-request'
 */
let BldnRequestReview = class BldnRequestReview extends LitElement {
    constructor() {
        super(...arguments);
        /** @prop */
        this.demandGroups = [];
        this._consents = [];
    }
    handleEditDemandGroupClick(demandGroupIndex) {
        this.dispatchEvent(new CustomEvent('bldn-request-review:edit-demands', {
            bubbles: true,
            composed: true,
            detail: {
                demandGroupIndex,
            },
        }));
    }
    handleDeleteDemandGroupClick(demandGroupIndex) {
        this.dispatchEvent(new CustomEvent('bldn-request-review:delete-demands', {
            bubbles: true,
            composed: true,
            detail: {
                demandGroupIndex,
            },
        }));
    }
    handleBackClick() {
        this.dispatchEvent(new CustomEvent('bldn-request-review:back-click', {
            bubbles: true,
            composed: true,
            detail: {
                demandGroupIndex: 0,
            },
        }));
    }
    handleSubmitClick() {
        this.dispatchEvent(new CustomEvent('bldn-request-review:submit-request', {
            bubbles: true,
            composed: true,
            detail: {
                target: this._target,
            },
        }));
    }
    handleTargetChange(e) {
        e.stopPropagation();
        const { value } = e.detail;
        this._target = value;
    }
    getListTemplate(items) {
        return html `
      <ul>
        ${map(items, item => html `<li>${item}</li>`)}
      </ul>
    `;
    }
    getPrivacyScopeListTemplate(privacyScopes) {
        // Get unique values for each field of the privacy scope
        const uniqueDataCategories = [...new Set(privacyScopes.map(ps => ps.dc))];
        const uniqueProcessingCategories = [
            ...new Set(privacyScopes.map(ps => ps.pc)),
        ];
        const uniquePurposes = [...new Set(privacyScopes.map(ps => ps.pp))];
        return html `
      <p>${msg('Data Categories')}</p>
      ${this.getListTemplate(uniqueDataCategories.map(dc => html `
            ${dc === '*'
            ? DATA_CATEGORY_DESCRIPTIONS[dc]()
            : html `<b>${DATA_CATEGORY_TITLES[dc]()}</b>
                  ${DATA_CATEGORY_DESCRIPTIONS[dc]()}`}
          `))}
      <p>${msg('Processing Categories')}</p>
      ${this.getListTemplate(uniqueProcessingCategories.map(pc => html `
            ${pc === PrivacyScopeRestriction.pc._
            ? PROCESSING_CATEGORY_DESCRIPTIONS[pc]()
            : html `<b>${PROCESSING_CATEGORIES[pc]()}:</b>
                  ${PROCESSING_CATEGORY_DESCRIPTIONS[pc]()}`}
          `))}
      <p>${msg('Purposes')}</p>
      ${this.getListTemplate(uniquePurposes.map(pp => html `
            ${pp === '*'
            ? PURPOSE_DESCRIPTIONS[pp]()
            : html `<b>${PURPOSES[pp]()}:</b> ${PURPOSE_DESCRIPTIONS[pp]()}`}
          `))}
    `;
    }
    getDateRestrictionTemplate(demandGroup) {
        var _a, _b, _c, _d;
        const start = (_b = (_a = demandGroup[0].restrictions) === null || _a === void 0 ? void 0 : _a.date_range) === null || _b === void 0 ? void 0 : _b.from;
        const end = (_d = (_c = demandGroup[0].restrictions) === null || _c === void 0 ? void 0 : _c.date_range) === null || _d === void 0 ? void 0 : _d.to;
        if (start && end) {
            return html `<p>
        ${msg(str `From ${new Date(start).toLocaleDateString()} to ${new Date(end).toLocaleDateString()}`)}
      </p>`;
        }
        if (start) {
            return html `<p>
        ${msg(str `Since ${new Date(start).toLocaleDateString()}`)}
      </p>`;
        }
        if (end) {
            return html `<p>
        ${msg(str `Up to ${new Date(end).toLocaleDateString()}`)}
      </p>`;
        }
        return html `${msg('No valid dates!')}`;
    }
    getReviewTemplate(demandGroup) {
        var _a, _b, _c, _d, _e, _f;
        if (demandGroup.length > 0) {
            const hasDateRestriction = ((_b = (_a = demandGroup[0].restrictions) === null || _a === void 0 ? void 0 : _a.date_range) === null || _b === void 0 ? void 0 : _b.to) ||
                ((_d = (_c = demandGroup[0].restrictions) === null || _c === void 0 ? void 0 : _c.date_range) === null || _d === void 0 ? void 0 : _d.from);
            const hasProvenanceRestriction = ((_f = (_e = demandGroup[0].restrictions) === null || _e === void 0 ? void 0 : _e.provenance) === null || _f === void 0 ? void 0 : _f.term) &&
                demandGroup[0].restrictions.provenance.term !==
                    ProvenanceRestriction.term._;
            const hasAdditionalMessage = demandGroup[0].message &&
                demandGroup[0].action !== PrivacyRequestDemand.action.OTHER;
            return html `
        ${choose(demandGroup[0].action, [
                [
                    PrivacyRequestDemand.action.ACCESS,
                    () => html `
                <p>${msg('I want to access:')}</p>
                ${this.getListTemplate(demandGroup[0].restrictions.privacy_scope.map(scope => html `
                      ${scope.dc === '*'
                        ? DATA_CATEGORY_DESCRIPTIONS[scope.dc]()
                        : html `<b>${DATA_CATEGORY_TITLES[scope.dc]()} Data:</b>
                            ${DATA_CATEGORY_DESCRIPTIONS[scope.dc]()}`}
                    `))}
              `,
                ],
                [
                    PrivacyRequestDemand.action.DELETE,
                    () => html `
                <p>${msg('I want to delete:')}</p>
                ${this.getListTemplate(demandGroup[0].restrictions.privacy_scope.map(scope => html `
                      ${scope.dc === '*'
                        ? DATA_CATEGORY_DESCRIPTIONS[scope.dc]()
                        : html `<b>${DATA_CATEGORY_TITLES[scope.dc]()} Data:</b>
                            ${DATA_CATEGORY_DESCRIPTIONS[scope.dc]()}`}
                    `))}
              `,
                ],
                [PrivacyRequestDemand.action.MODIFY, () => html ``],
                [
                    PrivacyRequestDemand.action.OBJECT,
                    () => {
                        var _a;
                        return html `
                <p>
                  ${msg('I object to the processing of my data within the following scope:')}
                </p>
                ${this.getPrivacyScopeListTemplate((_a = demandGroup[0].restrictions) === null || _a === void 0 ? void 0 : _a.privacy_scope)}
              `;
                    },
                ],
                [
                    PrivacyRequestDemand.action.RESTRICT,
                    () => {
                        var _a;
                        return html `
                <p>
                  ${msg('I restrict the processing of my data to the following scope:')}
                </p>
                ${this.getPrivacyScopeListTemplate((_a = demandGroup[0].restrictions) === null || _a === void 0 ? void 0 : _a.privacy_scope)}
              `;
                    },
                ],
                [
                    PrivacyRequestDemand.action.REVOKE_CONSENT,
                    () => html `
                <p>${msg('I revoke the following consents:')}</p>
                ${this.getListTemplate(this._consents
                        .filter(c => demandGroup.findIndex(demand => demand.restrictions.consent.id === c.id) > -1)
                        .map(c => html `${c.name} -
                          <i
                            >${msg(html `Given on ${new Date(c.date).toLocaleString()}`)}</i
                          >`))}
              `,
                ],
                [
                    PrivacyRequestDemand.action.OTHER,
                    () => html `
                <p>${msg('Details of my demand:')}</p>
                <i>${demandGroup[0].message}</i>
              `,
                ],
            ], () => html `
            ${when(demandGroup[0].action.includes('TRANSPARENCY'), () => html `
                <p>${msg('I want to know:')}</p>
                ${this.getListTemplate(demandGroup.map(demand => html `
                      ${TRANSPARENCY_ACTION_DESCRIPTIONS[demand.action]()}
                    `))}
              `)}
          `)}
        <!-- Show other options selections if different than the default -->
        ${when(hasDateRestriction ||
                hasProvenanceRestriction ||
                hasAdditionalMessage, () => html `
            <p>${msg('Other options:')}</p>
            <ul>
              ${when(hasDateRestriction, () => html `
                  <li><p>${msg('Date Restriction')}</p></li>
                  ${this.getDateRestrictionTemplate(demandGroup)}
                `)}
              ${when(hasProvenanceRestriction, () => html `
                  <li><p>${msg('Provenance Restriction')}</p></li>
                  ${PROVENANCE_DESCRIPTIONS[demandGroup[0].restrictions.provenance.term]()}
                `)}
              ${when(hasAdditionalMessage, () => html `
                  <li><p>${msg('Other Message')}</p></li>
                  ${demandGroup[0].message}
                `)}
            </ul>
          `)}
      `;
        }
        return html `${msg('No demands to review!')}`;
    }
    willUpdate(_changedProperties) {
        if (_changedProperties.has('demandGroups') &&
            this.demandGroups.findIndex(group => group.findIndex(d => d.action === PrivacyRequestDemand.action.REVOKE_CONSENT) > 0) > 0) {
            // Get consents
            if (ComputationAPI.getInstance().apiTokenSet()) {
                ComputationAPI.getInstance()
                    .getUserConsents()
                    .then(consents => {
                    this._consents = consents;
                });
            }
            else {
                // TODO: Set some error message here that is the same for all forms
                // eslint-disable-next-line no-console
                console.log('User must be authenticated!');
            }
        }
    }
    render() {
        return html `
      <bldn-nav-wrapper
        left-button=${msg('Back')}
        right-button=${msg('Submit Request')}
        @bldn-nav-wrapper:left-click=${this.handleBackClick}
        @bldn-nav-wrapper:right-click=${this.handleSubmitClick}
      >
        <bldn-dropdown class="main-section" mode="major" open>
          <span slot="heading"><strong>${msg('Request Summary')}</strong></span>
          ${map(this.demandGroups, (group, i) => html `
              ${when(group.length > 0, () => html `
                  <bldn-dropdown>
                    <span slot="heading"
                      ><strong
                        >${ACTION_TITLES_WITH_DEMAND[group[0].action.split('.')[0]]()}</strong
                      >
                      <button class='img-button' @click=${() => this.handleEditDemandGroupClick(i)}>
                        <img src=${editSvg} alt='edit demand group'></img>
                      </button>
                      <button class='img-button' @click=${() => this.handleDeleteDemandGroupClick(i)}>
                        <img src=${deleteSvg} alt='delete demand group'></img>
                      </button>
                    </span>
                    ${this.getReviewTemplate(group)}
                  </bldn-dropdown>
                `)}
            `)}
        </bldn-dropdown>
        <bldn-dropdown id="request-target" class="main-section" mode="major">
          <span slot="heading"><strong>${msg('Request Target')}</strong></span>
          <p>${msg('I address my Privacy Request to:')}</p>
          <bldn-radio-list
            .choices=${Object.values(CreatePrivacyRequestPayload.target)
            .filter(t => t !== CreatePrivacyRequestPayload.target._)
            .map(target => ({
            display: TARGET_DESCRIPTIONS[target](),
            value: target,
            checked: target === CreatePrivacyRequestPayload.target.PARTNERS,
        }))}
            @bldn-radio-list:choice-change=${this.handleTargetChange}
          ></bldn-radio-list>
        </bldn-dropdown>
      </bldn-nav-wrapper>
    `;
    }
};
BldnRequestReview.styles = css `
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

    bldn-dropdown.main-section:not(:first-child) {
      margin-top: 2.5em;
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
__decorate([
    property({ type: Array })
], BldnRequestReview.prototype, "demandGroups", void 0);
__decorate([
    state()
], BldnRequestReview.prototype, "_consents", void 0);
__decorate([
    state()
], BldnRequestReview.prototype, "_target", void 0);
BldnRequestReview = __decorate([
    customElement('bldn-request-review')
], BldnRequestReview);

export { BldnRequestReview };
//# sourceMappingURL=bldn-request-review.js.map

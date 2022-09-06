import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { ACTION, TARGET, DATA_CATEGORY, PROVENANCE } from './models/priv-terms.js';
import { containerStyles, buttonStyles, textStyles } from './styles.js';
import { DATA_CATEGORY_DESCRIPTIONS, PROVENANCE_DESCRIPTIONS, TARGET_DESCRIPTIONS, ACTION_DESCRIPTIONS, ACTION_TITLES } from './utils/dictionary.js';
import { ComponentState } from './utils/states.js';

let ReviewView = class ReviewView extends LitElement {
    constructor() {
        super(...arguments);
        this.demandGroupId = '';
        this.demands = [];
        this.demand = { action: ACTION.ACCESS };
        this.confirmDelete = false;
        this.target = TARGET.PARTNERS;
        this._action = ACTION.ACCESS;
    }
    getAccessReviewTemplate() {
        var _a, _b, _c, _d, _e, _f;
        const from = (_b = (_a = this.demand.restrictions) === null || _a === void 0 ? void 0 : _a.date_range) === null || _b === void 0 ? void 0 : _b.from;
        const to = (_d = (_c = this.demand.restrictions) === null || _c === void 0 ? void 0 : _c.date_range) === null || _d === void 0 ? void 0 : _d.to;
        const provenance = (_e = this.demand.restrictions) === null || _e === void 0 ? void 0 : _e.provenance;
        const privacyScope = (_f = this.demand.restrictions) === null || _f === void 0 ? void 0 : _f.privacy_scope;
        return html `
      <span>${msg('I want to access:')}</span>
      <ul id="access-review-list" class="review-list">
        ${when(privacyScope &&
            Object.values(DATA_CATEGORY)
                .filter(dc => !dc.includes('.') && dc !== DATA_CATEGORY.ALL)
                .every(dc => privacyScope.map(psr => psr.dc).includes(dc)), () => html `
            <li>${DATA_CATEGORY_DESCRIPTIONS[DATA_CATEGORY.ALL]()}</li>
          `, () => {
            var _a;
            return html `
            ${map((_a = this.demand.restrictions) === null || _a === void 0 ? void 0 : _a.privacy_scope, psr => html `<li>${DATA_CATEGORY_DESCRIPTIONS[psr.dc]()}</li> `)}
          `;
        })}
      </ul>
      ${when(from || to, () => html `<p>${this.getDateRangeReviewTemplate(from, to)}</p>`)}
      ${when((provenance === null || provenance === void 0 ? void 0 : provenance.term) !== PROVENANCE.ALL, () => html `
          <p>
            ${msg('For:')} <b>${PROVENANCE_DESCRIPTIONS[provenance.term]()}</b>
          </p>
        `)}
      ${when((provenance === null || provenance === void 0 ? void 0 : provenance.target) !== TARGET.SYSTEM, () => html `
          <p>
            ${msg('From:')} <b>${TARGET_DESCRIPTIONS[provenance.target]()}</b>
          </p>
        `)}
      ${when(this.demand.message, () => html `
          <span>${msg('Plus additional info:')}</span>
          <span class="extra-msg-txt"><i>${this.demand.message}</i></span>
        `)}
    `;
    }
    getDeleteReviewTemplate() {
        var _a, _b, _c, _d, _e, _f;
        const from = (_b = (_a = this.demand.restrictions) === null || _a === void 0 ? void 0 : _a.date_range) === null || _b === void 0 ? void 0 : _b.from;
        const to = (_d = (_c = this.demand.restrictions) === null || _c === void 0 ? void 0 : _c.date_range) === null || _d === void 0 ? void 0 : _d.to;
        const provenance = (_e = this.demand.restrictions) === null || _e === void 0 ? void 0 : _e.provenance;
        const privacyScope = (_f = this.demand.restrictions) === null || _f === void 0 ? void 0 : _f.privacy_scope;
        return html `
      <span>${msg('I want to delete:')}</span>
      <ul id="delete-review-list" class="review-list">
        ${when(privacyScope &&
            Object.values(DATA_CATEGORY)
                .filter(dc => !dc.includes('.') && dc !== DATA_CATEGORY.ALL)
                .every(dc => privacyScope.map(psr => psr.dc).includes(dc)), () => html `
            <li>${DATA_CATEGORY_DESCRIPTIONS[DATA_CATEGORY.ALL]()}</li>
          `, () => {
            var _a;
            return html `
            ${map((_a = this.demand.restrictions) === null || _a === void 0 ? void 0 : _a.privacy_scope, psr => html `<li>${DATA_CATEGORY_DESCRIPTIONS[psr.dc]()}</li> `)}
          `;
        })}
      </ul>
      ${when(from || to, () => html `<p>${this.getDateRangeReviewTemplate(from, to)}</p>`)}
      ${when((provenance === null || provenance === void 0 ? void 0 : provenance.term) !== PROVENANCE.ALL, () => html `
          <p>
            ${msg('For:')} <b>${PROVENANCE_DESCRIPTIONS[provenance.term]()}</b>
          </p>
        `)}
      ${when((provenance === null || provenance === void 0 ? void 0 : provenance.target) !== TARGET.SYSTEM, () => html `
          <p>
            ${msg('From:')} <b>${TARGET_DESCRIPTIONS[provenance.target]()}</b>
          </p>
        `)}
      ${when(this.demand.message, () => html `
          <span>${msg('Plus additional info:')}</span>
          <span class="extra-msg-txt"><i>${this.demand.message}</i></span>
        `)}
    `;
    }
    getModifyReviewTemplate() {
        return html ``;
    }
    getObjectReviewTemplate() {
        return html ``;
    }
    getPortabilityReviewTemplate() {
        return html ``;
    }
    getRestrictReviewTemplate() {
        return html ``;
    }
    getRevokeReviewTemplate() {
        return html ``;
    }
    getTransparencyReviewTemplate() {
        var _a;
        const provenance = (_a = this.demands[0].restrictions) === null || _a === void 0 ? void 0 : _a.provenance;
        return html `
      <span>${msg('I want to know:')}</span>
      <ul id="transparency-review-list" class="review-list">
        ${map(this.demands, d => html ` <li><b>${ACTION_DESCRIPTIONS[d.action]()}</b></li> `)}
      </ul>
      ${when((provenance === null || provenance === void 0 ? void 0 : provenance.term) !== PROVENANCE.ALL, () => html `
          <p>
            ${msg('For:')} <b>${PROVENANCE_DESCRIPTIONS[provenance.term]()}</b>
          </p>
        `)}
      ${when(this.demands[0].message, () => html `
          <span>${msg('Plus additional info:')}</span>
          <span class="extra-msg-txt"><i>${this.demands[0].message}</i></span>
        `)}
    `;
    }
    getOtherDemandReviewTemplate() {
        return html ``;
    }
    getDateRangeReviewTemplate(from, to) {
        if (from && to) {
            return html `${msg('From')} <b>${from === null || from === void 0 ? void 0 : from.toLocaleDateString('en-GB')}</b> to
        <b>${to === null || to === void 0 ? void 0 : to.toLocaleDateString('en-GB')}</b>`;
        }
        if (from) {
            return html `${msg('Since')} <b>${from === null || from === void 0 ? void 0 : from.toLocaleDateString('en-GB')}</b>`;
        }
        if (to) {
            return html `${msg('Up to')} <b>${to === null || to === void 0 ? void 0 : to.toLocaleDateString('en-GB')}</b>`;
        }
        return html ``;
    }
    handleEditClick() {
        this.dispatchEvent(new CustomEvent('component-state-change', {
            bubbles: true,
            composed: true,
            detail: {
                newState: ComponentState.EDIT,
                // Use transparency action for any of its subtypes
                newAction: this.demands[0].action.includes('TRANSPARENCY')
                    ? ACTION.TRANSPARENCY
                    : this.demands[0].action,
                demandGroupId: this.demandGroupId,
            },
        }));
    }
    handleDeleteClick() {
        this.confirmDelete = true;
    }
    handleConfirmDeleteClick() {
        this.dispatchEvent(new CustomEvent('demand-delete', {
            bubbles: true,
            composed: true,
            detail: {
                demandGroupId: this.demandGroupId,
            },
        }));
        this.dispatchEvent(new CustomEvent('component-state-change', {
            bubbles: true,
            composed: true,
            detail: {
                newState: ComponentState.MENU,
            },
        }));
    }
    handleCancelDeleteClick() {
        this.confirmDelete = false;
    }
    handleTargetClick(e) {
        const { id } = e.target;
        this.target = id;
        this.dispatchEvent(new CustomEvent('request-target-change', {
            bubbles: true,
            composed: true,
            detail: { id },
        }));
    }
    handleSubmitClick() {
        this.dispatchEvent(new Event('submit-request', {
            bubbles: true,
            composed: true,
        }));
    }
    /**
     * Determine the action to use for this review container whenever demands changes
     * @param _changedProperties Properties that have changed in this update
     */
    willUpdate(_changedProperties) {
        if (_changedProperties.has('demands') && this.demands.length > 0) {
            this._action = this.demands[0].action;
            if (this._action.includes('TRANSPARENCY')) {
                this._action = ACTION.TRANSPARENCY;
            }
            else {
                [this.demand] = this.demands;
            }
        }
    }
    render() {
        return html `
      <span><b>${msg('My demand(s):')}</b></span>
      
      <div class="dmd-review-ctr light-border">
        <div id="review-heading-row">
          <span id="review-action-heading"><b>${ACTION_TITLES[this._action]()} demand</b></span>
          <div id="review-btns">
            <button class='svg-btn' @click=${this.handleEditClick}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m19.3 8.925-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Z"/></svg>
            </button>
            <button class='svg-btn' @click=${this.handleDeleteClick}>
              <svg viewBox="0 0 30 30" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.25 2.8125H3.75C2.71447 2.8125 1.875 3.65197 1.875 4.6875V5.625C1.875 6.66053 2.71447 7.5 3.75 7.5H26.25C27.2855 7.5 28.125 6.66053 28.125 5.625V4.6875C28.125 3.65197 27.2855 2.8125 26.25 2.8125Z" fill="black"/>
                <path d="M4.36191 9.37501C4.29603 9.37465 4.23083 9.38818 4.17054 9.41472C4.11024 9.44126 4.05622 9.48021 4.01199 9.52902C3.96777 9.57784 3.93432 9.63543 3.91385 9.69804C3.89337 9.76065 3.88632 9.82687 3.89316 9.89239L5.43476 24.6908C5.43444 24.6951 5.43444 24.6994 5.43476 24.7037C5.51531 25.3882 5.84437 26.0193 6.35949 26.4771C6.8746 26.935 7.5399 27.1878 8.22909 27.1875H21.7695C22.4585 27.1875 23.1235 26.9346 23.6384 26.4767C24.1533 26.0189 24.4822 25.388 24.5627 24.7037V24.6914L26.102 9.89239C26.1088 9.82687 26.1017 9.76065 26.0813 9.69804C26.0608 9.63543 26.0273 9.57784 25.9831 9.52902C25.9389 9.48021 25.8849 9.44126 25.8246 9.41472C25.7643 9.38818 25.6991 9.37465 25.6332 9.37501H4.36191ZM18.9436 19.9623C19.0327 20.0489 19.1037 20.1524 19.1525 20.2666C19.2013 20.3809 19.2268 20.5038 19.2277 20.6281C19.2286 20.7523 19.2048 20.8755 19.1576 20.9905C19.1105 21.1055 19.0409 21.2099 18.953 21.2978C18.8651 21.3856 18.7606 21.4551 18.6457 21.5022C18.5307 21.5493 18.4075 21.5731 18.2832 21.5722C18.1589 21.5712 18.0361 21.5456 17.9218 21.4968C17.8076 21.4479 17.7041 21.3769 17.6176 21.2877L14.9996 18.6697L12.3811 21.2877C12.2044 21.4593 11.9674 21.5545 11.7211 21.5528C11.4748 21.551 11.2392 21.4525 11.065 21.2784C10.8908 21.1043 10.7921 20.8686 10.7903 20.6224C10.7884 20.3761 10.8835 20.139 11.0551 19.9623L13.6736 17.3438L11.0551 14.7252C10.8835 14.5485 10.7884 14.3114 10.7903 14.0651C10.7921 13.8189 10.8908 13.5832 11.065 13.4091C11.2392 13.235 11.4748 13.1365 11.7211 13.1347C11.9674 13.133 12.2044 13.2282 12.3811 13.3998L14.9996 16.0178L17.6176 13.3998C17.7942 13.2282 18.0313 13.133 18.2775 13.1347C18.5238 13.1365 18.7595 13.235 18.9336 13.4091C19.1078 13.5832 19.2065 13.8189 19.2084 14.0651C19.2102 14.3114 19.1151 14.5485 18.9436 14.7252L16.325 17.3438L18.9436 19.9623Z" fill="black"/>
              </svg>
            </button>
          </div>
        </div>
        <div id="review-content">
          ${choose(this._action, [
            [ACTION.ACCESS, () => this.getAccessReviewTemplate()],
            [ACTION.DELETE, () => this.getDeleteReviewTemplate()],
            [ACTION.MODIFY, () => this.getModifyReviewTemplate()],
            [ACTION.OBJECT, () => this.getObjectReviewTemplate()],
            [ACTION.PORTABILITY, () => this.getPortabilityReviewTemplate()],
            [ACTION.RESTRICT, () => this.getRestrictReviewTemplate()],
            [ACTION.REVOKE, () => this.getRevokeReviewTemplate()],
            [ACTION.TRANSPARENCY, () => this.getTransparencyReviewTemplate()],
            [ACTION['OTHER.DEMAND'], () => this.getOtherDemandReviewTemplate()],
        ])}
        </div>
        ${when(this.confirmDelete, () => html `
            <div id="delete-confirm-popup" class="no-line-border">
              <span class="popup-txt"
                >${msg('You are about to remove a demand')}</span
              >
              <span class="popup-txt"
                >${msg(html `Do you confirm <b>deleting this demand</b>?`)}</span
              >
              <div id="popup-btns-ctr">
                <button
                  id="confirm-delete-btn"
                  class="curve-btn popup-btn"
                  @click=${this.handleConfirmDeleteClick}
                >
                  ${msg('Delete')}
                </button>
                <button
                  id="cancel-delete-btn"
                  class="curve-btn popup-btn"
                  @click=${this.handleCancelDeleteClick}
                >
                  ${msg('Cancel')}
                </button>
              </div>
            </div>
          `)}
        </div>

      </div>
      <!-- Uncomment when supporting multiple demands -->
      <!-- <div id="new-dmd-ctr" class="medium-border">
        <span><b>${msg('I want to add another demand')}</b></span>
        <button class="svg-btn">
          <img src="packages/prci/src/assets/icons/add-circle.svg" alt="add icon"></img>
        </button>
      </div> -->
      <!-- Submit button -->
      <slotted-dropdown
        header=${msg('Privacy Request Advanced settings')}
        include-buttons
      >
        <div>
          <span> ${msg('I address my Privacy Request to:')} </span>
          <fieldset class="provenance-restriction">
            ${Object.values(TARGET)
            .filter(t => t !== TARGET.ALL)
            .map(t => html `
                <input
                  id=${t}
                  name='provenance-target'
                  type='radio'
                  ?checked=${this.target === t}
                  @click=${this.handleTargetClick}>
                </input>
                <label for=${t}>${TARGET_DESCRIPTIONS[t]()}</label><br/>
              `)}
          </fieldset>
        </div>
      </slotted-dropdown>
      <button
        id="submit-btn"
        class="nav-btn ctr-btn  animated-btn"
        @click=${this.handleSubmitClick}
      >
        ${msg('Submit Privacy Request')}
      </button>
    `;
    }
};
ReviewView.styles = [
    containerStyles,
    buttonStyles,
    textStyles,
    css `
      :host {
        display: grid;
        row-gap: 20px;
      }

      :host([confirm-delete]) .dmd-review-ctr {
        background: #c4c4c4;
        opacity: 0.7;
      }

      #review-heading-row {
        display: grid;
        grid-area: 1/1/2/2;
        grid-template-columns: repeat(2, 1fr);
        z-index: 2;
      }

      .dmd-review-ctr {
        display: grid;
        row-gap: 20px;
        padding: 40px;
      }

      #review-btns {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        column-gap: 20px;
      }

      .review-btn {
        width: 24px;
        height: 24px;
      }

      #review-content {
        display: grid;
        grid-area: 2/1/3/2;
        row-gap: 20px;
        z-index: 1;
      }

      .extra-msg-txt {
        padding: 0px 0px 0px 20px;
      }

      .review-list li:not(:last-child) {
        margin: 0px 0px 20px 0px;
      }

      .review-list {
        margin: 0px;
      }

      #delete-confirm-popup {
        display: grid;
        row-gap: 20px;
        background: white;
        padding: 40px;
        z-index: 2;
        grid-area: 1/1/3/2;
        justify-self: center;
        align-self: center;
        width: 40%;
        height: 150px;
      }

      .popup-txt {
        text-align: center;
      }

      #popup-btns-ctr {
        display: flex;
        column-gap: 50px;
        justify-content: center;
      }

      .popup-btn {
        min-width: 30%;
        max-width: 200px;
        /* width: 30%; */
        font-size: 18px;
      }

      #confirm-delete-btn {
        background: red;
        color: white;
        border: none;
      }

      #cancel-delete-btn {
        background: white;
        color: black;
        border: 2px solid #18a0fb;
      }

      #submit-btn {
        transform: translateY(35px);
      }
    `,
];
__decorate([
    property({ attribute: false })
], ReviewView.prototype, "demandGroupId", void 0);
__decorate([
    property({ attribute: false })
], ReviewView.prototype, "demands", void 0);
__decorate([
    property({ attribute: false })
], ReviewView.prototype, "demand", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'confirm-delete' })
], ReviewView.prototype, "confirmDelete", void 0);
__decorate([
    property({ attribute: false })
], ReviewView.prototype, "target", void 0);
__decorate([
    state()
], ReviewView.prototype, "_action", void 0);
ReviewView = __decorate([
    customElement('review-view')
], ReviewView);

export { ReviewView };
//# sourceMappingURL=ReviewView.js.map

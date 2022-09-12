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

const editSvg = new URL(new URL('assets/edit-fill.svg', import.meta.url).href, import.meta.url).href;
const trashSvg = new URL(new URL('assets/delete.svg', import.meta.url).href, import.meta.url).href;
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
      <h4>${msg('I want to access:')}</h4>
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
          <h4>${msg('Plus additional info:')}</h4>
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
      <h4>${msg('I want to delete:')}</h4>
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
          <h4>${msg('Plus additional info:')}</h4>
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
    /**
     * FIXME: Use actual revoke texts once the endpoint provides them
     * @returns
     */
    getRevokeReviewTemplate() {
        return html `
      <h4>${msg('I no longer consent to:')}</h4>
      <ul class="review-list">
        ${map(this.demands, () => html `
            <li>
              The storage and processing of my data for the purposes of the
              prize draw
            </li>
          `)}
      </ul>
      ${when(this.demands[0].message, () => html `
          <span>${msg('Plus additional info:')}</span>
          <span class="extra-msg-txt"><i>${this.demands[0].message}</i></span>
        `)}
    `;
    }
    getTransparencyReviewTemplate() {
        var _a;
        const provenance = (_a = this.demands[0].restrictions) === null || _a === void 0 ? void 0 : _a.provenance;
        return html `
      <h4>${msg('I want to know:')}</h4>
      <ul id="transparency-review-list" class="review-list">
        ${map(this.demands, d => html ` <li><b>${ACTION_DESCRIPTIONS[d.action]()}</b></li> `)}
      </ul>
      ${when((provenance === null || provenance === void 0 ? void 0 : provenance.term) !== PROVENANCE.ALL, () => html `
          <p>
            ${msg('For:')} <b>${PROVENANCE_DESCRIPTIONS[provenance.term]()}</b>
          </p>
        `)}
      ${when(this.demands[0].message, () => html `
          <h4>${msg('Plus additional info:')}</h4>
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
      <h2><b>${msg('My demand(s):')}</b></h2>
      
      <div class="dmd-review-ctr light-border">
        <div id="review-heading-row">
          <h3 id="review-action-heading">${ACTION_TITLES[this._action]()} Demand</h3>
          <div id="review-btns">
            <button class='svg-btn' @click=${this.handleEditClick}>
              <img src=${editSvg} alt='edit'/>
            </button>
            <button class='svg-btn' @click=${this.handleDeleteClick}>
              <img src=${trashSvg} alt='delete'/>
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
        id='request-settings'  
        .header=${msg('Privacy Request Advanced settings')}
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

      #request-settings {
        margin: 20px 0px 0px 0px;
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

      h2,
      h3 {
        margin-top: 0px;
      }

      h4 {
        font-weight: normal;
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

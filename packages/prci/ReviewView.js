import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { ACTION } from './models/priv-terms.js';
import { containerStyles, buttonStyles } from './styles.js';
import { ACTION_DESCRIPTIONS, ACTION_TITLES } from './utils/dictionary.js';
import { ComponentState } from './utils/states.js';

let ReviewView = class ReviewView extends LitElement {
    constructor() {
        super(...arguments);
        this.demandGroupId = '';
        this.demands = [];
        this.confirmDelete = false;
        this._action = ACTION.ACCESS;
    }
    getAccessReviewTemplate() {
        return html ``;
    }
    getDeleteReviewTemplate() {
        return html ``;
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
        // console.log(this.demands)
        return html `
      <span>I want to know:</span>
      <ul id="transparency-review-list" class="review-list">
        ${map(this.demands, d => html ` <li><b>${ACTION_DESCRIPTIONS[d.action]()}</b></li> `)}
      </ul>
      ${when(this.demands[0].message, () => html `
          <span>${msg('Plus additional info:')}</span>
          <span id="transparency-extra-msg"
            ><i>${this.demands[0].message}</i></span
          >
        `)}
    `;
    }
    getOtherDemandReviewTemplate() {
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
        }
    }
    render() {
        return html `
      <div id="review-heading-row">
        <span id="review-action-heading"><b>${ACTION_TITLES[this._action]()} demand</b></span>
        <div id="review-btns">
          <button id="review-edit-btn" class="svg-btn review-btn" @click=${this.handleEditClick}>
            <img src="packages/prci/src/assets/icons/pepicons_pen.svg" alt="edit icon"></img>
          </button>
          <button id="review-delete-btn" class="svg-btn review-btn" @click=${this.handleDeleteClick}>
            <img src="packages/prci/src/assets/icons/ion_trash-bin.svg" alt="delete icon"></img>
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
    `;
    }
};
ReviewView.styles = [
    containerStyles,
    buttonStyles,
    css `
      :host {
        display: grid;
        row-gap: 20px;
        padding: 40px 40px 40px 40px;
      }

      :host([confirm-delete]) {
        background: #c4c4c4;
        opacity: 0.7;
      }

      #review-heading-row {
        display: grid;
        grid-area: 1/1/2/2;
        grid-template-columns: repeat(2, 1fr);
        z-index: 2;
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

      #transparency-extra-msg {
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
        width: 200px;
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
    `,
];
__decorate([
    property({ attribute: false })
], ReviewView.prototype, "demandGroupId", void 0);
__decorate([
    property({ attribute: false })
], ReviewView.prototype, "demands", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'confirm-delete' })
], ReviewView.prototype, "confirmDelete", void 0);
__decorate([
    state()
], ReviewView.prototype, "_action", void 0);
ReviewView = __decorate([
    customElement('review-view')
], ReviewView);

export { ReviewView };
//# sourceMappingURL=ReviewView.js.map

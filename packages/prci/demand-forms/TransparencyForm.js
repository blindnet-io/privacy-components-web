import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, html } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { ACTION, PROVENANCE } from '../models/priv-terms.js';
import { containerStyles, buttonStyles, textStyles, imgStyles } from '../styles.js';
import { enabledActions } from '../utils/conf.js';
import { ACTION_DESCRIPTIONS, PROVENANCE_DESCRIPTIONS } from '../utils/dictionary.js';
import { ActionForm } from './ActionForm.js';
import { FormComponentState } from '../utils/states.js';
import '../SlottedDropdown.js';
import '../AllChecklist.js';

/**
 * ActionForm for the Transparency PRIV action. Includes a dropdown and text element.
 *
 * The transparency form follows a different pattern than the other actions, as each
 * TRANSPARENCY.* actually represents a completely separate demand, but we display them
 * all in one DemandBuilder element.
 */
let TransparencyForm = class TransparencyForm extends ActionForm {
    constructor() {
        super();
        this.transparencyActions = Object.values(ACTION).filter(a => a.includes('TRANSPARENCY.'));
        this.advancedSettings = [];
        this._additionalMessage = '';
        this._provenances = new Set();
        // Transparency action listeners
        this.addEventListener('transparency-action-select', e => {
            const details = e.detail;
            const demand = {
                action: details.id,
                message: this._additionalMessage,
                restrictions: this._provenances,
            };
            this.setDemand(demand);
        });
        this.addEventListener('transparency-action-deselect', e => {
            const { id } = e.detail;
            this.deleteDemand(id);
        });
        // Provenance listeners
        this.addEventListener('provenance-select', e => {
            const { id } = e.detail;
            this._provenances.add(id);
            this.demands.forEach(d => {
                var _a;
                const demand = d;
                (_a = demand.restrictions) === null || _a === void 0 ? void 0 : _a.add(id);
            });
        });
        this.addEventListener('provenance-deselect', e => {
            const { id } = e.detail;
            this._provenances.delete(id);
            this.demands.forEach(d => {
                var _a;
                const demand = d;
                (_a = demand.restrictions) === null || _a === void 0 ? void 0 : _a.delete(id);
            });
        });
        // Additional message listener
        this.addEventListener('text-element-change', e => {
            var _a;
            this._additionalMessage = (_a = e.detail) === null || _a === void 0 ? void 0 : _a.text;
            this.demands.forEach(d => {
                const demand = d;
                demand.message = this._additionalMessage;
            });
        });
    }
    handleAdditionalMessageInput(e) {
        const event = new CustomEvent('text-element-change', {
            bubbles: true,
            composed: true,
            detail: {
                text: e.target.value,
            },
        });
        this.dispatchEvent(event);
    }
    validate() {
        return true;
    }
    /**
     * The defualt transparency demand contains all transparency actions
     * @returns List of demands with each TRANSPARENCY.* action
     */
    getDefaultDemands() {
        return Object.values(ACTION)
            .filter(a => a.includes('TRANSPARENCY.'))
            .map(a => ({
            action: a,
            restrictions: new Set(Object.values(PROVENANCE)),
        }));
    }
    getEditTemplate(demands) {
        var _a;
        const selectedActions = Object.values(demands).map(d => d.action);
        return html `
      <p id="edit-heading-1">
        <b>${msg('Details of my TRANSPARENCY Demand')}</b>
      </p>

      <div class="light-border transparency-options">
        <span slot="prompt"><b>${msg('I want to know:')}</b></span>
        <all-checklist
          .choices=${this.transparencyActions.map(a => {
            var _a;
            return ({
                id: a,
                description: ACTION_DESCRIPTIONS[a](),
                checked: selectedActions.includes(a),
                disabled: (_a = !enabledActions.get(a)) !== null && _a !== void 0 ? _a : true,
            });
        })}
          all-message=${msg('ALL information related to data processing practices and know if the organization has data on me')}
          component-mode=${FormComponentState.CLOSED}
          event-prefix="transparency-action"
          include-buttons
        ></all-checklist>
      </div>

      <slotted-dropdown header=${msg('Advanced settings')} include-buttons>
        <span slot="prompt"
          ><b
            >${msg('My transparency demand applies to the following provenance:')}</b
          ></span
        >
        <all-checklist
          .choices=${Object.values(PROVENANCE).map(p => {
            var _a;
            return ({
                id: p,
                description: PROVENANCE_DESCRIPTIONS[p](),
                checked: (_a = this.demands[0].restrictions) === null || _a === void 0 ? void 0 : _a.has(p),
                disabled: false,
            });
        })}
          all-message=${msg('All provenances')}
          component-mode=${FormComponentState.OPEN}
          event-prefix="provenance"
        ></all-checklist>
      </slotted-dropdown>
      <slotted-dropdown
        header=${msg('Additional message (optional)')}
        include-buttons
      >
        <div class="additional-msg-ctr">
          <span class="">${msg('My additional message:')}</span>
          <span class="italic"
            >${msg('Please note that adding a personalized message might lead to the demand taking longer to be processed')}</span
          >
          <textarea
            id="additional-msg"
            class="std-txt-area"
            name="paragraph_text"
            cols="50"
            rows="10"
            @input=${this.handleAdditionalMessageInput}
            .value=${demands.length !== 0 ? (_a = demands[0].message) !== null && _a !== void 0 ? _a : '' : ''}
          ></textarea>
        </div>
      </slotted-dropdown>
    `;
    }
    getReviewTemplate() {
        // TODO: Delete
        return html `
      <div id="dmd-ctr">
        <p id="review-hd-1"><b>${msg('TRANSPARENCY demand')}</b></p>
        <p>${msg('I want to know:')}</p>
        <ul id="transparency-demand-review-list">
          ${Array.from(this.demands.values()).map((a) => html ` <li><b>${ACTION_DESCRIPTIONS[a.action]()}</b></li> `)}
        </ul>
        ${this._additionalMessage
            ? html `
              <p>${msg('Plus additional info:')}</p>
              <p id="extra-msg-txt"><i>${this._additionalMessage}</i></p>
            `
            : null}
      </div>
    `;
    }
};
TransparencyForm.styles = [
    ActionForm.styles,
    containerStyles,
    buttonStyles,
    textStyles,
    imgStyles,
    css `
      :host {
        display: grid;
        row-gap: 35px;
        align-content: flex-start;
        margin: 0px;
      }

      .transparency-options {
        padding: 40px 40px 20px 40px;
      }

      #dmd-ctr {
        display: grid;
        row-gap: 20px;
      }

      #dmd-ctr ul {
        margin: 0;
      }

      #dmd-ctr li:not(:last-child) {
        margin-bottom: 15px;
      }

      #edit-heading-1 {
        font-weight: bold;
        grid-column: 1/2;
        padding: 0px;
      }

      p {
        margin: 0px;
      }

      .additional-msg-ctr {
        display: grid;
        row-gap: 20px;
        margin: 0px 0px 25px 0px;
      }
    `,
];
__decorate([
    property({ type: Array, attribute: false })
], TransparencyForm.prototype, "transparencyActions", void 0);
__decorate([
    property({ type: Array })
], TransparencyForm.prototype, "advancedSettings", void 0);
__decorate([
    state()
], TransparencyForm.prototype, "_additionalMessage", void 0);
__decorate([
    state()
], TransparencyForm.prototype, "_provenances", void 0);
TransparencyForm = __decorate([
    customElement('transparency-form')
], TransparencyForm);

export { TransparencyForm };
//# sourceMappingURL=TransparencyForm.js.map

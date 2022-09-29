import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, html } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { ACTION, PROVENANCE } from '@blindnet/core';
import { enabledActions } from '../utils/conf.js';
import { ACTION_DESCRIPTIONS, PROVENANCE_DESCRIPTIONS } from '../utils/dictionary.js';
import { MultiDemandForm } from './MultiDemandForm.js';
import { FormComponentState } from '../utils/states.js';
import '../AllChecklist.js';
import { PRCIStyles } from '../styles.js';

/**
 * MultiDemandForm for the Transparency PRIV action. Includes a dropdown and text element.
 *
 * The transparency form follows a different pattern than the other actions, as each
 * TRANSPARENCY.* actually represents a completely separate demand, but we display them
 * all in one form.
 */
let TransparencyForm = class TransparencyForm extends MultiDemandForm {
    constructor() {
        super();
        this.transparencyActions = Object.values(ACTION).filter(a => a.includes('TRANSPARENCY.'));
        this.advancedSettings = [];
        this.restrictions = {};
        this._additionalMessage = '';
        // Transparency action listeners
        this.addEventListener('transparency-action-select', e => {
            const details = e.detail;
            const demand = {
                action: details.id,
                message: this._additionalMessage,
                restrictions: this.restrictions,
            };
            this.setDemand(demand);
        });
        this.addEventListener('transparency-action-deselect', e => {
            const { id } = e.detail;
            this.deleteDemand(id);
        });
    }
    handleProvenanceTermClick(e) {
        const { id } = e.target;
        this.restrictions.provenance = { term: id };
        this.demands.forEach(d => {
            const demand = d;
            demand.restrictions.provenance.term = id;
        });
    }
    handleAdditionalMessageInput(e) {
        this._additionalMessage = e.target.value;
        this.demands.forEach(d => {
            const demand = d;
            demand.message = this._additionalMessage;
        });
    }
    // TODO: Make the transparency form follow our new template
    buildDemands() {
        return this.demands;
    }
    validate() {
        return true;
    }
    getFormTemplate() {
        var _a;
        const selectedActions = Object.values(this.demands).map(d => d.action);
        return html `
      <p id="edit-heading-1">
        <b>${msg('Details of my TRANSPARENCY Demand')}</b>
      </p>

      <div class="border--light border--rounded transparency-options">
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
        <div>
          <span>
            ${msg('My demand applies to data from the following provenance:')}
          </span>
          <fieldset class="provenance-restriction">
            ${Object.values(PROVENANCE).map(p => {
            var _a, _b;
            return html `
                <input
                  id=${p}
                  name='provenance-term'
                  type='radio'
                  ?checked=${((_b = (_a = this.demands[0].restrictions) === null || _a === void 0 ? void 0 : _a.provenance) === null || _b === void 0 ? void 0 : _b.term) === p}
                  @click=${this.handleProvenanceTermClick}>
                </input>
                <label for=${p}>${PROVENANCE_DESCRIPTIONS[p]()}</label><br/>
              `;
        })}
          </fieldset>
        </div>
      </slotted-dropdown>
      <slotted-dropdown
        header=${msg('Additional message (optional)')}
        include-buttons
      >
        <div class="additional-msg-ctr">
          <span class="">${msg('My additional message:')}</span>
          <span
            ><i
              >${msg('Please note that adding a personalized message might lead to the demand taking longer to be processed')}</i
            ></span
          >
          <textarea
            id="additional-msg"
            class="std-txt-area"
            name="paragraph_text"
            cols="50"
            rows="10"
            @input=${this.handleAdditionalMessageInput}
            .value=${this.demands.length !== 0
            ? (_a = this.demands[0].message) !== null && _a !== void 0 ? _a : ''
            : ''}
          ></textarea>
        </div>
      </slotted-dropdown>
    `;
    }
};
TransparencyForm.styles = [
    MultiDemandForm.styles,
    PRCIStyles,
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
    property({ attribute: false })
], TransparencyForm.prototype, "restrictions", void 0);
__decorate([
    state()
], TransparencyForm.prototype, "_additionalMessage", void 0);
TransparencyForm = __decorate([
    customElement('transparency-form')
], TransparencyForm);

export { TransparencyForm };
//# sourceMappingURL=TransparencyForm.js.map

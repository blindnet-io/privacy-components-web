import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { PROCESSING_CATEGORY, PURPOSE, PROVENANCE, TARGET } from '../models/priv-terms.js';
import { containerStyles, buttonStyles, textStyles, imgStyles } from '../styles.js';
import { DATA_CATEGORY_DESCRIPTIONS, PROVENANCE_DESCRIPTIONS, TARGET_DESCRIPTIONS } from '../utils/dictionary.js';
import { DemandForm } from './DemandForm.js';
import { FormComponentState } from '../utils/states.js';
import '../AllChecklist.js';

/**
 * ActionForm for the Delete PRIV action.
 */
let DeleteForm = class DeleteForm extends DemandForm {
    constructor() {
        super();
        this.allowedDataCategories = [];
        // Data category listeners
        this.addEventListener('delete-option-select', e => {
            const { id } = e.detail;
            this.demand.restrictions.privacy_scope.push({
                dc: id,
                pc: PROCESSING_CATEGORY.ALL,
                pp: PURPOSE.ALL,
            });
        });
        this.addEventListener('delete-option-deselect', e => {
            const { id } = e.detail;
            this.demand.restrictions.privacy_scope.splice(this.demand.restrictions.privacy_scope.findIndex(psr => psr.dc === id), 1);
        });
        // FIXME: Disabled until we resolve how to handle OTHER-DATA
        // this.addEventListener('delete-option-other-click', e => {
        //   const { checked } = (e as CustomEvent).detail;
        //   if (checked) {
        //     this.demand.dataCategory?.add(DATA_CATEGORY['OTHER-DATA']);
        //   } else {
        //     this.demand.dataCategory?.delete(DATA_CATEGORY['OTHER-DATA']);
        //   }
        // });
        // this.addEventListener('delete-option-other-input', e => {
        //   const { text } = (e as CustomEvent).detail
        //   // TODO: What demand field to put the other-data category
        // })
    }
    handleAdditionalMessageInput(e) {
        const { value } = e.target;
        this.demand.message = value;
    }
    handleProvenanceTermClick(e) {
        const { id } = e.target;
        this.demand.restrictions.provenance.term = id;
    }
    handleProvenanceTargetClick(e) {
        const { id } = e.target;
        this.demand.restrictions.provenance.target = id;
    }
    handleDateRestrictionInput(e) {
        var _a, _b, _c, _d;
        const { id, value } = e.target;
        if (id === 'date-start') {
            if (value) {
                this.demand.restrictions.date_range.from = new Date(value);
            }
            else {
                // Value is false when user hits 'clear' button on date picker
                (_b = (_a = this.demand.restrictions) === null || _a === void 0 ? void 0 : _a.date_range) === null || _b === void 0 ? true : delete _b.from;
            }
        }
        else if (id === 'date-end') {
            if (value) {
                this.demand.restrictions.date_range.to = new Date(value);
            }
            else {
                (_d = (_c = this.demand.restrictions) === null || _c === void 0 ? void 0 : _c.date_range) === null || _d === void 0 ? true : delete _d.to;
            }
        }
    }
    validate() {
        return true;
    }
    getFormTemplate(demand) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return html `
      <div id="delete-form">
        <p id="edit-heading-1">
          <b>${msg('Details of my DELETE Demand')}</b>
        </p>

        <div class="light-border delete-options">
          <span slot="prompt">${msg('I want to delete:')}</span>
          <all-checklist
            .choices=${this.allowedDataCategories.map(dc => {
            var _a, _b;
            return ({
                id: dc,
                description: DATA_CATEGORY_DESCRIPTIONS[dc](),
                checked: ((_b = (_a = demand.restrictions) === null || _a === void 0 ? void 0 : _a.privacy_scope) === null || _b === void 0 ? void 0 : _b.findIndex(psr => psr.dc === dc)) !== -1,
                disabled: false,
            });
        })}
            all-message=${msg('ALL categories of data the organization has data on me')}
            component-mode=${FormComponentState.CLOSED}
            event-prefix="delete-option"
            include-buttons
          ></all-checklist>
        </div>

        <slotted-dropdown header=${msg('Advanced settings')} include-buttons>
          <div class="date-restriction-ctr">
            <p>
              ${msg('Specify a date range for the selected category(ies) of data:')}
            </p>
            <div>
              <span>${msg('From')}</span>
              <input
                id="date-start"
                type="date"
                .value=${((_b = (_a = demand.restrictions) === null || _a === void 0 ? void 0 : _a.date_range) === null || _b === void 0 ? void 0 : _b.from)
            ? (_d = (_c = demand.restrictions) === null || _c === void 0 ? void 0 : _c.date_range) === null || _d === void 0 ? void 0 : _d.from.toISOString().split('T')[0]
            : ''}
                @input=${this.handleDateRestrictionInput}
              />
              <span>${msg('to')}</span>
              <input
                id="date-end"
                type="date"
                .value=${((_f = (_e = demand.restrictions) === null || _e === void 0 ? void 0 : _e.date_range) === null || _f === void 0 ? void 0 : _f.to)
            ? (_h = (_g = demand.restrictions) === null || _g === void 0 ? void 0 : _g.date_range) === null || _h === void 0 ? void 0 : _h.to.toISOString().split('T')[0]
            : ''}
                @input=${this.handleDateRestrictionInput}
              />
            </div>
          </div>
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
                    ?checked=${((_b = (_a = demand.restrictions) === null || _a === void 0 ? void 0 : _a.provenance) === null || _b === void 0 ? void 0 : _b.term) === p}
                    @click=${this.handleProvenanceTermClick}>
                  </input>
                  <label for=${p}>${PROVENANCE_DESCRIPTIONS[p]()}</label><br/>
                `;
        })}
            </fieldset>
          </div>
          <div>
            <span> ${msg('I address my demand to:')} </span>
            <fieldset class="provenance-restriction">
              ${Object.values(TARGET)
            .filter(t => t !== TARGET.ALL)
            .map(t => {
            var _a, _b;
            return html `
                  <input
                    id=${t}
                    name='provenance-target'
                    type='radio'
                    ?checked=${((_b = (_a = demand.restrictions) === null || _a === void 0 ? void 0 : _a.provenance) === null || _b === void 0 ? void 0 : _b.target) === t}
                    @click=${this.handleProvenanceTargetClick}>
                  </input>
                  <label for=${t}>${TARGET_DESCRIPTIONS[t]()}</label><br/>
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
              .value=${(_j = demand.message) !== null && _j !== void 0 ? _j : ''}
            ></textarea>
          </div>
        </slotted-dropdown>
      </div>
    `;
    }
};
DeleteForm.styles = [
    DemandForm.styles,
    containerStyles,
    buttonStyles,
    textStyles,
    imgStyles,
    css `
      #delete-form {
        display: grid;
        row-gap: 35px;
        align-content: flex-start;
        margin: 0px;
      }

      .delete-options {
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
], DeleteForm.prototype, "allowedDataCategories", void 0);
DeleteForm = __decorate([
    customElement('delete-form')
], DeleteForm);

export { DeleteForm };
//# sourceMappingURL=DeleteForm.js.map

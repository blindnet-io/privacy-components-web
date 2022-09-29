import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, html } from 'lit';
import { state, customElement } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { ACTION } from '@blindnet/core';
import { MultiDemandForm } from './MultiDemandForm.js';
import '../AllChecklist.js';
import { PRCIStyles } from '../styles.js';

/**
 * ActionForm for the REVOKE PRIV action.
 */
let RevokeConsentForm = class RevokeConsentForm extends MultiDemandForm {
    constructor() {
        super();
        // @state() _selectedConsentIds: Set<Restrictions> = new Set<Restrictions>();
        this._additionalMessage = '';
        this._revokeAll = true;
        this._allConsentIds = [];
        this._selectedConsentIds = new Set();
        // FIXME: For now, we hardcode the demo consent ID here. Once we have an endpoint for
        // it we should fetch all IDs for the current user here instead.
        this._allConsentIds = ['28b5bee0-9db8-40ec-840e-64eafbfb9ddd'];
    }
    handleAdditionalMessageInput(e) {
        this._additionalMessage = e.target.value;
        this.demands.forEach(d => {
            const demand = d;
            demand.message = this._additionalMessage;
        });
    }
    handleRevokeAllClick() {
        this._revokeAll = true;
        // Add a consent restriction for all IDs
        this._selectedConsentIds = new Set(this._allConsentIds);
    }
    handleRevokeSomeClick() {
        this._revokeAll = false;
        // Set to no restrictions, user selects the consents they want to revoke
        this._selectedConsentIds.clear();
    }
    /**
     * Add or remove a consent restriction for the clicked consent
     * @param e Click event
     */
    handleConsentClick(e) {
        const { id, checked } = e.target;
        if (id && checked) {
            this._selectedConsentIds.add(id);
        }
        else if (id) {
            this._selectedConsentIds.delete(id);
        }
    }
    validate() {
        return true;
    }
    /**
     * Create a list of REVOKE demands, one per each consent restriction
     * @returns List of Demand objects
     */
    buildDemands() {
        return Array.from(this._selectedConsentIds).map((id) => ({
            action: ACTION.REVOKE,
            restrictions: { consent: { id } },
        }));
    }
    /**
     * FIXME: Once we fetch restrictions, only do this once they have loaded
     * @param _changedProperties
     */
    willUpdate(_changedProperties) {
        if (_changedProperties.has('demands')) {
            // Reset restrictions and get new ones from demands
            this._selectedConsentIds.clear();
            this.demands.forEach(d => {
                if (d.restrictions && d.restrictions.consent) {
                    this._selectedConsentIds.add(d.restrictions.consent.id);
                }
            });
            // If we got consent restriction(s) from demands, select only those
            if (this._selectedConsentIds.size > 0) {
                // Set revokeAll if every possible consent is included in the restrictions passed in
                this._revokeAll = this._allConsentIds.every(id => this._selectedConsentIds.has(id));
            }
            else {
                // Default to revoke all if no consent restrictions passed in
                this._revokeAll = true;
                this._selectedConsentIds = new Set(this._allConsentIds);
            }
        }
    }
    getFormTemplate() {
        return html `
      <div id="revoke-consent-form-ctr">
        <h2>${msg('Details of my REVOKE CONSENT Demand')}</h2>

        ${when(this._allConsentIds.length > 0, () => html `
            <fieldset id="revoke-type-btns">
              <input
                id="revoke-all-radio"
                name="revoke-type"
                type="radio"
                ?checked=${this._revokeAll}
                @click=${this.handleRevokeAllClick}
              />
              <label for="revoke-all-radio"
                >${msg(html `Revoke <strong>all</strong> consents`)}</label
              ><br />
              <input
                id="revoke-some-radio"
                name="revoke-type"
                type="radio"
                ?checked=${!this._revokeAll}
                @click=${this.handleRevokeSomeClick}
              />
              <label for="revoke-some-radio"
                >${msg(html `Revoke <strong>some</strong> consents`)}</label
              >
            </fieldset>

            ${when(!this._revokeAll, () => html `
                <div id="consents-ctr" class="border--light border--rounded">
                  <h3>
                    ${msg(html `Check the consents you wish to
                        <strong>revoke</strong>:`)}
                  </h3>
                  <ul>
                    ${map(this._allConsentIds, id => html `
                  <li><input id=${id} type='checkbox' @click=${this.handleConsentClick} ?checked=${this._selectedConsentIds.has(id)}><label for=${id}><strong>I no longer consent to</strong> the storage and processing of my data for the purposes of the prize draw.</label></input></li>
                `)}
                  </ul>
                </div>
              `)}

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
                  .value=${this._additionalMessage}
                ></textarea>
              </div>
            </slotted-dropdown>
          `)}
      </div>
    `;
    }
};
RevokeConsentForm.styles = [
    MultiDemandForm.styles,
    PRCIStyles,
    css `
      #revoke-consent-form-ctr {
        display: grid;
        row-gap: 40px;
      }

      #revoke-type-btns {
        border: none;
        padding: 0px;
        margin: 0px;
      }

      #revoke-type-btns input[type='radio'] {
        -ms-transform: scale(1.5); /* IE 9 */
        -webkit-transform: scale(1.5); /* Chrome, Safari, Opera */
        transform: scale(1.5);
        margin: 3px 10px 0px 5px;
      }

      #revoke-type-btns input:not(:nth-last-child(2)) {
        margin-bottom: 25px;
      }

      #consents-ctr {
        padding: 40px;
      }

      #consents-ctr ul {
        list-style-type: none;
        margin-bottom: 0px;
      }

      #consents-ctr ul li input {
        margin: 3px 10px 3px 4px;
      }

      .revoke-options {
        padding: 40px 40px 20px 40px;
      }

      .additional-msg-ctr {
        display: grid;
        row-gap: 20px;
      }
    `,
];
__decorate([
    state()
], RevokeConsentForm.prototype, "_additionalMessage", void 0);
__decorate([
    state()
], RevokeConsentForm.prototype, "_revokeAll", void 0);
__decorate([
    state()
], RevokeConsentForm.prototype, "_allConsentIds", void 0);
__decorate([
    state()
], RevokeConsentForm.prototype, "_selectedConsentIds", void 0);
RevokeConsentForm = __decorate([
    customElement('revoke-consent-form')
], RevokeConsentForm);

export { RevokeConsentForm };
//# sourceMappingURL=RevokeConsentForm.js.map

import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { ACTION } from '../models/priv-terms.js';
import { PRCIStyles } from '../styles.js';
import { DemandState, ComponentState } from '../utils/states.js';

/**
 * Abstract class for a form that allows the user to create or edit a demand.
 */
class DemandForm extends LitElement {
    constructor() {
        super(...arguments);
        this.demandState = DemandState.EDIT_OPEN;
        this.demand = { action: ACTION.ACCESS };
        // eslint-disable-next-line no-restricted-globals
        this.demandGroupId = self.crypto.randomUUID();
        this.default = false;
    }
    /**
     * Send this demand up to the top level component to add to the Privacy Request
     * @param demandGroupId uuid of this demand group
     * @param demand demand to add
     */
    addToPrivacyRequest(demandGroupId, demand) {
        this.dispatchEvent(new CustomEvent('demand-set', {
            bubbles: true,
            composed: true,
            detail: {
                demandGroupId,
                demand,
            },
        }));
    }
    /**
     * Go back to the action menu
     */
    handleBackClick() {
        this.dispatchEvent(new CustomEvent('component-state-change', {
            bubbles: true,
            composed: true,
            detail: {
                newState: ComponentState.MENU,
            },
        }));
    }
    /**
     * Validate and add demand to request when add clicked
     */
    handleAddClick() {
        if (this.validate()) {
            this.addToPrivacyRequest(this.demandGroupId, this.demand);
            this.dispatchEvent(new CustomEvent('component-state-change', {
                bubbles: true,
                composed: true,
                detail: {
                    newState: ComponentState.REVIEW,
                },
            }));
        }
    }
    willUpdate(_changedProperties) {
        if (_changedProperties.has('default') && this.default) {
            this.demand = this.getDefaultDemand();
        }
    }
    render() {
        return html `
      <div>
        ${choose(this.demandState, [
            [DemandState.EDIT_OPEN, () => this.getFormTemplate(this.demand)],
        ])}
      </div>
      <!-- Buttons -->
      <div class="btns-ctr">
        <button
          id="back-btn"
          class="nav-btn btn--centered btn--clickable"
          @click=${this.handleBackClick}
        >
          ${msg('Back')}
        </button>
        <button
          id="add-btn"
          class="nav-btn btn--centered btn--clickable"
          @click=${this.handleAddClick}
        >
          ${msg('Next')}
        </button>
      </div>
    `;
    }
}
DemandForm.styles = [
    PRCIStyles,
    css `
      :host {
        margin: 0px;
      }

      .btns-ctr {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        padding: 0px 0px 0px 0px;
        margin: 0px 0px 0px 0px;
        transform: translateY(35px);
      }

      #back-btn {
        grid-column: 1/2;
        min-width: 60%;
        max-width: 300px;
      }

      #add-btn {
        grid-column: 3/4;
        min-width: 60%;
        max-width: 300px;
      }
    `,
];
__decorate([
    property({ type: Number, attribute: 'demand-state' })
], DemandForm.prototype, "demandState", void 0);
__decorate([
    property({ attribute: false })
], DemandForm.prototype, "demand", void 0);
__decorate([
    property({ type: String })
], DemandForm.prototype, "demandGroupId", void 0);
__decorate([
    property({ type: Boolean })
], DemandForm.prototype, "default", void 0);

export { DemandForm };
//# sourceMappingURL=DemandForm.js.map

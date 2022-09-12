import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { buttonStyles } from '../styles.js';
import { DemandState, ComponentState } from '../utils/states.js';

/**
 * Abstract class for a form that allows the user to create or edit multiple demands.
 */
class MultiDemandForm extends LitElement {
    constructor() {
        super(...arguments);
        this.demandState = DemandState.EDIT_OPEN;
        // eslint-disable-next-line no-restricted-globals
        this.demandGroupId = self.crypto.randomUUID();
        this.demands = [];
    }
    setDemand(demand) {
        this.demands.push(demand);
    }
    deleteDemand(action) {
        this.demands.splice(this.demands.findIndex(d => d.action === action), 1);
    }
    addToPrivacyRequest(demandGroupId, demands) {
        this.dispatchEvent(new CustomEvent('demand-set-multiple', {
            bubbles: true,
            composed: true,
            detail: {
                demandGroupId,
                demands,
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
     * On add click validate and add data then move to review
     */
    handleAddClick() {
        if (this.validate()) {
            // Create list of demands from data entered in the form
            this.demands = this.buildDemands();
            // Send the demands to the top level component to be added to priacy request
            this.addToPrivacyRequest(this.demandGroupId, this.demands);
            // Move to review state
            this.dispatchEvent(new CustomEvent('component-state-change', {
                bubbles: true,
                composed: true,
                detail: {
                    newState: ComponentState.REVIEW,
                },
            }));
        }
    }
    render() {
        return html `
      ${choose(this.demandState, [
            [DemandState.EDIT_OPEN, () => this.getFormTemplate()],
        ])}
      <!-- Buttons -->
      <div class="btns-ctr">
        <button
          id="back-btn"
          class="nav-btn ctr-btn animated-btn"
          @click=${this.handleBackClick}
        >
          ${msg('Back')}
        </button>
        <button
          id="add-btn"
          class="nav-btn ctr-btn animated-btn"
          @click=${this.handleAddClick}
        >
          ${msg('Next')}
        </button>
      </div>
    `;
    }
}
MultiDemandForm.styles = [
    buttonStyles,
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

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        padding: 0;
        margin: 0;
      }

      h2 {
        font-size: 20px;
      }

      h3 {
        font-size: 16px;
        font-weight: normal;
      }
    `,
];
__decorate([
    property({ type: Number, attribute: 'demand-state' })
], MultiDemandForm.prototype, "demandState", void 0);
__decorate([
    property({ type: String })
], MultiDemandForm.prototype, "demandGroupId", void 0);
__decorate([
    property({ attribute: false })
], MultiDemandForm.prototype, "demands", void 0);

export { MultiDemandForm };
//# sourceMappingURL=MultiDemandForm.js.map

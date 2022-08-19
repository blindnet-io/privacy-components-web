import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { buttonStyles } from '../styles.js';
import { DemandState, ComponentState } from '../utils/states.js';

class ActionForm extends LitElement {
    constructor() {
        super();
        this.demandState = DemandState.EDIT_OPEN;
        // eslint-disable-next-line no-restricted-globals
        this.demandGroupId = self.crypto.randomUUID();
        this.demands = [];
        this.demands = this.getDefaultDemands();
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
            this.addToPrivacyRequest(this.demandGroupId, this.demands);
            this.dispatchEvent(new CustomEvent('component-state-change', {
                bubbles: true,
                composed: true,
                detail: {
                    newState: ComponentState.REVIEW,
                },
            }));
        }
    }
    /**
     * Ensure that we always use the default demands initially
     * @param _changedProperties
     */
    willUpdate(_changedProperties) {
        if (_changedProperties.has('demands') &&
            (!this.demands || this.demands.length === 0)) {
            this.demands = this.getDefaultDemands();
        }
    }
    render() {
        return html `
      ${choose(this.demandState, [
            [DemandState.EDIT_OPEN, () => this.getEditTemplate(this.demands)],
        ])}
      <!-- Buttons -->
      <div class="btns-ctr">
        <button class="back-btn nav-btn ctr-btn" @click=${this.handleBackClick}>
          ${msg('Back')}
        </button>
        <button class="add-btn nav-btn ctr-btn" @click=${this.handleAddClick}>
          ${msg('Add demand to Privacy Request')}
        </button>
      </div>
    `;
    }
}
ActionForm.styles = [
    buttonStyles,
    css `
      :host {
        margin: 0px 0px 0px 0px;
      }

      .btns-ctr {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        padding: 0px 0px 0px 0px;
        margin: 0px 0px 0px 0px;
        transform: translateY(15px);
      }

      .back-btn {
        grid-column: 1/2;
      }

      .add-btn {
        grid-column: 2/3;
      }
    `,
];
__decorate([
    property({ type: Number, attribute: 'demand-state' })
], ActionForm.prototype, "demandState", void 0);
__decorate([
    property({ type: String })
], ActionForm.prototype, "demandGroupId", void 0);
__decorate([
    property({ attribute: false })
], ActionForm.prototype, "demands", void 0);

export { ActionForm };
//# sourceMappingURL=ActionForm.js.map

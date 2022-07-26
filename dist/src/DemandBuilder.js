import { __decorate } from "tslib";
/* eslint-disable */
import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { ACTION } from './models/priv-terms.js';
import { enabledActions } from './utils/conf.js';
import { descriptions } from './utils/dictionary.js';
import { DemandState } from './utils/states.js';
import './DemandBuilderActionMenu.js';
import './DemandBuilderDropdownElement.js';
import './DemandBuilderTextElement.js';
import './demand-forms/TransparencyForm.js';
import './DemandBuilderSidebarItem.js';
import { when } from 'lit/directives/when.js';
/**
 * Handles creation and review of a single demand. Uses one of the ActionForm
 * components to display different options for each action type.
 */
let DemandBuilder = class DemandBuilder extends LitElement {
    constructor() {
        super();
        this.includedActions = [];
        this.demandState = DemandState.SELECT_ACTION;
        this.demands = new Map();
        this._selectedAction = ACTION.TRANSPARENCY;
        this._sidebarSelectedIndex = 0;
        // Demand update listeners
        this.addEventListener('demand-set', e => {
            const { demandId, demand } = e.detail;
            this.demands.set(demandId, demand);
        });
        this.addEventListener('demand-delete', e => {
            const { id } = e.detail;
            this.demands.delete(id);
        });
        this.addEventListener('demand-set-multiple', e => {
            e.detail.demands.forEach((demand, id) => this.demands.set(id, demand));
        });
        // UI element listeners
        this.addEventListener('demand-action-menu-click', () => {
            this._selectedAction = ACTION.TRANSPARENCY;
            this.demandState = DemandState.EDIT;
        });
        this.addEventListener('sidebar-click', e => {
            this._sidebarSelectedIndex = this.includedActions.indexOf(e.detail.id);
        });
    }
    /**
     * Get a HTML template for the demand builder sidebar, with each PRIV action
     * included in this DemandBuilder as an option.
     * @returns HTML template for sidebar display
     */
    getSidebarTemplate() {
        return html `
      <div id="sidebar">
        <p id="sidebar-title">Type of demand:</p>
        ${this.includedActions.map((a, i) => html `
            <demand-builder-sidebar-item
              id=${a}
              title=${a}
              description=${descriptions[a]}
              ?disabled=${!enabledActions.get(a)}
              ?checked=${i === this._sidebarSelectedIndex}
            ></demand-builder-sidebar-item>
          `)}
      </div>
    `;
    }
    /**
     * Get an HTML template for the form corresponding to the selected action type.
     * @returns HTML template for action form
     */
    getSelectedFormTemplate() {
        return html `
      ${choose(this._selectedAction, [
            [
                ACTION.TRANSPARENCY,
                () => html `<transparency-form
            demand-state=${this.demandState}
            .demandBuilderId=${this.id}
            .transparencyActions=${Object.values(ACTION).filter(a => a.includes('TRANSPARENCY.'))}
            .demands=${this.demands}
          ></transparency-form>`,
            ],
        ])}
    `;
    }
    /**
     * Hook into update to fire an event letting the top level component know the user
     * has navigated past the action menu screen.
     * @param changedProperties Map of changed values to their previous value
     */
    update(changedProperties) {
        super.update(changedProperties);
        if (changedProperties.has('demandState') &&
            changedProperties.get('demandState') === DemandState.SELECT_ACTION) {
            this.dispatchEvent(new Event('menu-done', { bubbles: true, composed: true }));
        }
    }
    /**
     * Hook into firstUpdated to include an initial calculation of the sidebar index
     * @param _changedProperties
     */
    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        this._sidebarSelectedIndex = this.includedActions.indexOf(this._selectedAction);
    }
    render() {
        if (this.demandState === DemandState.SELECT_ACTION) {
            return html `<demand-builder-action-menu
        .includedActions=${this.includedActions}
      ></demand-builder-action-menu>`;
        }
        else {
            return html `
        <!-- Include sidebar in edit mode -->
        ${when(this.demandState === DemandState.EDIT, () => this.getSidebarTemplate())}
        <!-- Display selected form -->
        ${this.getSelectedFormTemplate()}
      `;
        }
    }
};
DemandBuilder.styles = css `
    :host {
      display: grid;
      grid-row: 2/3;
      grid-column: 1/2;
      grid-template-columns: repeat(4, 1fr);
    }

    .demand-builder-back-btn {
      grid-column-start: 1/2;
    }

    #sidebar {
      display: grid;
      height: fit-content;
    }

    p {
      padding: 0px;
      margin: 0px;
    }
  `;
__decorate([
    property({ type: Array })
], DemandBuilder.prototype, "includedActions", void 0);
__decorate([
    property({ type: Number, attribute: 'demand-state' })
], DemandBuilder.prototype, "demandState", void 0);
__decorate([
    property({ attribute: false })
], DemandBuilder.prototype, "demands", void 0);
__decorate([
    state()
], DemandBuilder.prototype, "_selectedAction", void 0);
__decorate([
    state()
], DemandBuilder.prototype, "_sidebarSelectedIndex", void 0);
DemandBuilder = __decorate([
    customElement('demand-builder')
], DemandBuilder);
export { DemandBuilder };
//# sourceMappingURL=DemandBuilder.js.map
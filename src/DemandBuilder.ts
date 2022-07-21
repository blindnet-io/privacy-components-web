/* eslint-disable */
import { html, css, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';

import { ACTION, TRANSPARENCY_ACTION } from './models/priv-terms.js';
import { enabledActions } from './utils/conf.js';
import { Demand } from './models/demand.js';
import { descriptions } from './utils/dictionary.js';
import { DemandState } from './utils/states.js';
import './DemandBuilderActionMenu.js';
import './DemandBuilderSidebar.js';
import './DemandBuilderDropdownElement.js';
import './DemandBuilderTextElement.js';
import './demand-forms/TransparencyForm.js';
import './DemandBuilderSidebarItem.js';
import { when } from 'lit/directives/when.js';

/**
 * Handles creation and review of a single demand. Uses one of the ActionForm
 * components to display different options for each action type.
 */
@customElement('demand-builder')
export class DemandBuilder extends LitElement {
  @property({ type: Array }) includedActions: ACTION[] = [];

  @property({ type: Number, attribute: 'demand-state' })
  demandState: DemandState = DemandState.SELECT_ACTION;

  @state() _selectedAction = ACTION.TRANSPARENCY;

  @property({ attribute: false }) demands = new Map<string, Demand>();

  @state() _sidebarSelectedIndex = 0;

  constructor() {
    super();

    // Demand update listeners
    this.addEventListener('demand-set', e => {
      const { id, demand } = (e as CustomEvent).detail;
      this.demands.set(id, demand);
    });
    this.addEventListener('demand-delete', e => {
      const { id } = (e as CustomEvent).detail;
      this.demands.delete(id);
    });
    this.addEventListener('demand-set-multiple', e => {
      ((e as CustomEvent).detail.demands as Map<string, Demand>).forEach(
        (demand, id) => this.demands.set(id, demand)
      );
    });

    // UI element listeners
    this.addEventListener('demand-action-menu-click', () => {
      this._selectedAction = ACTION.TRANSPARENCY;
      this.demandState = DemandState.EDIT;
    });
    this.addEventListener('sidebar-click', e => {
      this._sidebarSelectedIndex = this.includedActions.indexOf(
        (e as CustomEvent).detail.id
      );
    });
  }

  static styles = css`
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
    }

    .sidebar-element-ctr {
      display: flex;
      align-items: center;
      height: 100px;
      z-index: 1;
    }

    .sidebar-element {
      display: flex;
      align-items: flex-start;
      text-align: left;
      padding: 10px 20px 10px 40px;
    }

    .sidebar-radio {
      margin: 5px 7.5px 0px 0px;
    }

    .sidebar-border {
      border: 2px solid #000;
      border-right-color: #fafafa;
      border-right-width: 3px;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      margin-right: -2px;
    }

    p {
      padding: 0px;
      margin: 0px;
    }
  `;

  /**
   * Get a HTML template for the demand builder sidebar, with each PRIV action
   * included in this DemandBuilder as an option.
   * @returns HTML template for sidebar display
   */
  getSidebarTemplate() {
    return html`
      <div id="sidebar">
        <p id="sidebar-title">Type of demand:</p>
        ${this.includedActions.map(
          (a, i) => html`
            <demand-builder-sidebar-item
              id=${a}
              title=${a}
              description=${descriptions[a]}
              ?disabled=${!enabledActions.get(a)}
              ?checked=${i === this._sidebarSelectedIndex}
            ></demand-builder-sidebar-item>
          `
        )}
      </div>
    `;
  }

  /**
   * Get an HTML template for the form corresponding to the selected action type.
   * @returns HTML template for action form
   */
  getSelectedFormTemplate() {
    return html`
      ${choose(this._selectedAction, [
        [
          ACTION.TRANSPARENCY,
          () => html`<transparency-form
            demand-state=${this.demandState}
            .demandBuilderId=${this.id}
            .transparencyActions=${Object.values(ACTION).filter(a =>
              a.includes('TRANSPARENCY.')
            )}
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
  update(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
    super.update(changedProperties);

    if (
      changedProperties.has('demandState') &&
      changedProperties.get('demandState') === DemandState.SELECT_ACTION
    ) {
      this.dispatchEvent(
        new Event('menu-done', { bubbles: true, composed: true })
      );
    }
  }

  /**
   * Hook into firstUpdated to include an initial calculation of the sidebar index
   * @param _changedProperties
   */
  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.firstUpdated(_changedProperties);
    this._sidebarSelectedIndex = this.includedActions.indexOf(
      this._selectedAction
    );
  }

  render() {
    if (this.demandState === DemandState.SELECT_ACTION) {
      return html`<demand-builder-action-menu
        .includedActions=${this.includedActions}
      ></demand-builder-action-menu>`;
    } else {
      return html`
        <!-- Include sidebar in edit mode -->
        ${when(this.demandState === DemandState.EDIT, () =>
          this.getSidebarTemplate()
        )}
        <!-- Display selected form -->
        ${this.getSelectedFormTemplate()}
      `;
    }
  }
}

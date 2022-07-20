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
 * REFACTORING TODO:
 *  - Define several demand content components for each type of demand. This will replace
 *    the #demand-elements-container ID
 *  - Each should produce a demand or array of demands (for the transparency request)
 */

/**
 * REFACTORING TODO 2.0:
 *  - For each demand in the component there should be a unique ID
 *  - Demand builder keeps a map of IDs to Demands
 *  - For most action types, there is one demand so the demand builder map has one element
 *
 * - But for transparency, the map has multiple IDs
 *    - For the form selection box, it should work to have id be a demand-id, action pair
 *    - Possible solution: when transparency form is selected, generate uuid for number of possible demands and
 *      add to map, then pass this to transparency form
 *    - Possible solution #2: when transparency form is selected, don't generate any uuids initially. As list elements are
 *      selected/unselected, update the demand builder/priv request. This has the downside of being a bit slower as we must
 *      do a linear search when deleting a certain action
 * - New problem: must handle add vs delete vs update seperately
 */
@customElement('demand-builder')
export class DemandBuilder extends LitElement {
  @property({ type: Array }) includedActions: ACTION[] = [];

  @property({ attribute: false }) demandState: DemandState =
    DemandState.SELECT_ACTION;

  @state() _selectedAction = ACTION.TRANSPARENCY;

  // TODO: Check if this.demand.action actually changes when we switch options in sidebar
  // @property({ attribute: false }) demands: Demand = {
  //   action: this._selectedAction,
  // };

  // The transparency demand interface requires a special case of the demand builder with multiple demands at once
  @property({ attribute: false }) demands = new Map<string, Demand>();

  @state() _sidebarSelectedIndex = 7; // TODO: Calculate this in lifecycle method based on property input

  constructor() {
    super();

    this.addEventListener('demand-action-menu-click', () => {
      // FIXME: Once we support more than one action type, will need to get the action out of event here
      this._selectedAction = ACTION.TRANSPARENCY;
      this.demandState = DemandState.EDIT;
    });

    this.addEventListener('sidebar-click', e => {
      this._sidebarSelectedIndex = this.includedActions.indexOf(
        (e as CustomEvent).detail.id
      );
    });

    this.addEventListener('demand-update', e => {
      console.log('demand builder got demand update');
      this.demands = (e as CustomEvent).detail.demands;
      console.log(this.demands);
    });

    // this.addEventListener('demand-update-multiple', e => {
    //   console.log("demand builder got demand update multiple");
    //   this.multiDemand = (e as CustomEvent).detail?.demands;
    // });
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

    #demand-review-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column: 1/5;
      row-gap: 15px;
      border: 2px solid #000;
      border-radius: 20px;
      margin: 20px 0px 0px 0px;
      padding: 20px 20px 20px 20px;
    }

    p {
      padding: 0px;
      margin: 0px;
    }
  `;

  updatePrivacyRequest() {
    const event = new CustomEvent('add-demand', {
      bubbles: true,
      composed: true,
      detail: {
        demand: this.demands,
      },
    });
    this.dispatchEvent(event);
  }

  handleSidebarElementClick(e: Event) {
    console.log('in sidebar click handler');

    const div = e.target as HTMLDivElement;
    console.log(div);
  }

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

  getSelectedFormTemplate() {
    return html`
      ${choose(this._selectedAction, [
        [
          ACTION.TRANSPARENCY,
          () => html`<transparency-form
            formState=${DemandState.EDIT}
            .transparencyActions=${Object.values(TRANSPARENCY_ACTION)}
          ></transparency-form>`,
        ],
      ])}
    `;
  }

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

  render() {
    // console.log(this.multiDemand);

    if (this.demandState === DemandState.SELECT_ACTION) {
      // TODO: Move demand-builder-action-menu into this class
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

/* eslint-disable */
import { html, css, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';

import { ACTION, TRANSPARENCY_ACTION } from './models/priv-terms.js';
import { Demand } from './models/demand.js';
import { descriptions } from './utils/dictionary.js';
import { DemandState } from './utils/states.js';
import './DemandBuilderActionMenu.js';
import './DemandBuilderSidebar.js';
import './DemandBuilderDropdownElement.js';
import './DemandBuilderTextElement.js';
import './demand-forms/TransparencyForm.js';
import { when } from 'lit/directives/when.js';

/**
 * REFACTORING TODO:
 *  - Define several demand content components for each type of demand. This will replace
 *    the #demand-elements-container ID
 *  - Each should produce a demand or array of demands (for the transparency request)
 */
@customElement('demand-builder')
export class DemandBuilder extends LitElement {
  @property({ type: Array }) includedActions: ACTION[] = [];

  @property({ attribute: false }) demandState: DemandState =
    DemandState.SELECT_ACTION;

  @state() _selectedAction = ACTION.TRANSPARENCY;

  // TODO: Check if this.demand.action actually changes when we switch options in sidebar
  @property({ attribute: false }) demand: Demand = {
    action: this._selectedAction,
  };

  // The transparency demand interface requires a special case of the demand builder with multiple demands at once
  @property({ attribute: false }) multiDemand = new Map<string, Demand>();

  @state() _sidebarSelectedIndex = 0;

  constructor() {
    super();

    this.addEventListener('demand-action-menu-click', () => {
      // FIXME: Once we support more than one action type, will need to get the action out of event here
      this._selectedAction = ACTION.TRANSPARENCY;
      this.demandState = DemandState.EDIT;
    });

    this.addEventListener('demand-update', e => {
      this.demand = (e as CustomEvent).detail.demand;
    });

    this.addEventListener('demand-update-multiple', e => {
      console.log(this.multiDemand);
      this.multiDemand = (e as CustomEvent).detail?.demands;
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

  formDemandEvent() {
    const event = new CustomEvent('add-demand', {
      bubbles: true,
      composed: true,
      detail: {
        demand: this.demand,
      },
    });
    this.dispatchEvent(event);
  }

  handleSidebarElementClick(e: Event) {
    const label = e.target as HTMLLabelElement;
    if (label && this.shadowRoot) {
      // Get all elements in the list and index of the one clicked
      const elements = Array.from(
        [...[this.shadowRoot.querySelectorAll('label')]][0]
      );
      const newIndex = elements.indexOf(label);

      if (newIndex > -1 && newIndex !== this._sidebarSelectedIndex) {
        this._sidebarSelectedIndex = newIndex;

        // Manually sets the radio button to checked. This is in response to an issue I noticed where the
        // radio button would sometimes not change even when the component re-renders.
        const input = label.lastElementChild as HTMLInputElement;
        if (input) {
          input.checked = true;
        }
      }
    }
  }

  getSidebarTemplate() {
    return html`
      <div id="sidebar">
        <p id="sidebar-title">Type of demand:</p>
        ${this.includedActions.map(
          (a, i) => html`
            <div
              class="sidebar-element-ctr ${i === this._sidebarSelectedIndex
                ? 'sidebar-border'
                : ''}"
            >
              <label
                class="sidebar-element"
                @click=${this.handleSidebarElementClick}
              >
                <input
                  class="sidebar-radio"
                  type="radio"
                  name="radio"
                  ?checked=${i === this._sidebarSelectedIndex}
                />
                ${a}: ${descriptions[a]}
                <!-- <span>${a}:</span><span>${descriptions[a]}</span> -->
              </label>
            </div>
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
    console.log(this.multiDemand);

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

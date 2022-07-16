import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';

import { ACTION, Demand } from './priv.js';
import './DemandBuilderActionMenu.js';
import './DemandBuilderSidebar.js';
import './DemandBuilderDropdownElement.js';
import './DemandBuilderTextElement.js';
import './demand-forms/TransparencyForm.js';

/**
 * REFACTORING TODO:
 *  - Define several demand content components for each type of demand. This will replace
 *    the #demand-elements-container ID
 *  - Each should produce a demand or array of demands (for the transparency request)
 */

enum demandBuilderState {
  SELECT_ACTION,
  BUILD_DEMAND,
  REVIEW_DEMAND,
}

@customElement('demand-builder')
export class DemandBuilder extends LitElement {
  @property({ type: Array }) includedActions: {
    NAME: string;
    DESCRIPTION: string;
  }[] = [];

  @state() _demandBuilderState: demandBuilderState =
    demandBuilderState.SELECT_ACTION;

  @state() _selectedAction = ACTION.TRANSPARENCY;

  private _demand: Demand = {
    action: this._selectedAction,
  };

  // The transparency demand interface requires a special case of the demand builder with multiple demands at once
  private _multiDemand = new Map<string, Demand>();

  @state() _sidebarSelectedIndex = 0;

  constructor() {
    super();

    this.addEventListener('demand-action-menu-click', () => {
      // FIXME: Once we support more than one action type, will need to get the action out of event here
      this._selectedAction = ACTION.TRANSPARENCY;
      this._demandBuilderState = demandBuilderState.BUILD_DEMAND;
    });

    this.addEventListener('demand-update-multiple', e => {
      this._multiDemand = (e as CustomEvent).detail?.demands;
    });
  }

  static styles = css`
    :host {
      display: grid;
      grid-row: 2/3;
      grid-column: 1/2;
      grid-template-columns: repeat(4, 1fr);
    }

    #demand-elements-container {
      display: grid;
      grid-column: 2/5;
      align-content: flex-start;
      border: 2px solid #000;
      border-radius: 20px;
      padding: 20px 20px;
      margin: 0px 0px 0px 0px;
    }

    .demand-builder-back-btn {
      grid-column-start: 1/2;
    }

    .demand-builder-header {
      grid-column: 2/3;
      font-weight: bold;
      text-align: center;
    }

    .demand-contents-header {
      font-weight: bold;
      height: 30px;
    }

    #sidebar {
      display: grid;
    }

    .sidebar-element {
      display: flex;
      height: 100px;
      align-items: center;
      border: 2px solid #fafafa;
      border-right-width: 0px;
      padding-left: 10px;
      z-index: 1;
    }

    .sidebar-radio {
      margin: 0px 7.5px 0px 0px;
    }

    .sidebar-border {
      border: 2px solid #000;
      border-right-color: #fafafa;
      border-right-width: 3px;
      margin-right: -2px;
    }

    #new-demand-option-container {
      display: flex;
      grid-column: 1/5;
      column-gap: 10px;
      margin: 20px 0px 0px 0px;
      padding: 20px 20px 20px 20px;
      border: 2px solid #000;
      border-radius: 20px;
      align-items: center;
      justify-content: center;
    }

    .new-demand-option-text {
      font-weight: bold;
    }

    .new-demand-option-button {
      width: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .demand-builder-next-btn {
      grid-column: 2/3;
      padding-bottom: -50px;
      margin-bottom: -50px;
    }

    .review-request-btn {
      height: 20px;
      width: fit-content;

      /* Position on grid border */
      z-index: 1;
      grid-row: 3/4;
      grid-column: 2/4;
      margin: 0px 0px -30px 0px;
      align-self: flex-end;
      justify-self: center;
      text-align: center;
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

    #demand-review-container ul {
      margin: 0;
    }

    #demand-review-container li:not(:last-child) {
      margin-bottom: 15px;
    }

    #demand-review-heading-1 {
      font-weight: bold;
      grid-column: 1/2;
    }

    #demand-review-heading-2 {
      grid-column: 1/2;
    }

    #demand-review-list {
      grid-column: 1/3;
    }

    p {
      padding: 0px;
      margin: 0px;
    }
  `;

  handleReviewClick() {
    this.formDemandEvent();
    this._demandBuilderState = demandBuilderState.REVIEW_DEMAND;
  }

  handleNewDemandClick() {
    this.formDemandEvent();
    this._demandBuilderState = demandBuilderState.SELECT_ACTION;
  }

  formDemandEvent() {
    const event = new CustomEvent('add-demand', {
      bubbles: true,
      composed: true,
      detail: {
        demand: this._demand,
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
      }
    }
  }

  render() {
    return html`
      <!-- <button class="demand-builder-back-btn">Back</button> -->
      ${choose(this._demandBuilderState, [
        [
          demandBuilderState.SELECT_ACTION,
          () => html`
            <demand-builder-action-menu
              .includedActions=${this.includedActions}
            ></demand-builder-action-menu>
          `,
        ],
        [
          demandBuilderState.BUILD_DEMAND,
          () => html`
            <div id="sidebar">
              <p id="sidebar-title">Type of demand:</p>
              ${this.includedActions.map(
                (a, i) => html`
                  <button
                    class="sidebar-element ${i === this._sidebarSelectedIndex
                      ? 'sidebar-border'
                      : ''}"
                    @click=${this.handleSidebarElementClick}
                  >
                    <input class="sidebar-radio" type="radio" name="radio" />
                    ${a.NAME}: ${a.DESCRIPTION}
                  </button>
                `
              )}
            </div>
            <div id="demand-elements-container">
              <p class="demand-contents-header">
                Details of my ${this._selectedAction} demand:
                <!-- FIXME: Should reference dictionary/do translation here instead -->
              </p>
              <transparency-form></transparency-form>
            </div>
            <div id="new-demand-option-container">
              <p class="new-demand-option-text">I want to add another demand</p>
              <button class="new-demand-option-button">+</button>
            </div>
            <button class="review-request-btn" @click=${this.handleReviewClick}>
              Review Request
            </button>
          `,
        ],
        [
          demandBuilderState.REVIEW_DEMAND,
          () => html`
            <div id="demand-review-container">
              <p id="demand-review-heading-1">
                ${this._selectedAction} demand
                <!-- FIXME: Should reference dictionary/do translation here instead -->
              </p>
              <p id="demand-review-heading-2">I want to know</p>
              <ul id="demand-review-list">
                <li>Test 1</li>
                <li>Test 2</li>
                <li>Test 3</li>
              </ul>
            </div>
          `,
        ],
      ])}
    `;
  }
}

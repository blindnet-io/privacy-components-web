import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';

import { action } from './dictionary.js';
import './DemandBuilderActionMenu.js';
import './DemandBuilderSidebar.js';
import './DemandBuilderDropdownElement.js';
import './DemandBuilderTextElement.js';

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

  @state() _selectedAction = action.TRANSPARENCY;

  constructor() {
    super();
    this.addEventListener('demand-action-menu-click', () => {
      // FIXME: Once we support more than one action type, will need to get the action out of event here
      this._selectedAction = action.TRANSPARENCY;
      this._demandBuilderState = demandBuilderState.BUILD_DEMAND;
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
      grid-template-columns: 1fr;
      row-gap: 20px;
      align-content: flex-start;
      border: 2px solid #000;
      border-radius: 20px;
      padding: 20px 20px;
      margin: 0px 0px 0px 20px;
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
    this._demandBuilderState = demandBuilderState.REVIEW_DEMAND;
    // const event = new CustomEvent("demands-complete-click", {
    //   bubbles: true,
    //   composed: true,
    //   // Need to pass demand here
    //   // detail: {
    //   //   actionName: this.actionName,
    //   // },
    // });
    // this.dispatchEvent(event);
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
            <demand-builder-sidebar
              .includedActions=${this.includedActions}
            ></demand-builder-sidebar>
            <div id="demand-elements-container">
              <p class="demand-contents-header">
                Details of my ${this._selectedAction.NAME} demand:
              </p>
              <demand-builder-dropdown-element></demand-builder-dropdown-element>
              <demand-builder-text-element></demand-builder-text-element>
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
                ${this._selectedAction.NAME} demand
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

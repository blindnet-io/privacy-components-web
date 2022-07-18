/* eslint-disable */
import { html, css, LitElement } from 'lit';
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

    this.addEventListener('demand-update-multiple', e => {
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
      text-align: left;
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

    #review-request-btn {
      height: 20px;
      width: fit-content;
    }

    #submit-request-btn {
      height: 20px;
      width: fit-content;
    }

    .centered-on-border {
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

    p {
      padding: 0px;
      margin: 0px;
    }
  `;

  // TODO: Move this to BldnPrivRequest
  handleReviewClick() {
    this.formDemandEvent();
    this.demandState = DemandState.REVIEW;
  }

  // TODO: Move this to BldnPrivRequest
  handleNewDemandClick() {
    this.formDemandEvent();
    this.demandState = DemandState.SELECT_ACTION;
  }

  // TODO: Move this to BldnPrivRequest
  handleSubmitClick() {
    const event = new CustomEvent('submit-request', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

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
            <label
              class="sidebar-element ${i === this._sidebarSelectedIndex
                ? 'sidebar-border'
                : ''}"
              @click=${this.handleSidebarElementClick}
            >
              <input
                class="sidebar-radio"
                type="radio"
                name="radio"
                ?checked=${i === this._sidebarSelectedIndex}
              />
              ${a}: ${descriptions[a]}
            </label>
          `
        )}
      </div>
    `;
  }

  getSelectedFormTemplate() {
    return html`
      <div id="demand-elements-container">
        <!-- TODO: Move this to ActionForm -->
        <p class="demand-contents-header">
          <!-- TODO: Move this to ActionForm -->
          Details of my ${this._selectedAction} demand:
          <!-- FIXME: Should reference dictionary/do translation here instead -->
        </p>
        ${choose(this._selectedAction, [
          [
            ACTION.TRANSPARENCY,
            () => html`<transparency-form
              formState=${DemandState.EDIT}
              .transparencyActions=${Object.values(TRANSPARENCY_ACTION)}
            ></transparency-form>`,
          ],
        ])}
      </div>
    `;
  }

  render() {
    console.log(this.multiDemand);

    if (this.demandState === DemandState.SELECT_ACTION) {
    } else {
      return html`
        <!-- Include sidebar in edit mode -->
        ${when(this.demandState === DemandState.EDIT, () =>
          this.getSidebarTemplate()
        )}
        <!-- Display selected form -->
        ${this.getSelectedFormTemplate()}

        <!-- <div id="new-demand-option-container"> TODO: Move this to BldnPrivRequest
              <p class="new-demand-option-text">I want to add another demand</p>
              <button class="new-demand-option-button">+</button>
            </div>
            <button id="review-request-btn" class="centered-on-border" @click=${this
          .handleReviewClick}>
              Review Request
            </button> -->

        <!-- TODO: Move this to BldnPrivRequest -->
        <!-- <button id="submit-request-btn" class="centered-on-border" @click=${this
          .handleSubmitClick}>
              Submit Privacy Request
            </button> -->
      `;
    }

    // return html`
    //   <!-- <button class="demand-builder-back-btn">Back</button> -->
    //   ${choose(this._demandBuilderState, [
    //     [
    //       DemandBuilderState.SELECT_ACTION,
    //       () => html`
    //         <demand-builder-action-menu
    //           .includedActions=${this.includedActions}
    //         ></demand-builder-action-menu>
    //       `,
    //     ],
    //     [
    //       DemandBuilderState.BUILD_DEMAND,
    //       () => html`
    //         ${console.log('build')}
    //         <div id="sidebar">
    //           <p id="sidebar-title">Type of demand:</p>
    //           ${this.includedActions.map(
    //             (a, i) => html`
    //               <label
    //                 class="sidebar-element ${i === this._sidebarSelectedIndex
    //                   ? 'sidebar-border'
    //                   : ''}"
    //                 @click=${this.handleSidebarElementClick}
    //               >
    //                 <input
    //                   class="sidebar-radio"
    //                   type="radio"
    //                   name="radio"
    //                   ?checked=${i === this._sidebarSelectedIndex}
    //                 />
    //                 ${a}: ${descriptions[a]}
    //               </label>
    //             `
    //           )}
    //         </div>
    //       `,
    //     ],
    //     [
    //       DemandBuilderState.REVIEW_DEMAND,
    //       () => html`
    //         ${console.log('review')}
    //         <transparency-form
    //           formState="review"
    //           .demands=${this._multiDemand}
    //         ></transparency-form>
    //         <!-- <button id="submit-request-btn" class="centered-on-border" @click=${this.handleSubmitClick}>
    //           Submit Privacy Request
    //         </button> -->
    //       `,
    //     ],
    //   ])}
    // `;
  }
}

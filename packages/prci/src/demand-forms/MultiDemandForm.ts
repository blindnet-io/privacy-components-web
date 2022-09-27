import { msg } from '@lit/localize';
import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { Demand, ACTION } from '@blindnet/core';
import { PRCIStyles } from '../styles.js';
import { ComponentState, DemandState } from '../utils/states.js';

/**
 * Abstract class for a form that allows the user to create or edit multiple demands.
 */
export abstract class MultiDemandForm extends LitElement {
  static styles = [
    PRCIStyles,
    css`
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
    ` as CSSResultGroup,
  ];

  @property({ type: Number, attribute: 'demand-state' })
  demandState: DemandState = DemandState.EDIT_OPEN;

  // eslint-disable-next-line no-restricted-globals
  @property({ type: String }) demandGroupId = self.crypto.randomUUID();

  @property({ attribute: false }) demands: Demand[] = [];

  setDemand(demand: Demand) {
    this.demands.push(demand);
  }

  deleteDemand(action: ACTION) {
    this.demands.splice(
      this.demands.findIndex(d => d.action === action),
      1
    );
  }

  addToPrivacyRequest(demandGroupId: string, demands: Demand[]) {
    this.dispatchEvent(
      new CustomEvent('demand-set-multiple', {
        bubbles: true,
        composed: true,
        detail: {
          demandGroupId,
          demands,
        },
      })
    );
  }

  /**
   * Go back to the action menu
   */
  handleBackClick() {
    this.dispatchEvent(
      new CustomEvent('component-state-change', {
        bubbles: true,
        composed: true,
        detail: {
          newState: ComponentState.MENU,
        },
      })
    );
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
      this.dispatchEvent(
        new CustomEvent('component-state-change', {
          bubbles: true,
          composed: true,
          detail: {
            newState: ComponentState.REVIEW,
          },
        })
      );
    }
  }

  /**
   * Validate data entered before adding to Privacy Request
   */
  abstract validate(): boolean;

  /**
   * Create a list of demands from the data entered in the form
   */
  abstract buildDemands(): Demand[];

  /**
   * Get the edit template for this action
   * @param useDefault Indicates if form should be populated with default values or from input demands
   * @returns HTML template
   */
  abstract getFormTemplate(): TemplateResult;

  render(): TemplateResult<1 | 2> {
    return html`
      ${choose(this.demandState, [
        [DemandState.EDIT_OPEN, () => this.getFormTemplate()],
      ])}
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

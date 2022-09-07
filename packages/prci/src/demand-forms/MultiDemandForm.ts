import { msg } from '@lit/localize';
import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { Demand } from '../models/demand.js';
import { ACTION } from '../models/priv-terms.js';
import { buttonStyles } from '../styles.js';
import { ComponentState, DemandState } from '../utils/states.js';

/**
 * Abstract class for a form that allows the user to create or edit multiple demands.
 */
export abstract class MultiDemandForm extends LitElement {
  static styles = [
    buttonStyles,
    css`
      :host {
        margin: 0px 0px 0px 0px;
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
      this.addToPrivacyRequest(this.demandGroupId, this.demands);
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
   * Get the edit template for this action
   * @param useDefault Indicates if form should be populated with default values or from input demands
   * @returns HTML template
   */
  abstract getFormTemplate(demands: Demand[]): TemplateResult;

  render(): TemplateResult<1 | 2> {
    return html`
      ${choose(this.demandState, [
        [DemandState.EDIT_OPEN, () => this.getFormTemplate(this.demands)],
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

import { msg } from '@lit/localize';
import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { Demand } from '../models/demand.js';
import { ACTION } from '../models/priv-terms.js';
import { PRCIStyles } from '../styles.js';
import { ComponentState, DemandState } from '../utils/states.js';

/**
 * Abstract class for a form that allows the user to create or edit a demand.
 */
export abstract class DemandForm extends LitElement {
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
    ` as CSSResultGroup,
  ];

  @property({ type: Number, attribute: 'demand-state' })
  demandState: DemandState = DemandState.EDIT_OPEN;

  @property({ attribute: false }) demand: Demand = { action: ACTION.ACCESS };

  // eslint-disable-next-line no-restricted-globals
  @property({ type: String }) demandGroupId = self.crypto.randomUUID();

  /**
   * Send this demand up to the top level component to add to the Privacy Request
   * @param demandGroupId uuid of this demand group
   * @param demand demand to add
   */
  addToPrivacyRequest(demandGroupId: string, demand: Demand) {
    this.dispatchEvent(
      new CustomEvent('demand-set', {
        bubbles: true,
        composed: true,
        detail: {
          demandGroupId,
          demand,
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
   * Validate and add demand to request when add clicked
   */
  handleAddClick() {
    if (this.validate()) {
      this.addToPrivacyRequest(this.demandGroupId, this.demand);
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
  abstract getFormTemplate(demand: Demand): TemplateResult;

  render(): TemplateResult<1 | 2> {
    return html`
      <div>
        ${choose(this.demandState, [
          [DemandState.EDIT_OPEN, () => this.getFormTemplate(this.demand)],
        ])}
      </div>
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

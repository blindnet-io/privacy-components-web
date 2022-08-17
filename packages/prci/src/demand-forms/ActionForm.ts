import { msg } from '@lit/localize';
import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { Demand } from '../models/demand.js';
import { buttonStyles } from '../styles.js';
import { DemandState } from '../utils/states.js';

export abstract class ActionForm extends LitElement {
  @property({ type: Number, attribute: 'demand-state' })
  demandState: DemandState = DemandState.EDIT_OPEN;

  @property({ attribute: false }) demands = new Map<string, Demand>();

  // DELETE?
  @property({ attribute: false }) demandBuilderId: string = '';

  static styles = [
    buttonStyles,
    css`
      :host {
        /* display: grid;
        grid-template-columns: repeat(2, 1fr); */
        margin: 0px 0px 0px 0px;
      }

      .btns-ctr {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        padding: 0px 0px 0px 0px;
        margin: 0px 0px 0px 0px;
        transform: translateY(15px);
      }

      .back-btn {
        grid-column: 1/2;
      }

      .add-btn {
        grid-column: 2/3;
      }
    ` as CSSResultGroup,
  ];

  setDemand(demandId: string, demand: Demand) {
    this.dispatchEvent(
      new CustomEvent('demand-set', {
        bubbles: true,
        composed: true,
        detail: {
          demandId,
          demand,
        },
      })
    );
  }

  setMultipleDemands(demands: Map<string, Demand>) {
    this.dispatchEvent(
      new CustomEvent('demand-set-multiple', {
        bubbles: true,
        composed: true,
        detail: {
          demands,
        },
      })
    );
  }

  deleteDemand(demandId: string) {
    this.dispatchEvent(
      new CustomEvent('demand-delete', {
        bubbles: true,
        composed: true,
        detail: {
          demandId,
        },
      })
    );
  }

  handleBackClick() {}

  handleAddClick() {}

  /**
   * Get the edit template for this action
   * @returns HTML template
   */
  abstract getEditTemplate(): TemplateResult;

  /**
   * Get the review template for this action
   * @returns HTML template
   */
  abstract getReviewTemplate(): TemplateResult;

  render(): TemplateResult<1 | 2> {
    return html`
      ${choose(this.demandState, [
        [DemandState.EDIT_OPEN, () => this.getEditTemplate()],
        [DemandState.REVIEW, () => this.getReviewTemplate()],
      ])}
      <!-- Buttons -->
      <div class="btns-ctr">
        <button class="back-btn nav-btn ctr-btn" @click=${this.handleBackClick}>
          ${msg('Back')}
        </button>
        <button class="add-btn nav-btn ctr-btn" @click=${this.handleAddClick}>
          ${msg('Add demand to Privacy Request')}
        </button>
      </div>
    `;
  }
}

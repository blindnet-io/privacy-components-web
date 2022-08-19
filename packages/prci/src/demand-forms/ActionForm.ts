import { msg } from '@lit/localize';
import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  PropertyValueMap,
  TemplateResult,
} from 'lit';
import { property } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { Demand } from '../models/demand.js';
import { ACTION } from '../models/priv-terms.js';
import { buttonStyles } from '../styles.js';
import { ComponentState, DemandState } from '../utils/states.js';

export abstract class ActionForm extends LitElement {
  @property({ type: Number, attribute: 'demand-state' })
  demandState: DemandState = DemandState.EDIT_OPEN;

  // eslint-disable-next-line no-restricted-globals
  @property({ type: String }) demandGroupId = self.crypto.randomUUID();

  @property({ attribute: false }) demands: Demand[] = [];

  constructor() {
    super();
    this.demands = this.getDefaultDemands();
  }

  static styles = [
    buttonStyles,
    css`
      :host {
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

  abstract getDefaultDemands(): Demand[];

  /**
   * Get the edit template for this action
   * @param useDefault Indicates if form should be populated with default values or from input demands
   * @returns HTML template
   */
  abstract getEditTemplate(demands: Demand[]): TemplateResult;

  /**
   * Ensure that we always use the default demands initially
   * @param _changedProperties
   */
  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (
      _changedProperties.has('demands') &&
      (!this.demands || this.demands.length === 0)
    ) {
      this.demands = this.getDefaultDemands();
    }
  }

  render(): TemplateResult<1 | 2> {
    return html`
      ${choose(this.demandState, [
        [DemandState.EDIT_OPEN, () => this.getEditTemplate(this.demands)],
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
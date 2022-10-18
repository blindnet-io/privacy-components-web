import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import { PrivacyRequestDemand, CreatePrivacyRequestPayload } from "@blindnet/core";
import { choose } from "lit/directives/choose.js";
import { ifDefined } from "lit/directives/if-defined.js";

enum requestBuilderUIState {
  menu,
  edit,
  review
}

@customElement('bldn-request-builder')
export class BldnRequestBuilder extends LitElement {

  /** @prop */
  @property({ type: Array }) actions: PrivacyRequestDemand.action[] = []

  /** @prop */
  @property({ type: Array }) dataCategories: string[] = []

  @state() _uiState: requestBuilderUIState = requestBuilderUIState.menu

  @state() _demandGroups = []

  @state() _action: undefined | PrivacyRequestDemand.action

  @state() _demandGroupIndex: undefined | number;

  getActionForm(action: PrivacyRequestDemand.action) {
    return html`
      ${choose(action, [
        [PrivacyRequestDemand.action.ACCESS, () => html`
          <bldn-access-form
            action=${this._action}
            data-categories=${JSON.stringify(this.dataCategories)}
            demands=${this._demandGroups[ifDefined(this._demandGroupIndex)]}
            demandGroupIndex=${ifDefined(this._demandGroupIndex)}
          ></bldn-access-form>
        `],
        [PrivacyRequestDemand.action.DELETE, () => html`
          <bldn-delete-form
            action=${this._action}
            data-categories=${JSON.stringify(this.dataCategories)}
            demands=${this._demandGroups[ifDefined(this._demandGroupIndex)]}
            demandGroupIndex=${ifDefined(this._demandGroupIndex)}
          ></bldn-delete-form>
        `],
        [PrivacyRequestDemand.action.MODIFY, () => html`
          <bldn-modify-form
            action=${this._action}
            data-categories=${JSON.stringify(this.dataCategories)}
            demands=${this._demandGroups[ifDefined(this._demandGroupIndex)]}
            demandGroupIndex=${ifDefined(this._demandGroupIndex)}
          ></bldn-modify-form>
        `],
        [PrivacyRequestDemand.action.OBJECT, () => html`
          <bldn-object-form
            action=${this._action}
            data-categories=${JSON.stringify(this.dataCategories)}
            demands=${this._demandGroups[ifDefined(this._demandGroupIndex)]}
            demandGroupIndex=${ifDefined(this._demandGroupIndex)}
          ></bldn-object-form>
        `],
        [PrivacyRequestDemand.action.RESTRICT, () => html`
          <bldn-restrict-form
            action=${this._action}
            data-categories=${JSON.stringify(this.dataCategories)}
            demands=${this._demandGroups[ifDefined(this._demandGroupIndex)]}
            demandGroupIndex=${ifDefined(this._demandGroupIndex)}
          ></bldn-restrict-form>
        `],
        [PrivacyRequestDemand.action.TRANSPARENCY, () => html`
          <bldn-transparency-form
            action=${this._action}
            data-categories=${JSON.stringify(this.dataCategories)}
            demands=${this._demandGroups[ifDefined(this._demandGroupIndex)]}
            demandGroupIndex=${ifDefined(this._demandGroupIndex)}
          ></bldn-transparency-form>
        `],
        [PrivacyRequestDemand.action.REVOKE, () => html`
          <bldn-revoke-form
            action=${this._action}
            data-categories=${JSON.stringify(this.dataCategories)}
            demands=${this._demandGroups[ifDefined(this._demandGroupIndex)]}
            demandGroupIndex=${ifDefined(this._demandGroupIndex)}
          ></bldn-revoke-form>
        `],
        [PrivacyRequestDemand.action['OTHER-DEMAND'], () => html`
          <bldn-other-form
            action=${this._action}
            data-categories=${JSON.stringify(this.dataCategories)}
            demands=${this._demandGroups[ifDefined(this._demandGroupIndex)]}
            demandGroupIndex=${ifDefined(this._demandGroupIndex)}
          ></bldn-other-form>
        `]
      ])}
    `
  } 

  render() {
    return html`
      ${choose(this._uiState, [
        [requestBuilderUIState.menu, () => html`
          <bldn-tile-menu></bldn-tile-menu>
        `],
        [requestBuilderUIState.edit, () => this.getActionForm(this._action)],
        [requestBuilderUIState.review, () => html`
          <bldn-request-review></bldn-request-review>
        `]
      ])}
    `
  }

  static styles = css``

}
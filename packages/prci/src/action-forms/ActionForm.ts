import { msg, str } from '@lit/localize';
import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  PropertyValueMap,
  TemplateResult,
} from 'lit';
import { property, state } from 'lit/decorators.js';
import { PrivacyRequestDemand } from '@blindnet/core';
import { PRCIStyles } from '../styles.js';

import '../bldn-nav-wrapper.js'
import '../bldn-dropdown.js'

/**
 * Abstract class for a form that allows the user to create or edit a demand.
 */
export abstract class ActionForm extends LitElement {

  /** @prop */
  @property({ type: Array }) dataCategories: undefined | string[]

  /** @prop */
  @property({ type: Number }) demandGroupIndex: undefined | number;

  /** @prop */
  @property({ type: Array }) demands: undefined | PrivacyRequestDemand[]

  /** Indicates that there is an error in the form input */
  @state() hasError: boolean = false

  /** Error message for input in the main form section, set by the validateActionInput function defined for each form. */
  @state() mainInputErrorMessage: undefined | string[];

  /** Error message for input in the other options section, set by validateOptionsInput function defined for each form */
  @state() optionsInputErrorMessage: undefined | string[];

  /** PRIV Action of this form */
  abstract readonly action: PrivacyRequestDemand.action;

  /**
   * Send a demand group up to the request builder
   * @param demandGroupIndex index of the demand group to replace. If undefined,
   * will be treated as a new group of demands.
   * @param demand demands to add
   */
  addToPrivacyRequest(demandGroupIndex: undefined | number, demands: PrivacyRequestDemand[]) {
    this.dispatchEvent(
      new CustomEvent('bldn-action-form:set-demands', {
        bubbles: true,
        composed: true,
        detail: {
          demandGroupIndex,
          demands
        },
      })
    );
  }

  handleBackClick() {
    this.dispatchEvent(
      new Event('bldn-action-form:back-click', {
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Validate and add demand to request when add clicked
   */
  handleAddClick() {

    // If form input is valid, add demands and emit event.
    // Otherwise, error messages will be set.
    if (this.validate()) {
      this.addToPrivacyRequest(this.demandGroupIndex, this.demands!)
      this.dispatchEvent(new Event('bldn-action-form:validated-demands'))
    }

  }

  /**
   * Validate data entered and provide error message
   * @return Boolean indicating if the input is valid and if it is not valid, an error message.
   */
  validate(): boolean {
    this.mainInputErrorMessage = this.validateActionInput()
    this.optionsInputErrorMessage = this.validateOptionsInput()
    return (this.mainInputErrorMessage === undefined) && (this.optionsInputErrorMessage === undefined)
  };

  /**
   * This method should return a list of error messages if the main content section of the
   * form is not valid. Otherwise, it should return undefined.
   */
  abstract validateActionInput(): undefined | string[];

  /**
   * This method should return a list of error messages if the other options section of the
   * form is not valid. Otherwise, it should return undefined.
   */
  abstract validateOptionsInput(): undefined | string[];

  /**
   * Get the main details section for this action form
   * @returns HTML template for the main details section
   */
  abstract getFormTemplate(): TemplateResult;

  /**
   * Get the additional other options section for this action form
   * @returns HTML template for the other options section
   */
  abstract getOptionsTemplate(): TemplateResult;

  abstract getDefaultDemands(): PrivacyRequestDemand[];

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has('demands') && this.demands === undefined) {
      this.demands = this.getDefaultDemands();
    }
  }

  render(): TemplateResult<1 | 2> {
    console.log('rendering action form')
    return html`

      <bldn-nav-wrapper left-button='Back' right-button='Next'
        @bldn-nav-wrapper:left-click=${this.handleBackClick}
        @bldn-nav-wrapper:right-click=${this.handleAddClick}
      >
        <bldn-dropdown class='main-section' mode='major'>
          <span slot='heading'><strong>${msg(str`Details of my ${this.action} Demand`)}</strong></span>
          ${this.getFormTemplate()}
        </bldn-dropdown>
        <bldn-dropdown class='main-section' mode='major'>
          <span slot='heading'><strong>${msg('Other Options')}</strong></span>
          ${this.getOptionsTemplate()}
        </bldn-dropdown>
      </bldn-nav-wrapper>
    `;
  }

  static styles = [
    css`
      :host {
        margin: 0px;
      }

      bldn-dropdown.main-section {
        border: 2px solid var(--bldn-action-form-section-border-color, var(--color-light));
        border-radius: 20px;
        padding: 2.5em;
        /* FIXME: This makes the border expansion jump weird */
        /* transition: 0.3s ease-out; */
      }

      bldn-dropdown.main-section[open] {
        padding: 2.5em 2.5em 0em 2.5em;
      }

      bldn-dropdown.main-section:hover {
        border: 2px solid var(--bldn-action-form-section-border-color-hovered, var(--color-dark));
        /* FIXME: This makes the border expansion jump weird */
        /* transition: 0.3s ease; */
      }

      bldn-dropdown span {
        display: inline-flex;
        align-items: center;
      }

      /* Font for main sections: Demand Details and Other Options */
      bldn-dropdown.main-section > span {
        font-size: var(--bldn-action-form-section-heading-font-size, var(--font-size-medium));
        color: var(--bldn-action-form-section-heading-font-color, var(--color-dark));
      }

      /* Font for each other options heading */
      bldn-dropdown bldn-dropdown span {
        font-size: var(--font-size-small);
        color: var(--bldn-action-form-subsection-heading-font-color, var(--color-dark));
      }

      /* Divider between other options dropdowns */
      bldn-dropdown {
        border-bottom: 2px solid var(--bldn-action-form-subsection-divider-color, var(--color-lightest));
        padding: 0.625em 0em;
      }

      /* Last dropdown in other options should have no border */
      bldn-dropdown bldn-dropdown:last-child {
        border-bottom: none;
      }

      bldn-nav-wrapper {
        padding: 2.813em 2.813em 0em 2.813em;
      }

      /* .btns-ctr {
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
      } */
    ` as CSSResultGroup,
  ];
}

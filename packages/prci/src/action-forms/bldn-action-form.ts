import { msg, str } from '@lit/localize';
import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { PrivacyRequestDemand } from '@blindnet/core';

import '../bldn-nav-wrapper.js';
import '../bldn-dropdown.js';
import { when } from 'lit/directives/when.js';
import { ACTION_TITLES } from '../utils/dictionary.js';

/**
 * Abstract class for a form that allows the user to create or edit a demand.
 */
export abstract class ActionForm extends LitElement {
  /** @prop */
  @property({ type: Number, attribute: 'demand-group-index' })
  demandGroupIndex: undefined | number;

  /** @prop */
  @property({ type: Array, attribute: 'demands' })
  demands: PrivacyRequestDemand[] = this.getDefaultDemands();

  /** Indicates that there is an error in the form input */
  @state() hasError: boolean = false;

  /** Error message for input in the main form section, set by the validateActionInput function defined for each form. */
  @state() mainInputErrorMessage: undefined | string[];

  /** Error message for input in the other options section, set by validateOptionsInput function defined for each form */
  @state() optionsInputErrorMessage: undefined | string[];

  /** PRIV Action of this form */
  abstract readonly action: PrivacyRequestDemand.action;

  readonly includeOptions: boolean = true;

  /**
   * Send a demand group up to the request builder
   * @param demandGroupIndex index of the demand group to replace. If undefined,
   * will be treated as a new group of demands.
   * @param demand demands to add
   */
  addToPrivacyRequest(
    demandGroupIndex: undefined | number,
    demands: PrivacyRequestDemand[]
  ) {
    this.dispatchEvent(
      new CustomEvent('bldn-action-form:set-demands', {
        bubbles: true,
        composed: true,
        detail: {
          demandGroupIndex,
          demands,
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
      this.addToPrivacyRequest(this.demandGroupIndex, this.demands!);
      this.dispatchEvent(
        new CustomEvent('bldn-action-form:next-click', {
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  /**
   * Validate data entered and provide error message
   * @return Boolean indicating if the input is valid and if it is not valid, an error message.
   */
  validate(): boolean {
    this.mainInputErrorMessage = this.validateActionInput();
    this.optionsInputErrorMessage = this.validateOptionsInput();
    return (
      this.mainInputErrorMessage === undefined &&
      this.optionsInputErrorMessage === undefined
    );
  }

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

  render(): TemplateResult<1 | 2> {
    return html`
      <bldn-nav-wrapper
        left-button=${msg('Back')}
        right-button=${msg('Next')}
        @bldn-nav-wrapper:left-click=${this.handleBackClick}
        @bldn-nav-wrapper:right-click=${this.handleAddClick}
      >
        <bldn-dropdown class="main-section" mode="major" open>
          <span slot="heading"
            ><strong
              >${msg('Details of my', {
                id: 'demand-form-action-sentence-start',
              })}
              ${ACTION_TITLES[this.action]()}
              ${msg('Demand', {
                id: 'demand-used-after-action',
              })}</strong
            ></span
          >
          ${this.getFormTemplate()}
        </bldn-dropdown>
        ${when(
          this.includeOptions,
          () => html`
            <bldn-dropdown class="main-section" mode="major">
              <span slot="heading"
                ><strong>${msg('Other Options')}</strong></span
              >
              ${this.getOptionsTemplate()}
            </bldn-dropdown>
          `
        )}
      </bldn-nav-wrapper>
    `;
  }

  static styles = [
    css`
      :host {
        /* display: block; */
        width: 100%;
        margin: 0px;
      }

      bldn-dropdown.main-section {
        border: 2px solid
          var(--bldn-action-form-section-border-color, var(--color-light));
        border-radius: 20px;
        padding: 2.5em;
        /* FIXME: This makes the border expansion jump weird */
        /* transition: 0.3s ease-out; */
      }

      bldn-dropdown.main-section[open] {
        padding: 2.5em 2.5em 0.5em 2.5em;
      }

      bldn-dropdown.main-section:hover {
        border: 2px solid
          var(
            --bldn-action-form-section-border-color-hovered,
            var(--color-dark)
          );
        /* FIXME: This makes the border expansion jump weird */
        /* transition: 0.3s ease; */
      }

      /* Font for main sections: Demand Details and Other Options */
      bldn-dropdown.main-section > span {
        font-size: var(
          --bldn-action-form-section-heading-font-size,
          var(--font-size-medium)
        );
        color: var(
          --bldn-action-form-section-heading-font-color,
          var(--color-dark)
        );
      }

      /* Padding in each other option dropdown */
      bldn-dropdown bldn-dropdown[open] {
        padding-bottom: 1.875em;
      }

      /* Font for other options headings */
      bldn-dropdown bldn-dropdown span {
        font-size: var(--font-size-small);
        color: var(
          --bldn-action-form-subsection-heading-font-color,
          var(--color-dark)
        );
      }

      bldn-dropdown bldn-dropdown span ~ * {
        padding-left: 1.25em;
      }

      /* Divider between other options dropdowns */
      bldn-dropdown {
        border-bottom: 2px solid
          var(
            --bldn-action-form-subsection-divider-color,
            var(--color-lightest)
          );
      }

      /* Last dropdown in other options should have no border */
      bldn-dropdown bldn-dropdown:last-child {
        border-bottom: none;
      }

      bldn-nav-wrapper {
        padding: 2.813em 2.813em 0em 2.813em;
      }
    ` as CSSResultGroup,
  ];
}

import { PrivacyRequestDemand } from '@blindnet/core';
import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ActionForm } from './bldn-action-form.js';

/**
 * Action form for the Modify PRIV Action
 */
@customElement('bldn-modify-form')
export class BldnModifyForm extends ActionForm {
  action: PrivacyRequestDemand.action = PrivacyRequestDemand.action.MODIFY;

  // Remove other options dropdown for this form
  includeOptions: boolean = false;

  validateActionInput(): string[] | undefined {
    return undefined;
  }

  validateOptionsInput(): string[] | undefined {
    return undefined;
  }

  getFormTemplate(): TemplateResult<1 | 2> {
    return html`
      <bldn-additional-message
        message=${ifDefined(this.demands[0].message)}
      ></bldn-additional-message>
    `;
  }

  getOptionsTemplate(): TemplateResult<1 | 2> {
    return html``;
  }

  getDefaultDemands(): PrivacyRequestDemand[] {
    return [
      {
        id: '',
        action: PrivacyRequestDemand.action.MODIFY,
      },
    ];
  }

  // Listener Functions

  /**
   * Update the message for this demand
   * @param e {CustomEvent} Event containing the data category string to add
   */
  changeMessage(e: Event) {
    e.stopPropagation();
    const { message } = (e as CustomEvent).detail;
    this.demands[0].message = message;
  }

  /**
   * Add listeners for elements of this ActionForm
   */
  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();

    // Message listener
    this.addEventListener(
      'bldn-additional-message:message-change',
      this.changeMessage
    );
  }

  /**
   * Remove all listeners
   */
  disconnectedCallback(): void {
    this.removeEventListener(
      'bldn-additional-message:message-change',
      this.changeMessage
    );
  }

  static styles = [
    ActionForm.styles,
    css`
      bldn-additional-message {
        margin: 2em 0;
      }
    `,
  ];
}

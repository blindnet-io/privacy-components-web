import { PrivacyRequestDemand } from '@blindnet/core';
import { css, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ActionForm } from './bldn-action-form.js';

/**
 * Action form for the RESTRICT PRIV Action
 */
@customElement('bldn-restrict-form')
export class BldnRestrictForm extends ActionForm {
  action: PrivacyRequestDemand.action = PrivacyRequestDemand.action.RESTRICT;

  validateActionInput(): string[] | undefined {
    throw new Error('Method not implemented.');
  }

  validateOptionsInput(): string[] | undefined {
    throw new Error('Method not implemented.');
  }

  getFormTemplate(): TemplateResult<1 | 2> {
    throw new Error('Method not implemented.');
  }

  getOptionsTemplate(): TemplateResult<1 | 2> {
    throw new Error('Method not implemented.');
  }

  getDefaultDemands(): PrivacyRequestDemand[] {
    throw new Error('Method not implemented.');
  }

  // Listener Functions

  /**
   * Add listeners for elements of this ActionForm
   */
  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();
  }

  /**
   * Remove all listeners
   */
  disconnectedCallback(): void {}

  static styles = [ActionForm.styles, css``];
}

import { PrivacyRequestDemand } from '@blindnet/core';
import { css, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ActionForm } from './bldn-action-form.js';

/**
 * Action form for the OBJECT PRIV Action
 */
@customElement('bldn-object-form')
export class BldnObjectForm extends ActionForm {
  action: PrivacyRequestDemand.action = PrivacyRequestDemand.action.OBJECT;

  validateActionInput(): string[] | undefined {
    return undefined;
  }

  validateOptionsInput(): string[] | undefined {
    return undefined;
  }

  getFormTemplate(): TemplateResult<1 | 2> {
    return html` <bldn-privacy-scope-picker></bldn-privacy-scope-picker> `;
  }

  getOptionsTemplate(): TemplateResult<1 | 2> {
    return html``;
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

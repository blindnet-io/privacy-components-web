/* eslint-disable no-param-reassign */
import {
  ComputationAPI,
  GivenConsentsPayload,
  PrivacyRequestDemand,
} from '@blindnet/core';
import { msg } from '@lit/localize';
import { css, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';

import { ActionForm } from './bldn-action-form.js';
import '@blindnet/core-ui';

/**
 * Action form for the REVOKE-CONSENT PRIV Action
 */
@customElement('bldn-revoke-consent-form')
export class BldnRevokeConsentForm extends ActionForm {
  @state() _consents: GivenConsentsPayload[] = [];

  @state() _message: string | undefined;

  @state() _showEach: boolean = false;

  action: PrivacyRequestDemand.action =
    PrivacyRequestDemand.action.REVOKE_CONSENT;

  constructor() {
    super();

    if (ComputationAPI.getInstance().apiTokenSet()) {
      ComputationAPI.getInstance()
        .getUserConsents()
        .then(consents => {
          this._consents = consents;

          // Set state based off demands passed in
          if (this.demands.length === 1 && !this.demands[0].restrictions) {
            // Default case, select all consent IDs and add a demand for each
            this.demands = [];
            this._consents.forEach(c => {
              this.demands.push({
                id: '',
                action: PrivacyRequestDemand.action.REVOKE_CONSENT,
                restrictions: {
                  consent: {
                    id: c.id,
                  },
                },
                message: this._message,
              });
            });
          } else {
            // Otherwise show the list of consents
            this._showEach = true;
          }
        });
    } else {
      // TODO: Set some error message here that is the same for all forms
      // eslint-disable-next-line no-console
      console.log('User must be authenticated for this demand type!');
    }
  }

  validateActionInput(): string[] | undefined {
    return undefined;
  }

  validateOptionsInput(): string[] | undefined {
    return undefined;
  }

  getFormTemplate(): TemplateResult<1 | 2> {
    return html`
      <p>${msg('I want to:')}</p>
      <bldn-radio-list
        .choices=${[
          {
            value: 'all',
            display: msg(html`Revoke <b>all</b> consents`),
            checked: !this._showEach,
          },
          {
            value: 'some',
            // prettier-ignore
            display: msg(html`Revoke <b>specific</b> consents (select those you wish to<b>revoke</b>)`),
            checked: this._showEach,
          },
        ]}
        @bldn-radio-list:choice-change=${this.handleRevokeTypeChange}
      ></bldn-radio-list>
      ${when(
        this._showEach,
        () => html`
          <bldn-checklist
            .choices=${this._consents.map(c => ({
              value: c.id,
              display: html`${c.name} -
                <i
                  >${msg(
                    html`Given on ${new Date(c.date).toLocaleString()}`
                  )}</i
                >`,
              checked:
                this.demands.findIndex(
                  d => d.restrictions!.consent!.id === c.id
                ) > -1,
            }))}
            @bldn-checklist:choice-select=${this.addConsent}
            @bldn-checklist:choice-deselect=${this.removeConsent}
          ></bldn-checklist>
        `
      )}
    `;
  }

  getOptionsTemplate(): TemplateResult<1 | 2> {
    return html`
      <bldn-dropdown>
        <span slot="heading"
          ><strong>${msg('Additional Message')}</strong></span
        >
        <bldn-additional-message
          message=${ifDefined(
            this.demands.length > 0 ? this.demands[0].message : undefined
          )}
        ></bldn-additional-message>
      </bldn-dropdown>
    `;
  }

  getDefaultDemands(): PrivacyRequestDemand[] {
    return [
      {
        id: '',
        action: PrivacyRequestDemand.action.REVOKE_CONSENT,
      },
    ];
  }

  // Listener Functions

  /**
   * Hide or show the consents list based on radio selection
   * @param e Event with value of radio button clicked
   */
  handleRevokeTypeChange(e: Event) {
    e.stopPropagation();
    const { value } = (e as CustomEvent).detail;
    this._showEach = value === 'some';
    this.demands = [];
    if (value === 'all') {
      // Add a demand for each consent
      this._consents.forEach(c => {
        this.demands.push({
          id: '',
          action: PrivacyRequestDemand.action.REVOKE_CONSENT,
          restrictions: {
            consent: {
              id: c.id,
            },
          },
          message: this._message,
        });
      });
    }
  }

  addConsent(e: Event) {
    e.stopPropagation();
    const { value } = (e as CustomEvent).detail;

    // Add a new demand for this consent
    this.demands.push({
      id: '',
      action: PrivacyRequestDemand.action.REVOKE_CONSENT,
      restrictions: {
        consent: {
          id: value,
        },
      },
      message: this._message,
    });
  }

  removeConsent(e: Event) {
    e.stopPropagation();
    const { value } = (e as CustomEvent).detail;

    // Remove the demand with this consent ID
    const removeIndex = this.demands.findIndex(
      d => d.restrictions!.consent!.id === value
    );
    if (removeIndex > -1) {
      this.demands.splice(removeIndex, 1);
    }
  }

  /**
   * Update the message for this demand
   * @param e {CustomEvent} Event containing the data category string to add
   */
  changeMessage(e: Event) {
    e.stopPropagation();
    const { message } = (e as CustomEvent).detail;
    this._message = message;

    // Update message of each demand
    this.demands.forEach(demand => {
      demand.message = this._message;
    });
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
      :host {
        text-align: left;
        color: var(--bldn-revoke-consent-form-font-color, var(--color-dark));
      }

      bldn-checklist {
        margin-left: 1.5em;
        /* padding-bottom: 1em; */
        margin-bottom: 1em;
      }
    `,
  ];
}

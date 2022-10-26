/* eslint-disable lit/no-value-attribute */
import { msg } from "@lit/localize"
import { css, html, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"
import { ifDefined } from "lit/directives/if-defined.js";

/**
 * @event {CustomEvent} bldn-date-restriction:start-date-change - Fires when the start date is changed
 * @event {CustomEvent} bldn-date-restriction:end-date-change - Fires when the end date is changed
 */
@customElement('bldn-date-restriction')
export class BldnDateRestriction extends LitElement {

  /** 
   * @prop Optional initial start date string
   *  
   * Expects a valid date string as described here:
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#date_strings
   */
  @property({ type: String }) start: undefined | string;

  /** 
   * @prop Optional initial end date string
   *
   * Expects a valid date string as described here:
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#date_strings 
   */
  @property({ type: String }) end: undefined | string;

  private handleDateChange(e: Event) {
    const { id, value } = e.target as HTMLInputElement;
    const date = new Date(value)

    // Emit change event if date and element id are valid
    if (date.toString() !== 'Invalid Date' && ['start-date', 'end-date'].includes(id)) {
      this.dispatchEvent(new CustomEvent(`bldn-date-restriction:${id === 'start-date' ? 'start' : 'end'}-date-change`, {
        detail: {
          date
        }
      }))
    }
  }

  render() {

    return html`
      <p>
        ${msg('Specify a date range for the selected data categories:')}
      </p>
      <span>${msg('From')}</span>
      <input
        id="start-date"
        type="date"
        value=${ifDefined(this.start)}
        @input=${this.handleDateChange}
      />
      <span>${msg('to')}</span>
      <input
        id="end-date"
        type="date"
        value=${ifDefined(this.end)}
        @input=${this.handleDateChange}
      />
    `
  }

  static styles = css`

    :host {
      display: block;
      text-align: left;
      color: var(--bldn-data-restriction-font-color, var(--color-dark));
    }

    p {
      margin: 1.3em 0em;
    }

    input {
      border-radius: 10px;
      padding: 0.75em;
      border: 2px solid var(--bldn-date-restriction-input-border-color, var(--color-light));
      background: var(--bldn-date-restriction-input-background-color, var(--color-lightest));
      margin: 0em 1em;
      transition: 0.3s ease-out;
    }

    input:hover {
      border-color: var(--bldn-date-restriction-input-border-color-hover, var(--color-medium));
      transition: 0.3s ease;
    }

  `

}